// ThirdParty Imports
import qs from 'qs'
import type { Blob } from 'node:buffer'
// React Imports
import { toast } from 'react-toastify'

// Utils Imports
import { isPlainObject } from '@mui/utils'
import { ensurePrefix } from '@utils/string'

interface PathVariables {
  key: string
  value: string | number
}

interface RequestParams {
  pathVariables: PathVariables[]
  params: {}
  body: {}
}

export interface PendingRequest {
  accept(contentType: ResponseType): HttpRequest
}

export interface ResponseInterface<RValue> {
  msg: string
  code: number
  data: RValue
}

type FetchResponse<RValue> = string | ArrayBuffer | Blob | ResponseInterface<RValue>

interface HttpRequest {
  get<R extends FetchResponse<R>>(url: string, params: Partial<RequestParams>): Promise<R>

  post<R extends FetchResponse<R>>(url: string, params: Partial<Pick<RequestParams, 'body'>>): Promise<R>

  patch<R extends FetchResponse<R>>(url: string, params: Partial<Omit<RequestParams, 'params'>>): Promise<R>

  delete<R extends FetchResponse<R>>(url: string, params: Partial<Pick<RequestParams, 'pathVariables'>>): Promise<R>
}

export class Client implements HttpRequest, PendingRequest {

  public delete<R extends FetchResponse<R>>(url: string, params: Partial<Pick<RequestParams, 'pathVariables'>>): Promise<R> {
    return httpClient<R>({
      method: 'DELETE',
      pathVariables: params.pathVariables,
      url: url,
      responseType: 'json'
    })
  }

  public get<R extends FetchResponse<R>>(url: string, params: RequestParams): Promise<R> {
    return httpClient({
      method: 'GET',
      params: params.params,
      pathVariables: params.pathVariables,
      body: params.body,
      url: url,
      responseType: 'json'
    })
  }

  public patch<R extends FetchResponse<R>>(url: string, params: Partial<Omit<RequestParams, 'params'>>): Promise<R> {
    return httpClient<R>({
      method: 'PATCH',
      body: params.body,
      pathVariables: params.pathVariables,
      url: url,
      responseType: 'json'
    })
  }

  public post<R extends FetchResponse<R>>(url: string, params: RequestParams): Promise<R> {
    return httpClient<R>({
      method: 'POST',
      body: params.body,
      url: url,
      responseType: 'json'
    })
  }

  accept(contentType: ResponseType): HttpRequest {
    return this
  }
}

interface HttpRequestOption<RValue> extends Partial<RequestParams> {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: object
  signal?: any
  url: string,
  responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer' | ResponseInterface<RValue>
}

interface Error {
  message: string
  status: number
  code: number
}

function httpClient<RValue>(options: HttpRequestOption<RValue>): Promise<string | ArrayBuffer | Blob | ResponseInterface<RValue> | never> {

  const fetchOption: {
    mode?: string
    cache?: string
  } & Pick<HttpRequestOption<RValue>, 'method' | 'headers' | 'url' | 'body'> = {
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
        url = options.pathVariables?.reduce((url: string, pathVar: PathVariables) => url.replace(`:${pathVar.key}`, String(pathVar.value)), url)
      }

      return process.env.NEXT_PUBLIC_API_URL + ensurePrefix(url, '/')
    })()
  }

  if (options.method !== 'GET') {
    fetchOption.body = isPlainObject(options.body) ? JSON.stringify(options.body) : {}
  }

  return fetch(fetchOption.url, fetchOption as RequestInit)
    .then((res) => {

      if (!res.ok) {
        return Promise.reject<Error>({
          code: 500,
          status: res.status,
          message: res.statusText
        })
      }

      if (options.responseType === 'json') {
        return resolveJsonResponse<RValue>(res) as ReturnType<Promise<ResponseInterface<RValue>>>
      }

      if (options.responseType === 'arrayBuffer') {
        return res.arrayBuffer()
      }

      if (options.responseType === 'blob') {
        return res.blob()
      }

      return res.text()
    })
    .catch(err => {
      toast.error(err.message)
    }).finally(() => {
    })
}

async function resolveJsonResponse<RValue>(res: Response): Promise<ResponseInterface<RValue>> {

  const response: ResponseInterface<RValue> = await res.json()

  if ([400, 401, 403, 404, 419, 422, 500].includes(response.code)) {
    return Promise.reject(new Error(response.msg))
  }

  return Promise.resolve(response)
}

export const useReactFetch = (): HttpRequest => new Client()
