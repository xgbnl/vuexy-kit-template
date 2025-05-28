// NextAuth Imports
import { getSession } from 'next-auth/react'
import type { Session } from 'next-auth'

// ThirdParty Imports
import { toast } from 'react-toastify'

// Types Imports
import type {
  Authenticatable,
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

// Fetch Imports
import { fetcher } from '../fetcher'
import { getLang } from '@/utils/getLang'

const authorization: Authenticatable = async (): Promise<Passport | null> => {
  const session: Session | null = await getSession()

  return session?.user?.passport ? { bearerToken: session.user.passport } : null
}

const report: Reportable = (error: Throwable): void => {
  const { code, msg } = error

  if (code === 401) {
    toast.info<string>(msg, {
      delay: 1000,
      onClose: () => window.location.replace(`/${getLang(window.location.pathname)}/login`)
    })
  }

  if ([422, 403].includes(code)) {
    toast.warning<string>(msg)
  }

  if (code === 404) {
    toast<string>(msg)
  }

  toast.error<string>(msg)
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
    authorization,
    report
  )
}
