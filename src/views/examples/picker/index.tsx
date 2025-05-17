'use client'

// React Imports
import type { ReactElement } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Components Imports
import TimePicker from '@/components/apps/time-picker'
import DateRange from '@/components/apps/date-range'
import CustomTextField from '@/@core/components/mui/TextField'

// Styles Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

const PickerExample = (): ReactElement => {
  return (
    <Grid container rowSpacing={4}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h2'>Date Pickers</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1'>Time picker</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TimePicker onChange={(date): void => console.log(date)} value={new Date()} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1'>Date Range</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <DateRange
          start={new Date()}
          end={new Date()}
          onChange={value => {
            console.log(value)
          }}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1'>Date Picker</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <AppReactDatepicker
          selected={new Date()}
          dateFormat='yyyy-MM-dd'
          showYearDropdown
          showMonthDropdown
          onChange={(date: Date | null) => console.log(date)}
          placeholderText='placeholder'
          customInput={<CustomTextField fullWidth label='Date picker' />}
        />
      </Grid>
    </Grid>
  )
}

export default PickerExample
