// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import { TableCell } from '@mui/material'

// Type Imports
import type { HeadCell } from './types'

interface Props<T> {
  columns: HeadCell<T>[]
  row: T
}

export default function SimpleTableCell<T>(props: Props<T>): ReactNode {
  const { columns, row } = props

  return columns.map((column: HeadCell<T>, index: number) => (
    <TableCell
      id={`enhanced-table-checkbox-${index}`}
      key={column.id as string}
      align={column.numeric ? 'right' : 'left'}
    >
      {column.format ? column.format(row) : column.action ? column.action(row) : row[column.id]}
    </TableCell>
  ))
}
