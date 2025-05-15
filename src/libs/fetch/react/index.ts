// NextAuth Imports
import { getSession } from 'next-auth/react'
import type { Session } from 'next-auth'

// ThirdParty Imports
import { toast } from 'react-toastify'

// Configs Imports
import { HttpStatus } from '@/configs/fetch'

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
  HttpGetParams,
  HttpPostParams,
  HttpPatchParams,
  HttpDeleteParams,
  Resource,
  HttpResponse,
  Reportable,
  Throwable
} from '@/libs/fetch/types'

// Fetch Imports
import { fetcher } from '../index'
import { getLang } from '@/utils/getLang'

const render: Renderable = async <T>(promise: Response): Promise<JsonResponse<T> | Error> => {
  const response: JsonResponse<T> = await promise.json()

  if (HttpStatus.includes(response.code)) {
    if (response.code === 401) {
      toast.error<string>(response.msg, {
        delay: 1000,
        onClose: () => window.location.replace(`/${getLang(window.location.pathname)}/login`)
      })
    }

    return Promise.reject(new Error(response.msg))
  }

  return response
}

const authorization: Authenticatable = async (): Promise<Passport | null> => {
  const session: Session | null = await getSession()

  return session?.user?.passport ? { bearerToken: session.user.passport } : null
}

const report: Reportable = (error: Throwable): Promise<Throwable> => {
  if (HttpStatus.includes(error.code)) {
    toast.error<string>(error.msg)
  }

  return Promise.reject(error)
}

export const Get: HttpGet = <T>(
  url: string,
  params: HttpGetParams = {},
  resource: Resource = 'json'
): Promise<HttpResponse<T>> => {
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

export const Post: HttpPost = <T>(
  url: string,
  params: HttpPostParams = {},
  resource: Resource = 'json'
): Promise<HttpResponse<T>> => {
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

export const Patch: HttpPatch = <T>(
  url: string,
  params: HttpPatchParams = {},
  resource: Resource = 'json'
): Promise<HttpResponse<T>> => {
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

export const Delete: HttpDelete = <T>(
  url: string,
  params: HttpDeleteParams = {},
  resource: Resource = 'json'
): Promise<HttpResponse<T>> => {
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
