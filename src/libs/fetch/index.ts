// ThirdParty Imports
import qs from 'qs'

// Utils Imports
import { isPlainObject } from '@utils/isPlainObject'
import { getAppUrl } from '@/utils/url'

// Configs Improts
import { ResponseStatus } from '@/configs/fetch'

// Types Imports
import type {
  Renderable,
  Authenticatable,
  Reportable,
  BaseRequestOptions,
  HttpResponse,
  Passport,
  Throwable
} from '@/libs/fetch/types'

type FetchBaseConfig = {
  signal: AbortSignal | null
  mode?: string
  cache?: string
  body?: string | object
} & Pick<BaseRequestOptions, 'method' | 'headers' | 'url'>

// Abort
const pendingRequests: Record<string, null | AbortController> = {}

const AbortWhiteList: string[] = []

export async function fetcher<T>(
  options: BaseRequestOptions,
  render: Renderable,
  auth: Authenticatable,
  report: Reportable
): Promise<HttpResponse<T>> {
  let controller: AbortController | null = null

  if (!AbortWhiteList.includes(options.url)) {
    const previousController = pendingRequests[options.url]

    if (previousController) {
      previousController.abort()
    }

    controller = new AbortController()

    pendingRequests[options.url] = controller
  }

  const baseConfig: FetchBaseConfig = {
    signal: controller ? controller.signal : null,
    method: options.method,
    headers: await makeHeader(options, auth),
    mode: 'cors',
    cache: 'no-cache',
    url: buildUrl(options)
  }

  if (options.method !== 'GET') {
    baseConfig.body = {}

    if (isPlainObject(options.body)) {
      baseConfig.body = JSON.stringify(options.body)
    } else if (options.body instanceof FormData) {
      baseConfig.body = options.body
    }
  }

  return fetch(baseConfig.url, baseConfig as RequestInit)
    .then((response: Response): Promise<HttpResponse<T> | Throwable> => {
      if (!response.ok) {
        return Promise.reject<Throwable>({
          code: response.status,
          msg: ResponseStatus[response.status] ?? response.statusText
        })
      }

      switch (options.resource) {
        case 'text':
          return response.text() as Promise<HttpResponse<T>>
        case 'blob':
          return response.blob() as Promise<HttpResponse<T>>
        case 'buffer':
          return response.arrayBuffer() as Promise<HttpResponse<T>>
      }

      return render<T>(response) as Promise<HttpResponse<T>>
    })
    .catch<Error | Throwable>((error: Error | Throwable) => {
      if (error instanceof Error) {
        const code = error.name === 'AbortError' ? 1000 : ResponseStatus.ServerError

        return report({ code: code, msg: `[${error.name}]: ${error.message}` })
      }

      return report(error)
    })
    .finally(() => {
      delete pendingRequests[options.url]
    }) as Promise<HttpResponse<T>>
}

function buildUrl(option: Pick<BaseRequestOptions, 'params' | 'url' | 'pathVariables'>): string {
  const { url: path, params, pathVariables = {} } = option

  let url: string = path

  if (isPlainObject(params)) {
    const queryString: string = url.endsWith('?') ? '&' : '?' + qs.stringify(params)

    url += queryString
  }

  if (isPlainObject(pathVariables)) {
    const pattern = new RegExp(`:(${Object.keys(pathVariables).join('|')})\\b`, 'g')

    url = url.replace(pattern, (_, key) => String(pathVariables[key]))
  }

  return getAppUrl(url)
}

async function makeHeader(
  option: Pick<BaseRequestOptions, 'headers' | 'body' | 'method'>,
  authenticatable: Authenticatable
): Promise<Record<string, string>> {
  const { headers: header, body, method } = option

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }

  if (isPlainObject(body)) {
    if (method === 'GET') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
  } else if (body instanceof FormData) {
    delete headers['Content-Type']
  }

  const passport: Passport | null = await authenticatable()

  if (null !== passport) {
    headers['Authorization'] = 'Bearer ' + passport.bearerToken
  }

  return Promise.resolve(Object.assign(headers, header))
}
