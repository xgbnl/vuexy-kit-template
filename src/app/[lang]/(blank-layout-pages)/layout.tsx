// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

// Types Imports
import type { Locale } from '@/configs/i18n'

type Props = ChildrenType & { params: Promise<{ lang: Locale }> }

const Layout = async (props: Props) => {
  const { children } = props

  const params = await props.params

  // Vars
  const direction = 'ltr'
  const systemMode = await getSystemMode()

  return (
    <Providers direction={direction} lang={params.lang}>
      <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
    </Providers>
  )
}

export default Layout
