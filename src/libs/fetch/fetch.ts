// Import Request interface.
import type Request from '@/libs/fetch/request'

// Import Request request types.
import type { DeleteRequestBody, GetRequestBody, PATCHRequestBody, PostRequestBody } from '@/types/requestTypes'

// Import Http request client.
import HttpClient from '@/libs/fetch/client'

// Import
import type { HttpRequestOption, Response, ResponseType } from '@/types/httpTypes'

// Import interface.
import type PendingRequest from '@/libs/fetch/pending'

class Fetch implements Request, PendingRequest {
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

type RequestHook = () => { fetch: Request }

export const useFetch: RequestHook = () => ({ fetch: new Fetch() })
