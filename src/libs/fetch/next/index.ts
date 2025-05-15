// NextAuth Imports
import type { Session } from 'next-auth'

// Libs Imports
import { auth } from '@/libs/auth'

// Configs Imports
import { HttpStatus } from '@/configs/fetch'

// Fetch Imports
import { fetcher } from '../index'

// Types Imports
import type {
  Renderable,
  Authenticatable,
  JsonResponse,
  Passport,
  HttpGet,
  HttpPost,
  HttpPatch,
  HttpDelete,
  FetchRequestParams,
  HttpPostParams,
  HttpPatchParams,
  HttpDeleteParams,
  Resource,
  TResponse,
  Reportable,
  Throwable
} from '@/libs/fetch/types'

// Abstract implements
const render: Renderable = async <T>(promise: Response): Promise<JsonResponse<T> | Error> => {
  const response: JsonResponse<T> = await promise.json()

  if (HttpStatus.includes(response.code)) {
    return Promise.reject(new Error(response.msg))
  }

  return response
}

const authorization: Authenticatable = async (): Promise<Passport | null> => {
  const session: Session | null = await auth()

  return session?.user?.passport ? { bearerToken: session.user.passport } : null
}

const report: Reportable = (error: Throwable): Promise<Throwable> => {
  return Promise.reject(error)
}

export const get: HttpGet = <T>(
  url: string,
  params: FetchRequestParams = {},
  resource: Resource = 'json'
): Promise<TResponse<T>> => {
  return fetcher<T>(
    {
      url,
      resource,
      method: 'GET',
      params: params.params,
      pathVariables: params.pathVariables,
      body: params.body
    },
    render,
    authorization,
    report
  )
}

export const post: HttpPost = <T>(
  url: string,
  params: HttpPostParams = {},
  resource: Resource = 'json'
): Promise<TResponse<T>> => {
  return fetcher<T>(
    {
      url,
      resource,
      method: 'POST',
      body: params.body
    },
    render,
    authorization,
    report
  )
}

export const patch: HttpPatch = <T>(
  url: string,
  params: HttpPatchParams = {},
  resource: Resource = 'json'
): Promise<TResponse<T>> => {
  return fetcher<T>(
    {
      url,
      resource,
      method: 'PATCH',
      body: params.body,
      pathVariables: params.pathVariables
    },
    render,
    authorization,
    report
  )
}

export const destroy: HttpDelete = <T>(
  url: string,
  params: HttpDeleteParams = {},
  resource: Resource = 'json'
): Promise<TResponse<T>> => {
  return fetcher<T>(
    {
      url,
      resource,
      method: 'DELETE',
      pathVariables: params.pathVariables
    },
    render,
    authorization,
    report
  )
}
