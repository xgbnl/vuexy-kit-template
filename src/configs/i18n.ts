export const i18n = {
  defaultLocale: 'en',
  locales: ['en','zh'],
  langDirection: {
    en: 'ltr',
    zh: 'ltr',
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
