'use client'

// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'

// Components Imports
import EnhancedTable from '@/components/table'
import type { Entity, HeadCell } from '@/components/table/types'
import TreeSelect, { Tree } from '@/components/form/tree-select'

interface User extends Entity {
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

const headCells: HeadCell<User>[] = [
  { disablePadding: false, id: 'id', label: 'ID', numeric: false },
  { disablePadding: false, id: 'name', label: 'Name', numeric: false },
  {
    disablePadding: false,
    id: 'avatar',
    label: 'Avatar',
    numeric: false,
    format: row => <Avatar alt={row.name} src={row.avatar} />
  },
  { disablePadding: false, id: 'createdAt', label: 'CreatedAt', numeric: false },
  { disablePadding: false, id: 'updatedAt', label: 'UpdatedAt', numeric: false }
]

const treeData: readonly Tree[] = [
  {
    id: 1,
    extName: 'Front',
    children: [
      {
        id: 3,
        extName: 'JavaScript',
        children: []
      },
      {
        id: 4,
        extName: 'TypeScript',
        children: []
      }
    ]
  },
  {
    id: 2,
    extName: 'Backd',
    children: [
      {
        id: 5,
        extName: 'Java',
        children: []
      },
      {
        id: 6,
        extName: 'PHP',
        children: []
      },
      {
        id: 7,
        extName: 'Node.js',
        children: []
      }
    ]
  }
]

export default function Page(): ReactNode {
  return (
    <>
      <Card sx={{ minWidth: 275 }} className='mb-6'>
        <CardActions>
          <Button size='medium' variant='contained'>
            Learn More
          </Button>
          <TreeSelect nodes={treeData} labelBy='extName' />
        </CardActions>
      </Card>
      {/* Default table for multiple selections to delete */}
      <EnhancedTable<User>
        rows={users}
        sortBy='id'
        headCells={headCells}
        multiple={true}
        onDelete={(rows: User[]) => {
          console.log(rows)
        }}
      />
      {/** Enable column multi-selection and override side-effect button group */}
      <EnhancedTable<User>
        rows={users}
        sortBy='id'
        headCells={headCells}
        multiple={true}
        slotProps={{
          root: () => <Button variant='contained'>Contained</Button>,
          actions: (rows: User[]) => (
            <Button
              variant='contained'
              onClick={() => {
                console.log(rows)
              }}
            >
              Contained
            </Button>
          )
        }}
      />
    </>
  )
}
