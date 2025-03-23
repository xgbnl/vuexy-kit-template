// Node Imports
import { randomBytes } from 'crypto'

export const uuid = (): string => {
  const bytes = randomBytes(16)

  return 'xxxx-xxxx-4xxx-yxxx-xxxx-xxxx'.replace(/[xy]/g, function (c, index) {
    const byte = bytes[index % 16]
    const r = byte & 0xf
    const v = c === 'x' ? r : (r & 0x3) | 0x8

    return v.toString(16)
  })
}
