export const getLanguageFromPathname = (): string | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const pathname: string = window.location.pathname
  const pathParts = pathname.split('/')

  if (pathParts.length > 1) {
    const languageCode = pathParts[1]

    if (languageCode.length === 2) {
      return languageCode
    }
  }

  return null
}
