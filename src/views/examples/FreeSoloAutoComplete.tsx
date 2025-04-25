// Components Imports
import FreeSoloAutoComplete from '../apps/autocomplete/FreeSoloAutoComplete'

const FreeSoloAutoCompleteExample = () => {
  return <FreeSoloAutoComplete onChange={(newValue: string[]): void => console.log(newValue)} label='Free solo' />
}

export default FreeSoloAutoCompleteExample
