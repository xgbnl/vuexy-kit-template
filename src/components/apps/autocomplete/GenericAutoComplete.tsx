'use client'

// React Imports
import { useState, useMemo, type ElementType } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import type { AutocompleteProps, BaseTextFieldProps } from '@mui/material'

// Components Imports
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomTextField from '@core/components/mui/TextField'

type Props<T> = {
  fixed?: T
  options: Option<T>[]
  onChange: (newValue: Option<T>[]) => void
} & Pick<BaseTextFieldProps, 'label' | 'placeholder'> &
  Pick<AutocompleteProps<any, boolean | undefined, boolean | undefined, boolean | undefined, ElementType>, 'limitTags'>

export default function GenericAutoComplete<T>({ fixed, options, label, placeholder, limitTags, onChange }: Props<T>) {
  // States
  const fixedOption = useMemo(() => options.find(option => option.value === fixed), [fixed, options])

  const [value, setValue] = useState<Option<T>[]>(fixedOption ? [fixedOption] : [])

  // Hooks
  const handleChange = (newValue: Option<T>[]): void => {
    const merge = fixedOption ? [fixedOption, ...newValue.filter(option => option.value !== fixed)] : newValue

    setValue(merge)

    onChange(newValue)
  }

  return (
    <CustomAutocomplete
      multiple
      limitTags={limitTags}
      value={value}
      options={options}
      id='autocomplete-fixed-option'
      getOptionLabel={option => option.label || ''}
      renderInput={params => <CustomTextField {...params} label={label} placeholder={placeholder} />}
      onChange={(_, newValue) => handleChange(newValue)}
      renderValue={(tagValue, getItemProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.label}
            {...getItemProps({ index })}
            disabled={option.value === fixed}
            key={index}
            size='small'
          />
        ))
      }
    />
  )
}
