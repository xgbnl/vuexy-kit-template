'use client'

// React Imports
import { useState, useMemo, useCallback } from 'react'
import type { MouseEvent, ChangeEvent, ReactNode } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Pagination from '@mui/material/Pagination'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// Components Imports
import EnhancedTableToolbar from './toolbar'
import EnhancedTableHead from './head'
import EnhancedTableSortRow from './row/sort'
import EnhancedTableSimpleRow from './row/simple'

// Type Imports
import type { Order, Entity, EnhancedTableSlotProp, HeadCell } from '@/types/apps/tableType'

function getComparator<T, Key extends keyof T>(order: Order, orderBy: Key): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }

  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

type Props<T> = {
  rows: T[]
  sortBy: keyof T // Sort field.
  headCells: HeadCell<T>[] // Column head.
  multiple?: boolean // Enable row multiple selection.
  onDelete?: (rows: T[]) => void // Enable default delete action.
  onPageChange: (page: number, pageSize: number) => void
  total: number
  rawKey?: keyof T | ((row: T) => string | number)
} & EnhancedTableSlotProp<T>

export default function EnhancedTableContainer<T extends Entity>(props: Props<T>) {
  const { rows, sortBy, headCells, multiple: chosen, onDelete, slotProps, total, onPageChange, rawKey } = props

  // States
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof T>(sortBy)
  const [selected, setSelected] = useState<T[]>([])
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  // Hooks
  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows

      setSelected(newSelected)

      return
    }

    setSelected([])
  }

  const handleClick = useCallback(
    (_event: MouseEvent<unknown>, row: T) => {
      const selectedIndex = selected.indexOf(row)
      let newSelected: T[] = []

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, row)
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1))
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1))
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
      }

      setSelected(newSelected)
    },
    [selected]
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1)

    onPageChange(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const perPage = parseInt(event.target.value, 10)

    setRowsPerPage(perPage)
    setPage(0)

    onPageChange(page, perPage)
  }

  const handleDelete = (): void => {
    if (onDelete) {
      onDelete(selected)
    }
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = useMemo(
    () => [...rows].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  )

  const getReactKey = useCallback(
    (row: T) => {
      if (rawKey !== undefined) {
        return typeof rawKey === 'function' ? rawKey(row) : row[rawKey]
      }

      return row.id
    },
    [rawKey]
  )

  const render = useCallback(
    (row: T) => {
      const reactKey = getReactKey(row)

      if (chosen) {
        return (
          <EnhancedTableSortRow<T>
            key={`mui-enhanced-table-sort-row-${reactKey}`}
            row={row}
            selected={selected}
            columns={headCells}
            onClick={handleClick}
          />
        )
      }

      return (
        <EnhancedTableSimpleRow<T> key={`mui-enhanced-table-simple-row-${reactKey}`} row={row} columns={headCells} />
      )
    },
    [chosen, getReactKey, handleClick, headCells, selected]
  )

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 1 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDelete={handleDelete}
          selected={selected}
          slotProps={slotProps}
        />
        <TableContainer>
          <Divider />
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
              chosen={chosen as boolean}
            />
            <TableBody>
              {visibleRows.map((row: T): ReactNode => render(row))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={() => (
            <Grid container justifyContent='center' width='100%'>
              <Pagination
                variant='tonal'
                shape='rounded'
                page={page + 1}
                onChange={handleChangePage}
                count={Math.ceil(total / rowsPerPage)}
                color='primary'
              />
            </Grid>
          )}
        />
      </Paper>
    </Box>
  )
}
