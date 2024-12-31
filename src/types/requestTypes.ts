// Import type.
import type { HasAttribute } from '@/types/attributeTypes'

// Define base request params body.
export type RequestBody = {
  pathVariables: PathVariables[],
  params: {},
  body: {},
}

// Define base path variables type of get,path,delete methods.
export type PathVariables = {
  key: string,
  value: string | number,
}

// Defined base pagination response.
type Pagination = {
  total: number,
  perPage: number,
  currentPage: number,
}

type ResponseDataStructure = {
  list: HasAttribute[],
  detail: HasAttribute,
  [prop: string]: any,
} & Pagination

// Defined request body
export type GetRequestBody = Partial<RequestBody>

export type PostRequestBody = Partial<Pick<RequestBody, 'body'>>

export type PATCHRequestBody = Partial<Omit<RequestBody, 'params'>>

export type DeleteRequestBody = Partial<Pick<RequestBody, 'pathVariables'>>

// Defined response interface.
export type ResponseInterface = {
  msg: string,
  code: number,
  data: Partial<ResponseDataStructure> | null,
}
