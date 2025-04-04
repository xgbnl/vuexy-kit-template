// Http response status code
export enum ResponseStatus {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  PageExpired = 419,
  Validation = 422,
  TooManyRequests = 429,
  ServerError = 500,
  BadGateway = 502
}

export const HttpStatus: number[] = [
  ResponseStatus.BadRequest,
  ResponseStatus.Unauthorized,
  ResponseStatus.Forbidden,
  ResponseStatus.NotFound,
  ResponseStatus.PageExpired,
  ResponseStatus.Validation,
  ResponseStatus.TooManyRequests,
  ResponseStatus.ServerError
]

// Response type
export type Resource = 'json' | 'blob' | 'text' | 'buffer'

type UnionRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type Passport = {
  bearerToken: string | null
}

// Base request params
export type RequestParams = {
  pathVariables: Record<string, string | number>
  params: Record<string, string | number>
  body: Record<string, unknown>
}

// Request option
export type BaseRequestOptions = {
  method: UnionRequestMethod
  headers?: Record<string, string>
  url: string
  resource: Resource
} & Partial<RequestParams>

export type HeaderBaseParams = Pick<BaseRequestOptions, 'headers' | 'body' | 'method'>

// Custom json response struct
export type JsonResponse<T> = {
  msg: string
  code: number
  data: T
}

// Fetch response result
export type HttpResponse<T> = T extends string
  ? string
  : T extends Blob
    ? Blob
    : T extends ArrayBuffer
      ? ArrayBuffer
      : T extends JsonResponse<infer U>
        ? JsonResponse<U>
        : never

export type Throwable = Omit<JsonResponse<unknown>, 'data'>

// Http Request Params
export type HttpGetParams = Partial<RequestParams>

export type HttpPostParams = Partial<Pick<RequestParams, 'body'>>

export type HttpPatchParams = Partial<Omit<RequestParams, 'params'>>

export type HttpDeleteParams = Partial<Pick<RequestParams, 'pathVariables'>>

// Http Request Methods
export type HttpGet = <T>(url: string, params?: HttpGetParams, resource?: Resource) => Promise<HttpResponse<T>>

export type HttpPost = <T>(url: string, params?: HttpPostParams, resource?: Resource) => Promise<HttpResponse<T>>

export type HttpPatch = <T>(url: string, params?: HttpPatchParams, resource?: Resource) => Promise<HttpResponse<T>>

export type HttpDelete = <T>(url: string, params?: HttpDeleteParams, resource?: Resource) => Promise<HttpResponse<T>>

// Abstract Methods
export type Renderable = <T>(promise: Response) => Promise<JsonResponse<T> | Error>

export type Authenticatable = () => Promise<Passport | null>

export type Reportable = (error: Throwable) => Promise<Throwable>
