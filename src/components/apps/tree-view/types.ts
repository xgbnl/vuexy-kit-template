// Types Imports
import type { TextFieldProps } from '@mui/material'
import type { UseTreeViewIdParameters } from '@mui/x-tree-view/internals/corePlugins/useTreeViewId'

export type Cacheable = Map<string, Option>

export type UseTransformReturn = {
  values: Option[]
  cache: Cacheable
}

export type FieldNames = {
  label?: string
  value?: string
  children?: string
}

export type InternalFieldNames = { key: string } & Required<FieldNames>

export type Option = {
  [key: string]: any
  label?: string
  value?: string | number
  children?: Option[]
  isLeaf?: boolean
}

export type MuiTreeViewParameters = {
  options: Option[]
  value?: number[] | string[]
  fieldNames?: FieldNames
  onChange: (selected: Option[]) => void
} & Pick<TextFieldProps, 'error' | 'helperText' | 'label'> &
  UseTreeViewIdParameters
