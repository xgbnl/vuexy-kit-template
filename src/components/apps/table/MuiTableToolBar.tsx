'use client'

// React Imports
import type { ReactElement } from 'react'

// MUI Imports
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import FilterListIcon from '@mui/icons-material/FilterList'
import DeleteIcon from '@mui/icons-material/Delete'
import { alpha } from '@mui/material/styles'

// Type Imports
import type { TableSlotProp } from '@/components/apps/table/types'

type EnhancedTableToolbarProps<T> = {
  numSelected: number
  onDelete?: () => void
  onFilter?: () => void
  selected: T[]
} & TableSlotProp<T>

export default function MuiTableToolbar<T>(props: EnhancedTableToolbarProps<T>) {
  const { numSelected, onDelete, slotProps, selected, onFilter } = props

  const render = (): ReactElement => {
    if (numSelected > 0) {
      return typeof slotProps?.effectActions === 'function' ? (
        slotProps.effectActions(selected)
      ) : (
        <Tooltip title='Delete'>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )
    }

    return (
      <Tooltip title='Filter list'>
        <IconButton onClick={onFilter}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 }
        },
        numSelected > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        }
      ]}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 50%' }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 50%' }} variant='h6' id='tableTitle' component='div'>
          {slotProps?.slot ? slotProps.slot() : 'Nutrition'}
        </Typography>
      )}
      {render()}
    </Toolbar>
  )
}
