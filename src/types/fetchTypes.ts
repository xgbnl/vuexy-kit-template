// Interface Imports
import type { Blob } from 'node:buffer'

export type PathVariables = {
  key: string
  value: string | number
}

export type RequestBody = {
  pathVariables: PathVariables[]
  params: {}
  body: {}
}

export type Pagination<Model> = {
  total: number
  perPage: number
  currentPage: number
  list: Model[]
}

// Defined request body
export type GetRequestBody = Partial<RequestBody>

export type PostRequestBody = Partial<Pick<RequestBody, 'body'>>

export type PATCHRequestBody = Partial<Omit<RequestBody, 'params'>>

export type DeleteRequestBody = Partial<Pick<RequestBody, 'pathVariables'>>

export type ResponseInterface<RValue> = {
  msg: string
  code: number
  data: RValue
}

export type Response = string | ArrayBuffer | Blob | ResponseInterface<unknown> | any

export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer'

export type HttpRequestOption = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: object
  signal?: any
  mode?: string
  cache?: string
  url: string
} & Partial<RequestBody>
