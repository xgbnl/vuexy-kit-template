'use client'

// React Imports
import { forwardRef } from 'react'
import type { ForwardedRef } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import type { BaseNonStaticPickerProps } from '@mui/x-date-pickers/internals'
import type { BaseTextFieldProps } from '@mui/material'

const DatePickerStyled = styled(DatePicker)<BaseNonStaticPickerProps>(({ theme }) => ({
  '& .MuiInputLabel-root': {
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
  },
  '& .MuiOutlinedInput-root.Mui-focused::before': {
    display: 'none'
  },
  '& legend': { display: 'none' },
  '& fieldset': { top: 0 },
  '::placeholder': {
    opacity: 1
  }
}))

type Props = Pick<BaseTextFieldProps, 'label' | 'placeholder'> & {
  id?: string
}

const CustomDatePicker = forwardRef(({ label, placeholder }: Props, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <DatePickerStyled
      inputRef={ref}
      format='yyyy-MM-dd'
      slotProps={{
        textField: { size: 'small', label, placeholder }
      }}
    />
  )
})

export default CustomDatePicker
