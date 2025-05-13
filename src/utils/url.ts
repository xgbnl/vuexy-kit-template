// Utils Imports
import { ensurePrefix } from '@/utils/string'

/**
 * Get Server url.
 * @param path Web Server route.
 * @returns String
 */
export function getAppUrl(path: string): string {
  return process.env.NEXT_PUBLIC_API_URL + ensurePrefix(path, '/')
}

/**
 * Get oss url
 * @param filename Upload file path. eg: users/avatar/avatar.png
 * @returns String
 */
export function getOssUrl(filename: string): string {
  return process.env.NEXT_PUBLIC_OSS_URL + ensurePrefix(filename, '/')
}
