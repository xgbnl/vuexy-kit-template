'use client'

// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import { TableCell } from '@mui/material'

// Type Imports
import type { HeadCell } from '../types'

interface Props<T> {
  columns: HeadCell<T>[]
  row: T
}

export default function EnhancedTableSimpleCell<T>(props: Props<T>): ReactNode {
  const { columns, row } = props

  return columns.map((column: HeadCell<T>) => {
    const cell = column.id as string

    return (
      <TableCell id={`enhanced-table-checkbox-${cell}`} key={cell} align={column.numeric ? 'right' : 'left'}>
        {column.format ? column.format(row) : column.action ? column.action(row) : row[column.id]}
      </TableCell>
    )
  })
}
