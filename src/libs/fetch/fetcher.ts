// ThirdParty Imports
import qs from 'qs'

// Utils Imports
import { isPlainObject } from '@utils/isPlainObject'
import { getAppUrl } from '@/utils/url'

// Configs Imports
import { HttpStatus } from '@/libs/fetch/types'

// Types Imports
import type {
  Authenticatable,
  Reportable,
  BaseRequestOptions,
  TResponse,
  Passport,
  Throwable,
  JsonResponse
} from '@/libs/fetch/types'

const pendingRequests: Record<string, null | AbortController> = {}

const AbortWhiteList: string[] = []

export async function fetcher<T>(
  options: BaseRequestOptions,
  auth: Authenticatable,
  report: Reportable
): Promise<TResponse<T>> {
  let controller: AbortController | null = null

  if (!AbortWhiteList.includes(options.url)) {
    const previousController = pendingRequests[options.url]

    if (previousController) {
      previousController.abort()
    }

    controller = new AbortController()

    pendingRequests[options.url] = controller
  }

  const baseConfig: RequestInit & { url: string } = {
    signal: controller ? controller.signal : null,
    method: options.method,
    headers: await makeHeader(options, auth),
    mode: 'cors',
    cache: 'no-cache',
    url: buildUrl(options)
  }

  if (options.method !== 'GET') {
    if (isPlainObject(options.body)) {
      baseConfig.body = JSON.stringify(options.body)
    } else if (options.body instanceof FormData) {
      baseConfig.body = options.body
    }
  }

  return fetch(baseConfig.url, baseConfig)
    .then(async (response: Response): Promise<TResponse<T> | Throwable> => {
      if (!response.ok) {
        return Promise.reject<Throwable>({
          code: response.status,
          msg: response.statusText
        })
      }

      switch (options.resource) {
        case 'text':
          return response.text() as Promise<TResponse<T>>
        case 'blob':
          return response.blob() as Promise<TResponse<T>>
        case 'buffer':
          return response.arrayBuffer() as Promise<TResponse<T>>
      }

      const resp: JsonResponse<T> = await response.json()

      if (HttpStatus.includes(resp.code)) {
        return Promise.reject(resp)
      }

      return resp
    })
    .catch<void>((error: Error | Throwable): void => {
      if (error instanceof Error && error.name !== 'AbortError') {
        return report({ code: 500, msg: error.message })
      }

      if (!(error instanceof Error)) {
        return report(error as Throwable)
      }
    })
    .finally(() => {
      delete pendingRequests[options.url]
    }) as Promise<TResponse<T>>
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
