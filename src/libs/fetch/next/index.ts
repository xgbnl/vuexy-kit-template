// Next Imports
import { redirect } from 'next/navigation'

// Third-party Imports
import type { Session } from 'next-auth'

// Libs Imports
import { auth } from '@/libs/auth'

// Fetch Imports
import { fetcher } from '../fetcher'

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

const authorization: Authenticatable = async (): Promise<Passport | null> => {
  const session: Session | null = await auth()

  return session?.user?.passport ? { bearerToken: session.user.passport } : null
}

const report: Reportable = (error: Throwable): void => {
  if (error.code === 401) {
    redirect('authenticated')
  }

  if (error.code === 403) {
    redirect('authorized')
  }

  if (error.code === 404) {
    redirect('not-found')
  }
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
