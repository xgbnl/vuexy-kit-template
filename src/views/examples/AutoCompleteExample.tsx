// Components Imports
import GenericAutoComplete from '@components/apps/autocomplete/GenericAutoComplete'

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

type Union = 'enabled' | 'disabled'

const AutoCompleteExample = () => {
  // Hooks
  const handleChange = (newValue: Option<Example>[]): void => {
    console.log(newValue)
  }

  return (
    <>
      <div className='mb-4'>
        <GenericAutoComplete
          onChange={handleChange}
          options={options}
          fixed={Example.AppBar}
          label='Fixed tag'
          placeholder='Favorites'
        />
      </div>
      <div className='mb-4'>
        <GenericAutoComplete onChange={handleChange} options={options} label='Normal tag' placeholder='Favorites' />
      </div>
      <div className='mb-4'>
        <GenericAutoComplete
          onChange={handleChange}
          options={options}
          label='Limit tag'
          limitTags={2}
          placeholder='Favorites'
        />
      </div>
      <GenericAutoComplete
        onChange={(newValue): void => console.log(newValue)}
        options={[makeOption<Union>('Enabled', 'enabled'), makeOption<Union>('Disabled', 'enabled')]}
        label='Union tag'
        placeholder='Favorites'
      />
    </>
  )
}

export default AutoCompleteExample
