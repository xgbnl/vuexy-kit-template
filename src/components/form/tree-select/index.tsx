'use client'

// React Imports
import { ReactNode, useMemo, type SyntheticEvent } from 'react'

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

const cacheable = (nodes: Nodes, map: Map<number, Node> = new Map()): Map<number, Node> => {
  for (const node of nodes) {
    map.set(node.id, node)

    if (node.children.length > 0) {
      cacheable(node.children, map)
    }
  }

  return map
}

interface Props extends Omit<MultiTreeProps, 'onSelectedItemsChange' | 'selectedItems'>, Pick<InputBaseProps, 'size'> {
  inputLabel?: string
  onSelectedItemsClick: (items: string[]) => void
  value: string[]
  rootNodeSelectable?: boolean
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
  const cache = useMemo((): Map<number, Node> => cacheable(nodes), [nodes])

  // Hooks
  const handelSelectedItemsChange = (event: SyntheticEvent, items: string[] | string | null) => {
    const isStringble = items && typeof items === 'string'

    console.log(items)

    if (isStringble && value.includes(items)) {
      const filters = value.filter((id: string): boolean => id !== items)

      onSelectedItemsClick([...filters])
    } else if (isStringble && !value.includes(items)) {
      onSelectedItemsClick([...value, items])
    } else if (Array.isArray(items)) {
      onSelectedItemsClick([...items])
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
