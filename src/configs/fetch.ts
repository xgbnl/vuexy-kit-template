// Http response status code
export enum ResponseStatus {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
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
  ResponseStatus.MethodNotAllowed,
  ResponseStatus.PageExpired,
  ResponseStatus.Validation,
  ResponseStatus.TooManyRequests,
  ResponseStatus.ServerError
]
