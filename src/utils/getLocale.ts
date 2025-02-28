export const getLocale = (pathName: string | null = null): string | null => {
  const pathname: string = pathName ?? (typeof window !== 'undefined' ? window.location.pathname : '')

  if (!pathname) {
    return null
  }

  const pathParts = pathname.split('/')

  if (pathParts.length > 1) {
    const languageCode = pathParts[1]

    if (languageCode.length === 2) {
      return languageCode
    }
  }

  return null
}
