// React Imports
import { useState, forwardRef } from 'react'

// MUI Imports
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import { format, addDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'

// Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import CustomTextField from '@core/components/mui/TextField'

type CustomInputProps = TextFieldProps & {
  label: string
  end: Date | number
  start: Date | number
}

const PickersRange = () => {
  // States
  const [startDateRange, setStartDateRange] = useState<Date | null | undefined>(new Date())
  const [endDateRange, setEndDateRange] = useState<Date | null | undefined>(addDays(new Date(), 45))

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates

    setStartDateRange(start)
    setEndDateRange(end)
  }

  const CustomInput = forwardRef((props: CustomInputProps, ref) => {
    const { label, start, end, ...rest } = props

    const startDate = format(start, 'yyyy-MM-dd')
    const endDate = end !== null ? ` 至 ${format(end, 'yyyy-MM-dd')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
  })

  return (
    <AppReactDatepicker
      selectsRange
      locale={zhCN}
      monthsShown={2}
      endDate={endDateRange as Date}
      selected={startDateRange}
      startDate={startDateRange as Date}
      shouldCloseOnSelect={false}
      id='date-range-picker-months'
      onChange={handleOnChangeRange}
      customInput={
        <CustomInput
          label='Multiple Months'
          end={endDateRange as Date | number}
          start={startDateRange as Date | number}
        />
      }
    />
  )
}

export default PickersRange
