// Hooks Imports
import { Locale } from '@configs/i18n'

export const getLocale = (pathName: string | null = null): Locale | null => {
  const pathname: string = pathName ?? (typeof window !== 'undefined' ? window.location.pathname : '')

  if (!pathname) {
    return null
  }

  const pathParts = pathname.split('/')

  if (pathParts.length > 1) {
    const languageCode = pathParts[1] as Locale

    if (languageCode.length === 2) {
      return languageCode
    }
  }

  return null
}
