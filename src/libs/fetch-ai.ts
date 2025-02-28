// Node Imports
import type { Blob } from 'node:buffer'

// ThirdParty Imports
import qs from 'qs'

// React Imports
import { toast } from 'react-toastify'

// MUI Imports

// Utils Imports
import { getLocale } from '@utils/getLocale'

interface PathVariables {
  key: string
  value: string | number
}

interface RequestParams {
  pathVariables?: PathVariables[]
  params?: Record<string, any>
  body?: Record<string, any>
}

export interface SymfonyResponse<T> {
  msg: string
  code: number
  data: T
}

type Resource = 'json' | 'blob' | 'text' | 'buffer'
type ResponseType<T> = string | ArrayBuffer | Blob | SymfonyResponse<T>

const httpClient = async <T>(options: HttpRequestOption): Promise<ResponseType<T>> => {
  const controller = new AbortController()
  const { url, method, headers, body, pathVariables, params, resource } = options

  const fetchUrl = buildUrl(url, pathVariables, params)
  const fetchOptions: RequestInit = {
    method,
    headers: buildHeaders(headers, body, method),
    signal: controller.signal,
    body: method !== 'GET' ? JSON.stringify(body) : undefined
  }

  const responsable = await fetch(fetchUrl, fetchOptions)
  if (!responsable.ok) throw new Error(`HTTP error: ${responsable.status}`)

  return handleResponse<T>(responsable, resource)
}

const buildUrl = (url: string, pathVariables?: PathVariables[], params?: Record<string, any>): string => {
  if (pathVariables) {
    pathVariables.forEach(({ key, value }) => {
      url = url.replace(`:${key}`, String(value))
    })
  }
  return params ? `${url}?${qs.stringify(params)}` : url
}

const buildHeaders = (headers: Record<string, string> = {}, body?: any, method?: string): Record<string, string> => {
  const defaultHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(method !== 'GET' && { 'Content-Type': 'application/json;charset=UTF-8' })
  }
  return { ...defaultHeaders, ...headers }
}

const handleResponse = async <T>(responsable: Response, resource: Resource): Promise<ResponseType<T>> => {
  switch (resource) {
    case 'text':
      return responsable.text()
    case 'blob':
      return responsable.blob()
    case 'buffer':
      return responsable.arrayBuffer()
    default:
      const jsonResponse: SymfonyResponse<T> = await responsable.json()
      handleErrorResponse(jsonResponse)
      return jsonResponse
  }
}

const handleErrorResponse = <T>(response: SymfonyResponse<T>): void => {
  if ([400, 401, 403, 404, 419, 422, 500].includes(response.code)) {
    if (response.code === 401) {
      const locale = getLocale() as string
      toast.error(response.msg, {
        delay: 1000,
        onClose: () => window.location.replace(`/${locale}/login`)
      })
    } else {
      throw new Error(response.msg)
    }
  }
}

interface HttpRequestOption extends Partial<RequestParams> {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  url: string
  resource: Resource
}

// 请求方法
export const get = <T>(
  url: string,
  params: Partial<RequestParams> = {},
  resource: Resource = 'json'
): Promise<ResponseType<T>> => {
  return httpClient<T>({ method: 'GET', url, ...params, resource })
}

export const post = <T>(
  url: string,
  params: Pick<RequestParams, 'body'>,
  resource: Resource = 'json'
): Promise<ResponseType<T>> => {
  return httpClient<T>({ method: 'POST', url, ...params, resource })
}

export const patch = <T>(
  url: string,
  params: Partial<Omit<RequestParams, 'params'>>,
  resource: Resource = 'json'
): Promise<ResponseType<T>> => {
  return httpClient<T>({ method: 'PATCH', url, ...params, resource })
}

export const destroy = <T>(
  url: string,
  params: Partial<Pick<RequestParams, 'pathVariables'>>,
  resource: Resource = 'json'
): Promise<ResponseType<T>> => {
  return httpClient<T>({ method: 'DELETE', url, ...params, resource })
}
