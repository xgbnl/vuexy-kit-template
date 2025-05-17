// React Imports
import type { ReactElement } from 'react'

// MUI Imports
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

// Components Imports
import EmptyState from '../empty-state'

const MuiTableEmptyState = ({ col }: { col: number }): ReactElement => {
  return (
    <TableRow>
      <TableCell colSpan={col} align='center' style={{ verticalAlign: 'middle' }}>
        <EmptyState />
      </TableCell>
    </TableRow>
  )
}

export default MuiTableEmptyState
