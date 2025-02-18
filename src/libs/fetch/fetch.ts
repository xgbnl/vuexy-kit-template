// Type Imports
import { isPlainObject } from '@mui/utils'

import qs from 'qs'

import type { DeleteRequestBody, GetRequestBody, PATCHRequestBody, PostRequestBody } from '@/types/requestTypes'

// Import
import type { HttpRequestOption, PathVariables, Response, ResponseType } from '@types/fetchTypes'
import { interceptors } from '@/libs/fetch/reader'

import { ensurePrefix } from '@utils/string'

interface PendingRequest {
  accept(contentType: ResponseType): PendingRequest
}

interface Request {
  get<T extends GetRequestBody, R extends Response>(url: string, req: T): Promise<R>

  post<T extends PostRequestBody, R extends Response>(url: string, req: T): Promise<R>

  patch<T extends PATCHRequestBody, R extends Response>(url: string, req: T): Promise<R>

  delete<T extends DeleteRequestBody, R extends Response>(url: string, req: T): Promise<R>
}

class Client implements Request, PendingRequest {
  public delete<T extends DeleteRequestBody, R extends Response>(url: string, req: T): Promise<R> {
    return this.client<R>({
      method: 'DELETE',
      pathVariables: req.pathVariables,
      url
    }).request()
  }

  public get<T extends GetRequestBody, R extends Response>(url: string, req: T): Promise<R> {
    return this.client<R>({
      method: 'GET',
      params: req.params,
      pathVariables: req.pathVariables,
      body: req.body,
      url
    }).request()
  }

  public patch<T extends PATCHRequestBody, R extends Response>(url: string, req: T): Promise<R> {
    return this.client<R>({
      method: 'PATCH',
      body: req.body,
      pathVariables: req.pathVariables,
      url
    }).request()
  }

  public post<T extends PostRequestBody, R extends Response>(url: string, req: T): Promise<R> {
    return this.client<R>({
      method: 'POST',
      body: req.body,
      url
    }).request()
  }

  private client<T extends Response>(options: HttpRequestOption): HttpClient<T> {
    return new HttpClient<T>(options)
  }

  accept(contentType: ResponseType): PendingRequest {
    return this
  }
}

class HttpClient<T extends Response> {
  private responseType: ResponseType = 'json'

  private options: HttpRequestOption

  public constructor(options: HttpRequestOption) {
    this.options = options
  }

  public request(): Promise<T> {
    this.requestInterceptor(this.options)

    return fetch(this.options.url as string, this.options as RequestInit)
      .then((response: Response): Promise<any> => {
        if (!response.ok) {
          return Promise.reject({
            code: 500,
            status: response.status,
            message: response.statusText
          })
        }

        return interceptors[this.responseType].read(response)
      })
      .catch(error => {
        console.log(error.message, error.code)
      })
      .finally(() => {}) as Promise<T>
  }

  private requestInterceptor(option: HttpRequestOption): void {
    if (!isPlainObject(option.headers)) {
      option.headers = {
        'Content-Type': option.method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json;charset=UTF-8'
      }
    }

    if (isPlainObject(option.body)) {
      option.body = JSON.stringify(option.body)
    }

    if (isPlainObject(option.params)) {
      option.url += `${option.url.indexOf('?') === -1 ? '?' : '&'}` + qs.stringify(option.params)
    }

    if (isPlainObject(option.pathVariables)) {
      option.pathVariables?.forEach((pathVar: PathVariables): void => {
        option.url = option.url.replace(
          `:${pathVar.key}`,
          typeof pathVar.value === 'string' ? pathVar.value : String(pathVar.value)
        )
      })
    }

    this.options = Object.assign(option, {
      mode: 'cors',
      cache: 'no-cache',
      params: {},
      pathVariables: [],
      url: this.rewrite(option.url)
    })
  }

  private rewrite(url: string): string {
    return process.env.NEXT_PUBLIC_API_URL + ensurePrefix(url, '/')
  }
}

export const useFetch = () => new Client()
