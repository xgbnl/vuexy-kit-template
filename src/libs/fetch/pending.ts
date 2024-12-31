// Import
import { ResponseType } from '@types/httpTypes'

interface PendingRequest {

  accept(contentType: ResponseType): PendingRequest

}

export default PendingRequest
