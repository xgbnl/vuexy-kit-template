'use client'

// React Imports
import type { MouseEvent, ReactNode } from 'react'
import { useMemo } from 'react'

// MUI Imports
import { TableRow, TableCell } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'

// Components Imports
import EnhancedTableSimpleCell from '../../cell'

// Type Imports
import type { EnhancedTableRowProps } from '@/types/apps/tableType'

type Props<T> = {
  selected: T[]
  onClick: (row: T) => void
} & EnhancedTableRowProps<T>

export default function EnhancedTableSortRow<T>({ row, selected, columns, onClick }: Props<T>): ReactNode {
  const isItemSelected = useMemo((): boolean => selected.includes(row), [selected, row])

  const handelOnClick = (event: MouseEvent<unknown>): void => {
    event?.stopPropagation()
    onClick(row)
  }

  return (
    <TableRow
      hover
      onClick={handelOnClick}
      role='checkbox'
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell padding='checkbox'>
        <Checkbox color='primary' checked={isItemSelected} />
      </TableCell>
      <EnhancedTableSimpleCell<T> row={row} columns={columns} />
    </TableRow>
  )
}
