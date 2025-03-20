// React Imports
import { type ReactNode, useState, type MouseEvent } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

// Components
import AnimationTree from './AnimationTree'

// Type Imports
import type { MultiTreeProps } from './types'

interface Props extends MultiTreeProps {
  size: 'small' | 'medium'
}

export default function TreeSelect({ nodes: items, labelBy }: Omit<MultiTreeProps, 'onItemClick'>) {
  // States
  const [label, setLable] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  // Hooks
  const handleClick = (nodes: Node[]) => {
    console.log(nodes)
  }

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id='simple-select-label'>Region</InputLabel>
        <TextField select size='small'>
          <AnimationTree nodes={items} labelBy={labelBy} onItemClick={handleClick} />
        </TextField>
      </FormControl>
    </Box>
  )
}
