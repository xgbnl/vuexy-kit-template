// ThirdParty Imports
import qs from 'qs'
import type { Blob } from 'node:buffer'

// React Imports
import { toast } from 'react-toastify'

// Utils Imports
import { isPlainObject } from '@mui/utils'
import { ensurePrefix } from '@utils/string'
import { getLanguageFromPathname } from '@utils/getLanguage'

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
  return httpClient({
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

export const patch = <T>(url: string, params: Partial<Omit<RequestParams, 'params'>>, resource: Resource = 'json'): Promise<T> => {
  return httpClient<T>({
    method: 'PATCH',
    body: params.body,
    pathVariables: params.pathVariables,
    url,
    resource
  })
}

export const destroy = <T>(url: string, params: Partial<Pick<RequestParams, 'pathVariables'>>, resource: Resource = 'json'): Promise<T> => {
  return httpClient<T>({
    method: 'DELETE',
    pathVariables: params.pathVariables,
    url,
    resource
  })
}

interface HttpRequestOption extends Partial<RequestParams> {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: object
  signal?: any
  url: string,
  resource: Resource
}

interface Error {
  message: string
  status: number
  code: number
}

function httpClient<T>(options: HttpRequestOption): Promise<string | ArrayBuffer | Blob | SymfonyResponse<T>> {

  const fetchOption: {
    mode?: string
    cache?: string
  } & Pick<HttpRequestOption, 'method' | 'headers' | 'url' | 'body'> = {
    method: options.method,
    headers: ((): object => {
      if (!isPlainObject(options.headers)) {
        const headers = {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + 'token'
        }

        if (isPlainObject(options.body) && !(options.body instanceof FormData)) {
          headers['Content-Type'] = 'application/{type}'.replace('{type}', options.method === 'GET' ? 'x-www-form-urlencoded' : 'json;charset=UTF-8')
        }

        return headers
      }
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

  const { resource } = options

  return fetch(fetchOption.url, fetchOption as RequestInit)
    .then((response: Response): Promise<string | ArrayBuffer | Blob | SymfonyResponse<T> | Error> => {
      if (!response.ok) {
        return Promise.reject<Error>(new Error(`HTTP error: ${response.status}`))
      }

      if (resource === 'blob') {
        return response.blob() as Promise<Blob>
      }

      if (resource === 'buffer') {
        return response.arrayBuffer() as Promise<Blob>
      }

      if (resource === 'text') {
        return response.text() as Promise<string>
      }

      return (async <T>(promise: Response): Promise<SymfonyResponse<T>> => {

        const response: SymfonyResponse<T> = await promise.json()

        if ([400, 401, 403, 404, 419, 422, 500].includes(response.code)) {

          if (response.code === 401) {
            const language: string | null = getLanguageFromPathname()
            toast.error(response.msg, {
              delay: 1000,
              onClose: () => window.location = `/${language}/login`
            })
            return
          }

          return Promise.reject(new Error(response.msg))
        }

        return Promise.resolve(response)
      })(response)
    })
    .catch(err => {
      console.log(err)
      toast.error(err.message)
    }).finally(() => {
    })
}
