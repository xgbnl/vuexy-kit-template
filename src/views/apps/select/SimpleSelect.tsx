'use client'

// React Imports
import { type ReactNode } from 'react'
import { useMemo, memo } from 'react'

// MUI Imports
import MenuItem from '@mui/material/MenuItem'
import type { BaseSelectProps, BaseTextFieldProps } from '@mui/material'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

export type Selectable = {
  label: string
  value: Value
  disabled?: boolean
}

export type Value = number | string

type Props = {
  items: Selectable[]
  value: Value
  label: string
  defaultValue: Selectable
  onChange: (value: Value) => void
} & Pick<BaseSelectProps, 'multiple'> &
  Pick<BaseTextFieldProps, 'id'>

const SimpleSelect = memo(({ items, value, label, onChange, defaultValue, multiple, id }: Props) => {
  const options = useMemo((): Selectable[] => [defaultValue, ...items], [defaultValue, items])

  return (
    <CustomTextField
      select
      fullWidth
      label={label}
      id={id}
      defaultValue={defaultValue.value}
      value={value}
      onChange={(event): void => onChange(event.target.value as any)}
      slotProps={{
        select: {
          displayEmpty: true,
          multiple: multiple
        }
      }}
    >
      {options.map(
        (item: Selectable): ReactNode => (
          <MenuItem key={`mui-menu-item-${item.value}`} disabled={item.disabled} value={item.value}>
            <em>{item.label}</em>
          </MenuItem>
        )
      )}
    </CustomTextField>
  )
})

export default SimpleSelect
