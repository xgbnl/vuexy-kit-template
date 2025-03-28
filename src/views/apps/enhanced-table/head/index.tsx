'use client'

// React Imports
import type { MouseEvent, ChangeEvent, ReactNode } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

// Type Imports
import type { Order, Entity, HeadCell } from '../types'

interface EnhancedTableProps<T extends Entity> {
  numSelected: number
  chosen: boolean
  onRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: keyof T
  rowCount: number
  headCells: HeadCell<T>[]
}

export default function EnhancedTableHead<T extends Entity>(props: EnhancedTableProps<T>): ReactNode {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells, chosen } = props

  const createSortHandler = (property: keyof T) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {chosen && (
          <TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {headCells.map((headCell: HeadCell<T>) => (
          <TableCell
            key={`mui-tablecell-${headCell.id as string}`}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
