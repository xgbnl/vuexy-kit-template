'use client'

// MUI Imports
import TableRow from '@mui/material/TableRow'

// Components Imports
import EnhancedTableSimpleCell from '../../cell'

// Types Imports
import type { EnhancedTableRowProps } from '../../types'

export default function EnhancedTableSimpleRow<T>({ row, columns }: EnhancedTableRowProps<T>) {
  return (
    <TableRow hover role='checkbox' tabIndex={-1} sx={{ cursor: 'pointer' }}>
      <EnhancedTableSimpleCell row={row} columns={columns} />
    </TableRow>
  )
}
