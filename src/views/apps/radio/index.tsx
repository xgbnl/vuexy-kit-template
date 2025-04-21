'use client'

// React Imports
import type { HTMLAttributes } from 'react'

// MUI Imports
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles'

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  '& .MuiFormLabel-root': {
    transform: 'none',
    width: 'fit-content',
    maxWidth: '100%',
    lineHeight: 1.153,
    position: 'relative',
    fontSize: theme.typography.body2.fontSize,
    marginBottom: theme.spacing(1),
    color: 'var(--mui-palette-text-primary)',
    '&:not(.Mui-error).MuiFormLabel-colorPrimary.Mui-focused': {
      color: 'var(--mui-palette-primary-main) !important'
    },
    '&.Mui-disabled': {
      color: 'var(--mui-palette-text-disabled)'
    },
    '&.Mui-error': {
      color: 'var(--mui-palette-error-main)'
    }
  }
}))

type Props = {
  label: string
  options: Option[]
  value: OptionValue
  onChange(value: OptionValue): void
} & Pick<HTMLAttributes<any>, 'id'>

const CustomRadio = ({ id, label, options, value, onChange }: Props) => {
  return (
    <FormControlStyled>
      <FormLabel id={id}>{label}</FormLabel>
      <RadioGroup
        row
        value={value}
        name='row-radio-buttons-group'
        aria-labelledby={id}
        onChange={event => onChange(event.target.value)}
      >
        {options.map(option => (
          <FormControlLabel
            key={`mui-basic-radio-${option.value}`}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControlStyled>
  )
}

export default CustomRadio
