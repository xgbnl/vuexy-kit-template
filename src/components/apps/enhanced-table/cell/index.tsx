// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import { TableCell } from '@mui/material'

// Type Imports
import type { HeadCell } from '@/types/apps/tableType'

type Props<T> = {
  columns: HeadCell<T>[]
  row: T
}

function render<T>(headCell: HeadCell<T>, row: T): ReactNode {
  if (typeof headCell.format === 'function') {
    return headCell.format(row)
  }

  if (typeof headCell.action === 'function') {
    return headCell.action(row)
  }

  return row[headCell.id] as any
}

export default function EnhancedTableSimpleCell<T>(props: Props<T>): ReactNode {
  const { columns, row } = props

  return columns.map((headCell: HeadCell<T>) => {
    const id = headCell.id as string

    return (
      <TableCell id={`enhanced-table-checkbox-${id}`} key={id} align={headCell.numeric ? 'right' : 'left'}>
        {render(headCell, row)}
      </TableCell>
    )
  })
}
