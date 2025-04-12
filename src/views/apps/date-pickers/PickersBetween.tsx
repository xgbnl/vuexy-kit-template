// MUI Imports
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

type Props = {
  inputProps?: {
    label: {
      start: string
      end: string
    }
  }
}

export default function BasicDateRangePicker(props: Props) {
  // States
  const { inputProps } = props

  return (
    <div className='flex justify-between'>
      <DatePicker
        format='yyyy-MM-dd'
        label={inputProps?.label.start ?? 'Start Date'}
        slotProps={{ textField: { size: 'small' } }}
      />
      <DatePicker
        slotProps={{ textField: { size: 'small' } }}
        format='yyyy-MM-dd'
        label={inputProps?.label.end ?? 'End Date'}
        onChange={newValue => {
          console.log(newValue)
        }}
      />
    </div>
  )
}
