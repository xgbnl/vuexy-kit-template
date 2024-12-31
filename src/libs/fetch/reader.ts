// Import types.
import type { Blob } from 'node:buffer'

import type { ResponseInterface } from '@/types/requestTypes'

import type { Response, ResponseType } from '@/types/httpTypes'

enum ResponseTypes {
  JSON = 'json',
  BLOB = 'blob',
  TEXT = 'text',
  ARRAY_BUFFER = 'arrayBuffer'
}

interface ResponseReader<T extends Response> {
  read(response: Response): Promise<T>
}

class TextReader implements ResponseReader<string> {
  read(response: Response): Promise<string> {
    return response.text()
  }
}

class BufferReader implements ResponseReader<ArrayBuffer> {
  read(response: Response): Promise<ArrayBuffer> {
    return response.arrayBuffer()
  }
}

class BlobReader implements ResponseReader<Blob> {
  read(response: Response): Promise<Blob> {
    return response.blob() as Promise<Blob>
  }
}

class JsonReader implements ResponseReader<ResponseInterface | any> {
  read(response: Response): Promise<string | ResponseInterface> {
    return response.json()
  }
}

export const responseInterceptor = <T extends Response>(type: ResponseType): ResponseReader<T> => {
  switch (type) {
    case ResponseTypes.JSON:
      return new JsonReader() as Response
    case ResponseTypes.BLOB:
      return new BlobReader() as Response
    case ResponseTypes.ARRAY_BUFFER:
      return new BufferReader() as Response
    default:
      return new TextReader() as Response
  }
}
