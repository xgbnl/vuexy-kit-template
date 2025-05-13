'use client'

// React Imports
import { useState, useMemo } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import type { BaseTextFieldProps } from '@mui/material'

// Third-party Imports
import { zhCN, enUS } from 'date-fns/locale'
import type { Locale as DateFnsLocale } from 'date-fns'

// Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import CustomTextField from '@core/components/mui/TextField'

// Utils
import { serializeTime, serializeDate } from '@/utils/carbon'

// Configs Imports
import { i18n } from '@/configs/i18n'
import type { Locale } from '@/configs/i18n'

interface DatetimeInterface {
  timestamp: string
  time: 'PM' | 'AM'
  format: string
}

type Props = {
  value?: Date
  onChange: (date: DatetimeInterface) => void
} & Pick<BaseTextFieldProps, 'label'>

const TimePicker = ({ onChange, value, label }: Props) => {
  // States
  const [time, setTime] = useState<Date | null | undefined>(value ?? new Date())

  const { lang } = useParams<{ lang: Locale }>()

  const locale = useMemo<DateFnsLocale>(() => (lang === i18n.defaultLocale ? zhCN : enUS), [lang])

  // Hooks
  const handleChange = (date: Date | null): void => {
    setTime(date)
    onChange({
      timestamp: serializeDate(date),
      time: (date as Date).getHours() > 12 ? 'PM' : 'AM',
      format: serializeTime(date)
    })
  }

  return (
    <AppReactDatepicker
      showTimeSelect
      locale={locale}
      selected={time}
      timeIntervals={15}
      showTimeSelectOnly
      dateFormat='h:mm aa'
      id='time-only-picker'
      onChange={handleChange}
      customInput={<CustomTextField label={label ?? 'Time Only'} fullWidth />}
    />
  )
}

export default TimePicker
