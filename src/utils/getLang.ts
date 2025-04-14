// Configs Imports
import type { Locale } from '@/configs/i18n'
import { i18n } from '@/configs/i18n'

export function getLang(pathName: string): Locale {
  const locales = pathName.match(/^\/([a-z]{2})(\/|$)/)

  return (locales?.at(1) ?? i18n.defaultLocale) as Locale
}
