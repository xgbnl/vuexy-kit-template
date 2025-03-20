// React Imports
import type { MouseEvent, ReactNode } from 'react'

// MUI Imports
import { TableRow, TableCell } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'

// Components Imports
import SimpleTableCell from './SimpleTableCell'

// Type Imports
import type { HeadCell } from './types'
import { uuid } from '@/utils/uuid'

interface Props<T> {
  row: T
  selected: number[]
  columns: HeadCell<T>[]
  onClick: (envent: MouseEvent<unknown>, id: number) => void
  sortBy: keyof T
}

export default function SortTableRow<T>({ row, selected, columns, onClick, sortBy }: Props<T>): ReactNode {
  const isItemSelected = selected.includes(row[sortBy] as number)

  return (
    <TableRow
      hover
      onClick={event => onClick(event, row[sortBy] as number)}
      role='checkbox'
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={uuid()}
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
