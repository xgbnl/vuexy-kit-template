// MUI Imports
import type { UseTreeViewSelectionParameters } from '@mui/x-tree-view/internals'

export type Nodes = Node[] | readonly Node[]

export interface Node {
  id: number
  children: Nodes
  deep: number
  [key: string]: any
}

export type MultiTreeProps = {
  nodes: Nodes
  labelBy: string
} & Required<
  Pick<
    UseTreeViewSelectionParameters<any>,
    'onSelectedItemsChange' | 'selectedItems' | 'multiSelect' | 'checkboxSelection'
  >
>
