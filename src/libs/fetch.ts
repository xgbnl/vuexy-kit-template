// Node Imports
import type { Blob } from 'node:buffer'

// ThirdParty Imports
import qs from 'qs'

// React Imports
import { toast } from 'react-toastify'

// NEXT Imports
import { getSession } from 'next-auth/react'
import type { Session } from 'next-auth'

// Utils Imports
import { isPlainObject } from '@utils/isPlainObject'
import { getLocale } from '@utils/getLocale'
import { getAppUrl } from '@/utils/getAppUrl'

// Hooks Imports
import type { Locale } from '@/configs/i18n'

// Interfaces
type PathVariables = {
  key: string
  value: string | number
}

type RequestParams = {
  pathVariables: PathVariables[]
  params: Record<string, string | number>
  body: Record<string, unknown>
}

type Resource = 'json' | 'blob' | 'text' | 'buffer'

type HttpRequestOption = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  url: string
  resource: Resource
} & Partial<RequestParams>

export type JsonResponse<T> = {
  msg: string
  code: number
  data: T
}

export type HttpResponse<T> = T extends string
  ? string
  : T extends Blob
    ? Blob
    : T extends ArrayBuffer
      ? ArrayBuffer
      : T extends JsonResponse<infer U>
        ? JsonResponse<U>
        : never

export const HttpStatus: number[] = [400, 401, 403, 404, 419, 422, 500]

// Controllers
const pendingRequests: Record<string, null | AbortController> = {}

const ABORT_WHITELIST: string[] = []

// Hooks
async function httpClient<T>(options: HttpRequestOption): Promise<HttpResponse<T>> {
  let controller: AbortController | null = null

  if (!ABORT_WHITELIST.includes(options.url)) {
    const previousController = pendingRequests[options.url]

    if (previousController) {
      previousController.abort()
    }

    controller = new AbortController()

    pendingRequests[options.url] = controller
  }

  const FETCH_REQUEST_CONFIG: {
    signal: AbortSignal | null
    mode?: string
    cache?: string
    body?: string | object
  } & Pick<HttpRequestOption, 'method' | 'headers' | 'url'> = {
    signal: controller ? controller.signal : null,
    method: options.method,
    headers: await bearerHeader(options),
    mode: 'cors',
    cache: 'no-cache',
    url: buildUrl(options)
  }

  if (options.method !== 'GET') {
    FETCH_REQUEST_CONFIG.body = isPlainObject(options.body) ? JSON.stringify(options.body) : {}
  }

  return fetch(FETCH_REQUEST_CONFIG.url, FETCH_REQUEST_CONFIG as RequestInit)
    .then((response: Response): Promise<HttpResponse<T> | Error> => {
      if (!response.ok) {
        return Promise.reject<Error>(new Error(`HTTP error: ${response.status}`))
      }

      switch (options.resource) {
        case 'text':
          return response.text() as Promise<HttpResponse<T>>
        case 'blob':
          return response.blob() as Promise<HttpResponse<T>>
        case 'buffer':
          return response.arrayBuffer() as Promise<HttpResponse<T>>
      }

      return rederable<T>(response) as Promise<HttpResponse<T>>
    })
    .catch(err => {
      toast.error<string>(err.message)
    })
    .finally(() => {
      delete pendingRequests[options.url]
    }) as Promise<HttpResponse<T>>
}

function buildUrl(option: Pick<HttpRequestOption, 'params' | 'url' | 'pathVariables'>): string {
  const { url: path, pathVariables, params } = option

  let url: string = path

  if (isPlainObject(params)) {
    const queryString: string = url.endsWith('?') ? '&' : '?' + qs.stringify(params)

    url += queryString
  }

  if (pathVariables?.length) {
    url = pathVariables.reduce<string>((accUrl: string, pathVar: PathVariables): string => {
      return accUrl.replace(':' + pathVar.key, String(pathVar.value))
    }, url)
  }

  return getAppUrl(url)
}

async function bearerHeader(
  option: Pick<HttpRequestOption, 'headers' | 'body' | 'method'>
): Promise<Record<string, string>> {
  const { headers: header, body, method } = option

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }

  if (isPlainObject(body)) {
    if (method === 'GET') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (body instanceof FormData) {
      delete headers['Content-Type']
    }
  }

  const session: Session | null = await getSession()

  if (session?.user?.passport) {
    headers['Authorization'] = 'Bearer ' + session.user.passport
  }

  return Promise.resolve(Object.assign(headers, header))
}

async function rederable<T>(promise: Response): Promise<JsonResponse<T> | Error> {
  const response: JsonResponse<T> = await promise.json()

  if (HttpStatus.includes(response.code)) {
    if (response.code !== 401) {
      const locale: Locale = getLocale() as Locale

      toast.error<string>(response.msg, {
        delay: 1000,
        onClose: () => window.location.replace(`/${locale}/login`)
      })
    }

    return Promise.reject(new Error(response.msg))
  }

  return response
}

export const Get = <T>(
  url: string,
  params: Partial<RequestParams> = {},
  resource: Resource = 'json'
): Promise<HttpResponse<T>> => {
  return httpClient<T>({
    method: 'GET',
    params: params.params,
    pathVariables: params.pathVariables,
    body: params.body,
    url,
    resource
  })
}

export const Post = <T>(
  url: string,
  params: Pick<RequestParams, 'body'>,
  resource: Resource = 'json'
): Promise<HttpResponse<T>> => {
  return httpClient<T>({
    method: 'POST',
    body: params.body,
    url,
    resource
  })
}

export const Patch = <T>(
  url: string,
  params: Partial<Omit<RequestParams, 'params'>>,
  resource: Resource = 'json'
): Promise<HttpResponse<T>> => {
  return httpClient<T>({
    method: 'PATCH',
    body: params.body,
    pathVariables: params.pathVariables,
    url,
    resource
  })
}

export const Delete = <T>(
  url: string,
  params: Partial<Pick<RequestParams, 'pathVariables'>>,
  resource: Resource = 'json'
): Promise<HttpResponse<T>> => {
  return httpClient<T>({
    method: 'DELETE',
    pathVariables: params.pathVariables,
    url,
    resource
  })
}
