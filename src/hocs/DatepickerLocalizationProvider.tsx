'use client'

// MUI Imports
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

// Third-Party Imports
import { zhCN, enUS } from 'date-fns/locale'

// Types Import
import type { ChildrenType } from '@/@core/types'
import type { Locale } from '@/configs/i18n'

type Props = ChildrenType & {
  lang: Locale
}

export default function DatepickerLocalizationProvider({ children, lang }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={lang === 'zh' ? zhCN : enUS}>
      {children}
    </LocalizationProvider>
  )
}
