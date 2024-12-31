// Request type Imports
import type { DeleteRequestBody, GetRequestBody, PATCHRequestBody, PostRequestBody } from '@/types/requestTypes'

// Response type Imports
import type { Response, ResponseType } from '@/types/httpTypes'

interface Request {
  get<T extends GetRequestBody, R extends Response>(url: string, req: T): Promise<R>

  post<T extends PostRequestBody, R extends Response>(url: string, req: T): Promise<R>

  patch<T extends PATCHRequestBody, R extends Response>(url: string, req: T): Promise<R>

  delete<T extends DeleteRequestBody, R extends Response>(url: string, req: T): Promise<R>
}

export default Request
