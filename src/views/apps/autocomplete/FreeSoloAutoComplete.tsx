'use client'

// MUI Imports
import type { BaseTextFieldProps, UseAutocompleteProps } from '@mui/material'

// Components Imports
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  onChange: (newValue: string[]) => void
} & Pick<BaseTextFieldProps, 'label' | 'id' | 'placeholder'> &
  Partial<Pick<UseAutocompleteProps<any, boolean, boolean, boolean>, 'options'>>

const FreeSoloAutoComplete = ({ onChange, label, id, placeholder, options }: Props) => {
  return (
    <CustomAutocomplete
      id={id}
      multiple
      freeSolo
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={option => option}
      renderInput={params => <CustomTextField {...params} label={label} placeholder={placeholder} />}
      options={options ?? []}
    />
  )
}

export default FreeSoloAutoComplete
