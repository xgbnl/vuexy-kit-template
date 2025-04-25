'use client'

// MUI Imports
import type { BaseTextFieldProps } from '@mui/material'

// Components Imports
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  onChange: (newValue: string[]) => void
} & Pick<BaseTextFieldProps, 'label' | 'id' | 'placeholder'>

const FreeSoloAutoComplete = ({ onChange, label, id, placeholder }: Props) => {
  return (
    <CustomAutocomplete
      id={id}
      multiple
      freeSolo
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={option => option}
      renderInput={params => <CustomTextField {...params} label={label} placeholder={placeholder} />}
      options={[]}
    />
  )
}

export default FreeSoloAutoComplete
