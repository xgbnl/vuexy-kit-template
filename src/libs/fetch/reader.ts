// Import types.
import type { Blob } from 'node:buffer'

// Type Imports
import type { Response, ResponseType, ResponseInterface } from '@types/fetchTypes'

interface ResponseReader<T extends Response> {
  read(response: Response): Promise<T>
}

const TextReader: ResponseReader<string> = {
  read(response: Response): Promise<string> {
    return response.text()
  }
}

const BufferReader: ResponseReader<ArrayBuffer> = {
  read(response: Response): Promise<ArrayBuffer> {
    return response.arrayBuffer()
  }
}

const BlobReader: ResponseReader<Blob> = {
  read(response: Response): Promise<Blob> {
    return response.blob() as Promise<Blob>
  }
}

const JsonReader: ResponseReader<ResponseInterface<unknown> | any> = {
  read(response: Response): Promise<string | ResponseInterface<unknown>> {
    return response.json()
  }
}

type Interceptor = {
  [key in ResponseType]: ResponseReader<Response>
}

export const interceptors: Interceptor = {
  json: JsonReader,
  blob: BlobReader,
  arrayBuffer: BufferReader,
  text: TextReader,
}
