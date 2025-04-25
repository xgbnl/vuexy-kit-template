// Components Imports
import GenericAutoComplete from '../apps/autocomplete/GenericAutoComplete'

// Utils Imports
import { makeOption } from '@/utils/makeOption'

// Vars
const enum Example {
  Alert,
  AppBar,
  Button,
  Card
}

const options: Option<Example>[] = [
  makeOption<Example>('Alert', Example.Alert),
  makeOption<Example>('AppBar', Example.AppBar),
  makeOption<Example>('Button', Example.Button),
  makeOption<Example>('Card', Example.Card)
]

const AutoCompleteExample = () => {
  // Hooks
  const handleChange = (newValue: Option<Example>[]): void => {
    console.log(newValue)
  }

  return (
    <>
      <GenericAutoComplete
        onChange={handleChange}
        options={options}
        fixed={Example.AppBar}
        label='Fixed tag'
        placeholder='Favorites'
      />
      <GenericAutoComplete onChange={handleChange} options={options} label='Normal tag' placeholder='Favorites' />
      <GenericAutoComplete
        onChange={handleChange}
        options={options}
        label='Limit tag'
        limitTags={2}
        placeholder='Favorites'
      />
    </>
  )
}

export default AutoCompleteExample
