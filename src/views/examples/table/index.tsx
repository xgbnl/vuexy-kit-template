'use client'

// React Imports
import type { ReactElement } from 'react'

// MUI Imports
import Avatar from '@mui/material/Avatar'

// Components Imports
import MuiTable from '@/components/apps/table'

// Types Imports
import type { TableHeadCell } from '@/components/apps/table/types'

type User = {
  id: number
  name: string
  avatar: string
  createdAt: string
  updatedAt: string
}

const users: User[] = [
  {
    id: 1,
    name: 'Tom',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    createdAt: '2025-03-19 14:11:00',
    updatedAt: '2025-03-19 14:12:00'
  },
  {
    id: 2,
    name: 'Jack',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    createdAt: '2025-03-22 20:11:00',
    updatedAt: '2025-03-22 20:11:00'
  }
]

const headCells: TableHeadCell<User>[] = [
  { disablePadding: false, id: 'id', label: 'ID', numeric: false },
  { disablePadding: false, id: 'name', label: 'Name', numeric: false },
  {
    disablePadding: false,
    id: 'avatar',
    label: 'Avatar',
    numeric: false,
    format: (row): ReactElement => <Avatar alt={row.name} src={row.avatar} />
  },
  { disablePadding: false, id: 'createdAt', label: 'CreatedAt', numeric: false },
  { disablePadding: false, id: 'updatedAt', label: 'UpdatedAt', numeric: false }
]

const TableExample = (): ReactElement => {
  // Hooks
  const handlePageChange = (page: number, pageSize: number): void => {
    console.log(page, pageSize)
  }

  return <MuiTable<User> sortBy='id' total={2} headCells={headCells} rows={users} onPageChange={handlePageChange} />
}

export default TableExample
