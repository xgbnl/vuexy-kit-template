'use client'

// MUI Imports
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

// Types Imports
import type { Option, OptionValue } from '@/types/apps/optionType'

interface Props {
  options: Option[]
  defaultValue: OptionValue
  onChange(value: OptionValue): void
}

const CustomRadio = ({ options, defaultValue, onChange }: Props) => {
  return (
    <FormControl className='flex-wrap flex-row'>
      <RadioGroup
        row
        defaultValue={defaultValue}
        name='basic-radio'
        aria-label='basic-radio'
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
    </FormControl>
  )
}

export default CustomRadio
