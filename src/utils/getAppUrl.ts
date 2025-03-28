// Utils Imports
import { ensurePrefix } from '@/utils/string'

export function getAppUrl(path: string): string {
  return process.env.NEXT_PUBLIC_API_URL + ensurePrefix(path, '/')
}
