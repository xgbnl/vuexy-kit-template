// NextAuth Imports
import { getSession } from 'next-auth/react'
import type { Session } from 'next-auth'

// ThirdParty Imports
import { toast } from 'react-toastify'

// Configs Imports
import type { Locale } from '@/configs/i18n'
import { HttpStatus } from '@/configs/fetch'
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
  HttpResponse
} from '@/configs/fetch'

// Utils Imports
import { getLocale } from '@/utils/getLocale'

// Fetch Imports
import { fetcher } from '../index'

const ReactRenderable: Renderable = async <T>(promise: Response): Promise<JsonResponse<T> | Error> => {
  const response: JsonResponse<T> = await promise.json()

  if (HttpStatus.includes(response.code)) {
    if (response.code === 401) {
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

const ReactAuthorization: Authenticatable = async (): Promise<Passport | null> => {
  const session: Session | null = await getSession()

  return session?.user?.passport ? { bearerToken: session.user.passport } : null
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
    ReactRenderable,
    ReactAuthorization
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
    ReactRenderable,
    ReactAuthorization
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
    ReactRenderable,
    ReactAuthorization
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
    ReactRenderable,
    ReactAuthorization
  )
}
