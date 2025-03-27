'use client'

// React Imports
import type { ReactNode, SyntheticEvent } from 'react'
import { useMemo, useCallback } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'
import type { InputBaseProps } from '@mui/material'

// Components
import Tree from './Tree'

// Type Imports
import type { TreeViewProps, Options, Option } from './types'

type Cacheable = Map<number, Option>

type Selectable = undefined | boolean

type Props = {
  inputLabel?: string
  onSelectedItemsClick: (options: string[]) => void
  value: string[]
  rootNodeSelectable?: Selectable
} & Omit<TreeViewProps, 'onSelectedItemsChange' | 'selectedItems'> &
  Pick<InputBaseProps, 'size'> &
  Pick<TreeViewProps, 'aliasble'>

export default function Cascader(props: Props) {
  const {
    options: nodes,
    aliasble,
    inputLabel,
    multiSelect,
    checkboxSelection,
    value,
    size,
    onSelectedItemsClick,
    rootNodeSelectable
  } = props

  // Store node information to map and cache it using useMemo.
  const store = useCallback(
    (options: Options, map: Cacheable = new Map()): Cacheable => {
      for (const option of options) {
        const value = aliasble?.value ? option[aliasble.value as keyof Option] : option.value

        map.set(value as number, option)

        if (Array.isArray(option.children) && option.children.length > 0) {
          store(option.children, map)
        }

        if (aliasble?.children) {
          const alias = aliasble.children as keyof Option

          const childrens = option[alias]

          if (Array.isArray(childrens) && childrens.length > 0) {
            store(childrens, map)
          }
        }
      }

      return map
    },
    [aliasble]
  )

  // States
  const cache = useMemo((): Map<number, Option> => store(nodes), [nodes, store])

  // Confirm whether the node is selectable.
  const shouldAddItem = useCallback(
    (selectable: Selectable, id: string): boolean => {
      if (selectable) {
        return true
      }

      if (selectable === undefined || !selectable) {
        const node = cache.get(Number(id))

        return !node?.isLeaf
      }

      return true
    },
    [cache]
  )

  // Hooks
  const handelSelectedItemsChange = (event: SyntheticEvent, items: string[] | string | null) => {
    if (Array.isArray(items)) {
      const filterble = items.filter((id: string): boolean => shouldAddItem(rootNodeSelectable, id))

      onSelectedItemsClick([...filterble])
    }

    if (typeof items === 'string') {
      if (!value.includes(items) && shouldAddItem(rootNodeSelectable, items)) {
        onSelectedItemsClick([items])
      }
    }
  }

  const label = useCallback(
    (key: number) => {
      const node = cache.get(Number(key)) as Option

      if (aliasble?.label) {
        return String(node[aliasble.label as keyof Option])
      }

      return node.label
    },
    [cache, aliasble]
  )

  const renderChip = useCallback(
    (selected: string[]): ReactNode => {
      if (multiSelect === undefined || !multiSelect) {
        return label(Number(selected.at(0)))
      }

      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map(value => (
            <Chip key={`mui-cascader-chip-${value}`} label={label(Number(value))} />
          ))}
        </Box>
      )
    },
    [label, multiSelect]
  )

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id='multiple-chip-label'>{inputLabel ?? 'multiple'}</InputLabel>
        <Select
          labelId='multiple-chip-label'
          id='multiple-chip'
          multiple
          size={size}
          value={value}
          input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
          renderValue={renderChip}
        >
          <Tree
            multiSelect={multiSelect}
            checkboxSelection={checkboxSelection}
            options={nodes}
            aliasble={aliasble}
            onSelectedItemsChange={handelSelectedItemsChange}
            selectedItems={value}
          />
        </Select>
      </FormControl>
    </Box>
  )
}
