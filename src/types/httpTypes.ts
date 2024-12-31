// Interface Imports
import { RequestBody, type ResponseInterface } from '@/types/requestTypes'
import { Blob } from 'node:buffer'

// Define base response
export type Response = string | ArrayBuffer | Blob | ResponseInterface | any

// Define fetch response types.
export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer'

// Request Methods.
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// Http request options.
export type HttpRequestOption = {
  method: Method
  headers?: object
  signal?: any
  mode?: string
  cache?: string
  url: string
} & Partial<RequestBody>
