'use client'

// React Imports
import type { HTMLAttributes } from 'react'

// MUI Imports
import Radio from '@mui/material/Radio'
import RadioGroup, { type RadioGroupProps } from '@mui/material/RadioGroup'
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

type Props<T> = {
  label: string
  options: Option<T>[]
  value?: T
  disabled?: boolean
  onChange(value: T): void
} & Pick<HTMLAttributes<any>, 'id'> &
  Omit<RadioGroupProps, 'onChange' | 'value'>

export default function EnumRadio<T>(props: Props<T>) {
  const { id, label, options, onChange, disabled } = props

  return (
    <FormControlStyled>
      <FormLabel id={id}>{label}</FormLabel>
      <RadioGroup row {...props} aria-labelledby={id} onChange={event => onChange(event.target.value as T)}>
        {options.map(option => (
          <FormControlLabel
            disabled={disabled}
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
