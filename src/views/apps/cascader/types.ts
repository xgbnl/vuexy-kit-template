// MUI Imports
import type { UseTreeViewSelectionParameters } from '@mui/x-tree-view/internals'

export type Options = Option[] | readonly Option[]

export type Option = {
  value: number
  children?: Options
  label?: string
  isLeaf?: boolean
  disabled?: boolean
  readonly [key: string]: any
}

export type TreeViewProps = {
  options: Options
  aliasble?: Partial<{
    label: string
    value: string
    children: string
  }>
} & Pick<UseTreeViewSelectionParameters<any>, 'multiSelect' | 'checkboxSelection'> &
  Required<Pick<UseTreeViewSelectionParameters<any>, 'onSelectedItemsChange' | 'selectedItems'>>
