type UnionRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type Resource = 'json' | 'blob' | 'text' | 'buffer'

export type Passport = {
  bearerToken: string | null
}

// Base request params
export type FetchRequestParams = {
  pathVariables?: Record<string, string | number>
  params?: Record<string, string | number>
} & Pick<RequestInit, 'body'>

// Request option
export type BaseRequestOptions = {
  method: UnionRequestMethod
  headers?: Record<string, string>
  url: string
  resource: Resource
} & FetchRequestParams

export type HeaderBaseParams = Pick<BaseRequestOptions, 'headers' | 'body' | 'method'>

// Custom json response struct
export type JsonResponse<T> = {
  msg: string
  code: number
  data: T
}

// Fetch response result
export type TResponse<T> = T extends string
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
export type HttpPostParams = Partial<Pick<FetchRequestParams, 'body'>>

export type HttpPatchParams = Partial<Omit<FetchRequestParams, 'params'>>

export type HttpDeleteParams = Partial<Pick<FetchRequestParams, 'pathVariables'>>

// Http Request Methods
export type HttpGet = <T>(url: string, params?: FetchRequestParams, resource?: Resource) => Promise<TResponse<T>>

export type HttpPost = <T>(url: string, params?: HttpPostParams, resource?: Resource) => Promise<TResponse<T>>

export type HttpPatch = <T>(url: string, params?: HttpPatchParams, resource?: Resource) => Promise<TResponse<T>>

export type HttpDelete = <T>(url: string, params?: HttpDeleteParams, resource?: Resource) => Promise<TResponse<T>>

// Prepare json response
export type Renderable = <T>(promise: Response) => Promise<JsonResponse<T> | Error>

// Prepare bearer token
export type Authenticatable = () => Promise<Passport | null>

// Prepare exception report
export type Reportable = (error: Throwable) => void

export const HttpStatus = [
  400, // BadRequest
  401, // Unauthorized
  403, // Forbidden
  404, // NotFound
  405, // MethodNotAllowed
  419, // PageExpired
  422, // Validation
  429, // TooManyRequests
  500, // ServerError
  502 // BadGateway
]
