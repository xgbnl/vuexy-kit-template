// MUI Imports
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

// I18n Imports
import { i18n } from '@/configs/i18n'
import { headers } from 'next/headers'
import type { Locale } from '@/configs/i18n'
import TranslationWrapper from '@/hocs/TranslationWrapper'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'Vuexy - MUI Next.js Admin Dashboard Template',
  description:
    'Vuexy - MUI Next.js Admin Dashboard Template - is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.'
}

const RootLayout = async (props: ChildrenType & { params: Promise<{ lang: Locale }> }) => {

  const params = await props.params
  const { children } = props

  const headersList = await headers()

  // Vars

  const systemMode = await getSystemMode()
  const direction = i18n.langDirection[params.lang]

  return (
    <TranslationWrapper headersList={headersList} lang={params.lang}>
      <html id="__next" lang={params.lang} dir={direction} suppressHydrationWarning>
      <body className="flex is-full min-bs-full flex-auto flex-col">
      <InitColorSchemeScript attribute="data" defaultMode={systemMode} />
      {children}
      </body>
      </html>
    </TranslationWrapper>
  )
}

export default RootLayout
