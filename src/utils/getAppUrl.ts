// Utils Imports
import { ensurePrefix } from '@/utils/string'

export function getAppUrl(path: string): string {
  return process.env.NEXT_API_URL + ensurePrefix(path, '/')
}
