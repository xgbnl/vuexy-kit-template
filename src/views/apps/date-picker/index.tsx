'use client'

// React Imports
import { useState, forwardRef, useMemo } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import type { Locale as DateFnsLocale } from 'date-fns'

// Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import CustomTextField from '@core/components/mui/TextField'

// Configs Imports
import { i18n } from '@/configs/i18n'
import type { Locale } from '@/configs/i18n'

type CustomInputProps = TextFieldProps & {
  label: string
  end: Date | number
  start: Date | number
}

type Props = {
  onChange: (value: Pick<CustomInputProps, 'end' | 'start'>) => void
} & Partial<Pick<CustomInputProps, 'label'>>

const PickersRange = ({ label, onChange }: Props) => {
  // States
  const [startDateRange, setStartDateRange] = useState<Date | null | undefined>(new Date())
  const [endDateRange, setEndDateRange] = useState<Date | null | undefined>(new Date())
  const { lang } = useParams<{ lang: Locale }>()

  const { locale, dateFormat } = useMemo<{ locale: DateFnsLocale; dateFormat: string }>(() => {
    const isDefaultLocale = lang === i18n.defaultLocale

    return {
      locale: isDefaultLocale ? zhCN : enUS,
      dateFormat: isDefaultLocale ? 'yyyy-MM-dd' : 'MM/dd/yyyy'
    }
  }, [lang])

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates

    setStartDateRange(start)
    setEndDateRange(end)

    onChange({ start, end })
  }

  const CustomInput = forwardRef((props: CustomInputProps, ref) => {
    const { label, start, end, ...rest } = props

    const startDate = format(start, dateFormat)
    const endDate = end !== null ? ` - ${format(end, dateFormat)}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
  })

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <AppReactDatepicker
          locale={locale}
          selectsRange
          monthsShown={2}
          endDate={endDateRange as Date}
          selected={startDateRange}
          startDate={startDateRange as Date}
          shouldCloseOnSelect={false}
          id='date-range-picker-months'
          onChange={handleOnChangeRange}
          customInput={
            <CustomInput
              label={label ?? 'Multiple Months'}
              end={endDateRange as Date | number}
              start={startDateRange as Date | number}
              slotProps={{
                input: {
                  endAdornment: <span className='tabler-calendar-time'></span>
                }
              }}
            />
          }
        />
      </Grid>
    </Grid>
  )
}

export default PickersRange
