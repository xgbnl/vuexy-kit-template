// Type Imports
import type { ChildrenType, Direction } from '@core/types'

// Context Imports
import { NextAuthProvider } from '@/contexts/nextAuthProvider'
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import AppReactToastify from '@/libs/styles/AppReactToastify'
import DatepickerLocalizationProvider from '@/hocs/DatepickerLocalizationProvider'

// Util Imports
import { getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'

// Redux Imports
import ReduxStoreProvider from '@/hocs/ReduxStoreProvider'
import type { Locale } from '@/configs/i18n'

type Props = ChildrenType & {
  direction: Direction
  lang: Locale
}

const Providers = async (props: Props) => {
  // Props
  const { children, direction, lang } = props

  // Vars
  const mode = await getMode()
  const settingsCookie = await getSettingsFromCookie()
  const systemMode = await getSystemMode()

  return (
    <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>
      <VerticalNavProvider>
        <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
          <ThemeProvider direction={direction} systemMode={systemMode}>
            <ReduxStoreProvider>
              <DatepickerLocalizationProvider lang={lang}>{children}</DatepickerLocalizationProvider>
            </ReduxStoreProvider>
            <AppReactToastify direction={direction} hideProgressBar />
          </ThemeProvider>
        </SettingsProvider>
      </VerticalNavProvider>
    </NextAuthProvider>
  )
}

export default Providers
