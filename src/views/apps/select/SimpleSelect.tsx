'use client'

// React Imports
import { type ReactNode } from 'react'
import { useMemo, memo } from 'react'

// MUI Imports
import MenuItem from '@mui/material/MenuItem'
import type { BaseSelectProps, BaseTextFieldProps } from '@mui/material'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// Types Imports
import type { OptionValue, Option } from '@/types/apps/optionType'

type Props = {
  items: Option[]
  value: OptionValue
  label: string
  defaultValue: Option
  onChange: (value: OptionValue) => void
} & Pick<BaseSelectProps, 'multiple'> &
  Pick<BaseTextFieldProps, 'id'>

const SimpleSelect = memo(({ items, value, label, onChange, defaultValue, multiple, id }: Props) => {
  const options = useMemo((): Option[] => [defaultValue, ...items], [defaultValue, items])

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
        (item: Option): ReactNode => (
          <MenuItem key={`mui-menu-item-${item.value}`} disabled={item.disabled} value={item.value}>
            <em>{item.label}</em>
          </MenuItem>
        )
      )}
    </CustomTextField>
  )
})

export default SimpleSelect
