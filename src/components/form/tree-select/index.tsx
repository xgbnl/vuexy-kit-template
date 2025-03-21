'use client'

// React Imports
import type { ReactNode, SyntheticEvent } from 'react'
import { useMemo } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'
import type { InputBaseProps } from '@mui/material'

// Components
import AnimationTree from './AnimationTree'

// Type Imports
import type { MultiTreeProps, Nodes, Node } from './types'

type Cacheable = Map<number, Node>

type Selectable = undefined | boolean

interface Props extends Omit<MultiTreeProps, 'onSelectedItemsChange' | 'selectedItems'>, Pick<InputBaseProps, 'size'> {
  inputLabel?: string
  onSelectedItemsClick: (items: string[]) => void
  value: string[]
  rootNodeSelectable?: Selectable
}

// Store node information to map and cache it using useMemo.
const storeCache = (nodes: Nodes, map: Cacheable = new Map()): Cacheable => {
  for (const node of nodes) {
    map.set(node.id, node)

    if (node.children.length > 0) {
      storeCache(node.children, map)
    }
  }

  return map
}

// Confirm whether the node is selectable.
const shouldAddItem = (selectable: Selectable, cacheable: Cacheable, id: string): boolean => {
  if (selectable) {
    return true
  }

  if (selectable === undefined || !selectable) {
    const node = cacheable.get(Number(id))

    return node?.deep !== 1
  }

  return true
}

export default function MultipleAnimationSelect(props: Props) {
  const {
    nodes,
    labelBy,
    inputLabel,
    multiSelect,
    checkboxSelection,
    value,
    size,
    onSelectedItemsClick,
    rootNodeSelectable
  } = props

  // States
  const cache = useMemo((): Map<number, Node> => storeCache(nodes), [nodes])

  // Hooks
  const handelSelectedItemsChange = (event: SyntheticEvent, items: string[] | string | null) => {
    if (Array.isArray(items)) {
      const filterble = items.filter((id: string): boolean => shouldAddItem(rootNodeSelectable, cache, id))

      onSelectedItemsClick([...filterble])
    }

    if (typeof items === 'string') {
      if (!value.includes(items) && shouldAddItem(rootNodeSelectable, cache, items)) {
        onSelectedItemsClick([items])
      }
    }
  }

  const renderValue = (selected: string[]): ReactNode => {
    if (multiSelect === undefined || !multiSelect) {
      const node = cache.get(Number(selected.at(0))) as Node

      return node[labelBy]
    }

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selected.map(value => {
          const node = cache.get(Number(value)) as Node

          return <Chip key={value} label={node[labelBy]} />
        })}
      </Box>
    )
  }

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
          renderValue={renderValue}
        >
          <AnimationTree
            multiSelect={multiSelect}
            checkboxSelection={checkboxSelection}
            nodes={nodes}
            labelBy={labelBy}
            onSelectedItemsChange={handelSelectedItemsChange}
            selectedItems={value}
          />
        </Select>
      </FormControl>
    </Box>
  )
}
