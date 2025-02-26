// Node Imports
import type { Blob } from 'node:buffer'

// ThirdParty Imports
import qs from 'qs'

// React Imports
import { toast } from 'react-toastify'

// MUI Imports
import { isPlainObject } from '@mui/utils'

// Utils Imports
import { ensurePrefix } from '@utils/string'
import { getLanguageFromPathname } from '@utils/getLanguage'

// Utils Imports
import { useAccessToken, hasAccessToken, revokeAccessToken } from '@utils/passport'

interface PathVariables {
  key: string
  value: string | number
}

interface RequestParams {
  pathVariables: PathVariables[]
  params: {}
  body: {}
}

export interface SymfonyResponse<T> {
  msg: string
  code: number
  data: T
}

type Resource = 'json' | 'blob' | 'text' | 'buffer'

export const get = <T>(url: string, params: Partial<RequestParams> = {}, resource: Resource = 'json'): Promise<T> => {
  return httpClient<T>({
    method: 'GET',
    params: params.params,
    pathVariables: params.pathVariables,
    body: params.body,
    url,
    resource
  })
}

export const post = <T>(url: string, params: Pick<RequestParams, 'body'>, resource: Resource = 'json'): Promise<T> => {
  return httpClient<T>({
    method: 'POST',
    body: params.body,
    url,
    resource
  })
}

export const patch = <T>(
  url: string,
  params: Partial<Omit<RequestParams, 'params'>>,
  resource: Resource = 'json'
): Promise<T> => {
  return httpClient<T>({
    method: 'PATCH',
    body: params.body,
    pathVariables: params.pathVariables,
    url,
    resource
  })
}

export const destroy = <T>(
  url: string,
  params: Partial<Pick<RequestParams, 'pathVariables'>>,
  resource: Resource = 'json'
): Promise<T> => {
  return httpClient<T>({
    method: 'DELETE',
    pathVariables: params.pathVariables,
    url,
    resource
  })
}

interface HttpRequestOption extends Partial<RequestParams> {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  url: string
  resource: Resource
}

const pendingRequests: Record<string, null | AbortController> = {}

const ABORT_WHITELIST: string[] = []

function httpClient<T>(options: HttpRequestOption): Promise<string | ArrayBuffer | Blob | SymfonyResponse<T>> {
  let controller: AbortController | null = null

  if (!ABORT_WHITELIST.includes(options.url)) {
    const previousController = pendingRequests[options.url]

    if (previousController) {
      previousController.abort()
    }

    controller = new AbortController()

    pendingRequests[options.url] = controller
  }

  const fetchOption: {
    signal: AbortSignal | null
    mode?: string
    cache?: string
  } & Pick<HttpRequestOption, 'method' | 'headers' | 'url' | 'body'> = {
    signal: controller ? controller.signal : null,
    method: options.method,
    headers: ((): Record<string, string> => {

      const headers: Record<string, string> = {}

      if (hasAccessToken()) {
        headers['Authorization'] = `Bearer ${useAccessToken()}`
      }

      if (!isPlainObject(options.headers)) {
        headers['Accept'] = 'application/json'

        if (isPlainObject(options.body) && !(options.body instanceof FormData)) {
          const CONTENT_TYPE: string = options.method === 'GET' ? 'x-www-form-urlencoded' : 'json;charset=UTF-8'
          headers['Content-Type'] = `application/${CONTENT_TYPE}`
        }
      }

      return headers
    })(),
    mode: 'cors',
    cache: 'no-cache',
    url: ((): string => {
      let url: string = isPlainObject(options.params)
        ? options.url + `${options.url.indexOf('?') === -1 ? '?' : '&'}` + qs.stringify(options.params)
        : options.url

      if (options.pathVariables?.length) {
        url = options.pathVariables.reduce<string>((accUrl: string, pathVar: PathVariables): string => {
          return accUrl.replace(`:${pathVar.key}`, String(pathVar.value))
        }, url)
      }

      return process.env.NEXT_PUBLIC_API_URL + ensurePrefix(url, '/')
    })()
  }

  if (options.method !== 'GET') {
    fetchOption.body = isPlainObject(options.body) ? JSON.stringify(options.body) : {}
  }

  return fetch(fetchOption.url, fetchOption as RequestInit)
    .then((response: Response): Promise<string | ArrayBuffer | Blob | SymfonyResponse<T> | Error> => {
      if (!response.ok) {
        return Promise.reject<Error>(new Error(`HTTP error: ${response.status}`))
      }

      const { resource } = options

      if (resource === 'blob') {
        return response.blob() as Promise<Blob>
      }

      if (resource === 'buffer') {
        return response.arrayBuffer() as Promise<ArrayBuffer>
      }

      if (resource === 'text') {
        return response.text() as Promise<string>
      }

      return (async <T>(promise: Response): Promise<SymfonyResponse<T>> => {
        const response: SymfonyResponse<T> = await promise.json()

        if ([400, 401, 403, 404, 419, 422, 500].includes(response.code)) {
          if (response.code === 401) {

            revokeAccessToken()

            const language: string | null = getLanguageFromPathname()

            toast.error(response.msg, {
              delay: 1000,
              onClose: () => window.location.replace(`/${language}/login`)
            })
          } else {
            return Promise.reject(new Error(response.msg))
          }
        }

        return Promise.resolve(response)
      })(response)
    })
    .catch(err => {
      toast.error(err.message)
    })
    .finally(() => {
      delete pendingRequests[options.url]
    })
}
