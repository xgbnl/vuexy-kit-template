'use client'

// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import MenuItem from '@mui/material/MenuItem'
import type { BaseSelectProps, BaseTextFieldProps } from '@mui/material'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

type Props<E> = {
  items: Option<E>[]
  value: E
  label: string
  onChange: (value: E) => void
} & Pick<BaseSelectProps, 'multiple'> &
  Pick<BaseTextFieldProps, 'id'>

export default function EnumSelect<E>({ items, value, label, onChange, multiple, id }: Props<E>) {
  return (
    <CustomTextField
      select
      fullWidth
      label={label}
      id={id}
      value={value}
      onChange={(event): void => onChange(event.target.value as E)}
      slotProps={{
        select: {
          displayEmpty: true,
          multiple: multiple
        }
      }}
    >
      {items.map(
        (item: Option<E>): ReactNode => (
          <MenuItem key={`mui-menu-item-${item.value}`} disabled={item.disabled} value={item.value as string | number}>
            <em>{item.label}</em>
          </MenuItem>
        )
      )}
    </CustomTextField>
  )
}
