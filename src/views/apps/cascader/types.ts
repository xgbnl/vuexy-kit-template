// MUI Imports
import type { UseTreeViewSelectionParameters } from '@mui/x-tree-view/internals'

export type Options = Option[] | readonly Option[]

export type Option = {
  value: number | string
  children?: Options
  label?: string
  isLeaf?: boolean
  disabled?: boolean
}

export type FieldName = {
  label?: string
  value?: string
  children?: string
}

export type FieldNames = {
  fieldNames?: FieldName
}

export type TreeViewProps = {
  options: Options
} & Required<Pick<UseTreeViewSelectionParameters<any>, 'onSelectedItemsChange' | 'selectedItems'>> &
  Pick<UseTreeViewSelectionParameters<any>, 'multiSelect' | 'checkboxSelection'> &
  FieldNames
