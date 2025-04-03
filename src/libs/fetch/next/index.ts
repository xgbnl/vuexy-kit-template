// NextAuth Imports
import type { Session } from 'next-auth'

// Libs Imports
import { auth } from '@/libs/auth'

// Constant Imports
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
  HttpGetParams,
  HttpPostParams,
  HttpPatchParams,
  HttpDeleteParams,
  Resource,
  HttpResponse
} from '@/configs/fetch'

// Abstract implements
const NextRenderable: Renderable = async <T>(promise: Response): Promise<JsonResponse<T> | Error> => {
  const response: JsonResponse<T> = await promise.json()

  if (HttpStatus.includes(response.code)) {
    return Promise.reject(new Error(response.msg))
  }

  return response
}

const NextAuthorzation: Authenticatable = async (): Promise<Passport | null> => {
  const session: Session | null = await auth()

  return session?.user?.passport ? { bearerToken: session.user.passport } : null
}

export const Get: HttpGet = <T>(url: string, params: HttpGetParams, resource: Resource): Promise<HttpResponse<T>> => {
  return fetcher<T>(
    {
      url,
      resource,
      method: 'GET',
      params: params.params,
      pathVariables: params.pathVariables,
      body: params.body
    },
    NextRenderable,
    NextAuthorzation
  )
}

export const Post: HttpPost = <T>(
  url: string,
  params: HttpPostParams,
  resource: Resource
): Promise<HttpResponse<T>> => {
  return fetcher<T>(
    {
      url,
      resource,
      method: 'POST',
      body: params.body
    },
    NextRenderable,
    NextAuthorzation
  )
}

export const Patch: HttpPatch = <T>(
  url: string,
  params: HttpPatchParams,
  resource: Resource
): Promise<HttpResponse<T>> => {
  return fetcher<T>(
    {
      url,
      resource,
      method: 'PATCH',
      body: params.body,
      pathVariables: params.pathVariables
    },
    NextRenderable,
    NextAuthorzation
  )
}

export const Delete: HttpDelete = <T>(
  url: string,
  params: HttpDeleteParams,
  resource: Resource
): Promise<HttpResponse<T>> => {
  return fetcher<T>(
    {
      url,
      resource,
      method: 'DELETE',
      pathVariables: params.pathVariables
    },
    NextRenderable,
    NextAuthorzation
  )
}
