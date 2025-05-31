// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// Type Imports
import type { SystemMode } from '@/@core/types'

// Configs Imports
import type { Locale } from '@/configs/i18n'

// Util Imports
import { getServerMode, getSystemMode } from '@core/utils/serverHelpers'

// Vars
const NotFound = dynamic(() => import('@views/NotFound'))
const Unauthenticated = dynamic(() => import('@views/Unauthenticated'))
const Unauthorized = dynamic(() => import('@views/Unauthorized'))

type Slug = 'authenticated' | 'not-found' | 'authorized'

type Params = {
  lang: Locale
  slug: string[]
}

const blade = (slug: Slug, lang: Locale, mode: SystemMode): ReactElement => {
  switch (slug) {
    case 'not-found':
      return <NotFound mode={mode} lang={lang} />
    case 'authenticated':
      return <Unauthenticated mode={mode} lang={lang} />
    case 'authorized':
      return <Unauthorized mode={mode} lang={lang} />
  }
}

const NotFoundPage = async (props: Promise<{ params: Params }>) => {
  // Props
  const { params } = await props
  const { lang, slug } = await params

  // Vars
  const direction = 'ltr'
  const mode = await getServerMode()
  const systemMode = await getSystemMode()

  return (
    <Providers direction={direction}>
      <BlankLayout systemMode={systemMode}>{blade(slug.at(-1) as Slug, lang, mode)}</BlankLayout>
    </Providers>
  )
}

export default NotFoundPage
