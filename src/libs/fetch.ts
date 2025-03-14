// Node Imports
import type { Blob } from 'node:buffer'

// ThirdParty Imports
import qs from 'qs'

// React Imports
import { toast } from 'react-toastify'

// NEXT Imports
import { getSession } from 'next-auth/react'
import type { Session } from 'next-auth'

// NextAuthSession Imports
import { auth } from '@/app/api/auth/[...nextauth]/route'

// Utils Imports
import { ensurePrefix } from '@utils/string'
import { isPlainObject } from '@utils/isPlainObject'
import { getLocale } from '@utils/getLocale'

// Hooks Imports
import type { Locale } from '@/configs/i18n'

// Interfaces
interface PathVariables {
  key: string
  value: string | number
}

interface RequestParams {
  pathVariables: PathVariables[]
  params: Record<string, string | number>
  body: Record<string, unknown>
}

export interface Responder<T> {
  msg: string
  code: number
  data: T
}

type HttpResponse<T> = T extends string
  ? string
  : T extends Blob
    ? Blob
    : T extends ArrayBuffer
      ? ArrayBuffer
      : T extends Responder<infer U>
        ? Responder<U>
        : never

type Resource = 'json' | 'blob' | 'text' | 'buffer'

interface HttpRequestOption extends Partial<RequestParams> {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  url: string
  resource: Resource
}

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
    headers: await prepareHeaders(options),
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

      return handelJsonResponse<T>(response) as Promise<HttpResponse<T>>
    })
    .catch(err => {
      if (isNextEnv()) {
        return Promise.reject(err.message || err)
      }

      toast.error<string>(err.message)
    })
    .finally(() => {
      delete pendingRequests[options.url]
    }) as Promise<HttpResponse<T>>
}

const buildUrl = (option: Pick<HttpRequestOption, 'params' | 'url' | 'pathVariables'>): string => {
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

  return process.env.NEXT_PUBLIC_API_URL + ensurePrefix(url, '/')
}

const prepareHeaders = async (
  option: Pick<HttpRequestOption, 'headers' | 'body' | 'method'>
): Promise<Record<string, string>> => {
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

  const session: Session | null = isNextEnv() ? await auth() : await getSession()

  if (session?.user?.passport) {
    headers['Authorization'] = 'Bearer ' + session.user.passport
  }

  return Promise.resolve(Object.assign(headers, header))
}

const handelJsonResponse = async <T>(promise: Response): Promise<Responder<T> | Error> => {
  const response: Responder<T> = await promise.json()

  if ([400, 401, 403, 404, 419, 422, 500].includes(response.code)) {
    if (isNextEnv()) {
      return response
    }

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

// Determine that the current environment is the Next server
const isNextEnv = (): boolean => {
  return typeof window === 'undefined'
}

export const get = <T>(
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

export const post = <T>(
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

export const patch = <T>(
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

export const destroy = <T>(
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
