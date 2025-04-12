// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@views/NotFound'

// Util Imports
import { getServerMode, getSystemMode } from '@core/utils/serverHelpers'

// Types Imports
import type { Locale } from '@/configs/i18n'

const NotFoundPage = async (props: { params: Promise<{ lang: Locale }> }) => {
  // Vars
  const direction = 'ltr'
  const mode = await getServerMode()
  const systemMode = await getSystemMode()
  const params = await props.params

  return (
    <Providers direction={direction} lang={params.lang}>
      <BlankLayout systemMode={systemMode}>
        <NotFound mode={mode} />
      </BlankLayout>
    </Providers>
  )
}

export default NotFoundPage
