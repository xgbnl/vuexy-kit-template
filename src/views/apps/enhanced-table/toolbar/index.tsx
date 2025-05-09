// MUI Imports
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import FilterListIcon from '@mui/icons-material/FilterList'
import DeleteIcon from '@mui/icons-material/Delete'
import { alpha } from '@mui/material/styles'

// Type Imports
import type { EnhancedTableSlotProp } from '@/types/apps/tableType'

type EnhancedTableToolbarProps<T> = {
  numSelected: number
  onDelete?: () => void
  selected: T[]
} & EnhancedTableSlotProp<T>

export default function EnhancedTableToolbar<T>(props: EnhancedTableToolbarProps<T>) {
  const { numSelected, onDelete, slotProps, selected } = props

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
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
          {slotProps?.slot ? slotProps.slot() : 'Nutrition'}
        </Typography>
      )}
      {numSelected > 0 ? (
        slotProps?.effectActions ? (
          slotProps.effectActions(selected)
        ) : (
          <Tooltip title='Delete'>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}
