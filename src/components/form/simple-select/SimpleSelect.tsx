'use client'

// React Imports
import { type ReactNode } from 'react'

// MUI Imports
import MenuItem from '@mui/material/MenuItem'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

export interface Selectable {
  label: string
  value: Value
  disabled?: boolean
}

export type Value = number | string

interface Props {
  items: Selectable[]
  value: Value
  label: string
  defaultValue: Selectable
  onChange: (value: Value) => void
}

const SimpleSelect = ({ items, value, label, onChange, defaultValue }: Props) => {
  return (
    <CustomTextField
      select
      fullWidth
      label={label}
      id='custom-select'
      defaultValue={defaultValue.value}
      value={value}
      onChange={(event): void => onChange(event.target.value as any)}
      slotProps={{
        select: {
          displayEmpty: true,
          multiple: false
        }
      }}
    >
      {[defaultValue, ...items].map(
        (item: Selectable): ReactNode => (
          <MenuItem key={item.value} disabled={item.disabled} value={item.value}>
            <em>{item.label}</em>
          </MenuItem>
        )
      )}
    </CustomTextField>
  )
}

export default SimpleSelect
