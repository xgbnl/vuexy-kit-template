// React Imports
import type { MouseEvent, ReactNode } from 'react'

// MUI Imports
import { TableRow, TableCell } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'

// Components Imports
import SimpleTableCell from './SimpleTableCell'

// Type Imports
import type { HeadCell } from './types'

interface Props<T> {
  row: T
  selected: T[]
  columns: HeadCell<T>[]
  onClick: (envent: MouseEvent<unknown>, row: T) => void
}

export default function SortTableRow<T>({ row, selected, columns, onClick }: Props<T>): ReactNode {
  const isItemSelected = selected.includes(row)

  return (
    <TableRow
      hover
      onClick={event => onClick(event, row)}
      role='checkbox'
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell padding='checkbox'>
        <Checkbox color='primary' checked={isItemSelected} />
      </TableCell>
      <SimpleTableCell<T> row={row} columns={columns} />
    </TableRow>
  )
}
