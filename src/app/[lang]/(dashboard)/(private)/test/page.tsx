'use client'

// React Imports
import { useState, type ReactNode } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid2'

// Components Imports
import EnhancedTable from '@/views/apps/list'
import type { Entity, HeadCell } from '@/views/apps/list/types'
import MultipleAnimationSelect from '@/components/form/tree-select'
import type { Node } from '@/components/form/tree-select/types'
import SimpleSelect, { type Selectable } from '@/views/apps/select/SimpleSelect'

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

const treeData: readonly Node[] = [
  {
    id: 1,
    extName: 'Front',
    deep: 1,
    children: [
      {
        id: 3,
        deep: 2,
        extName: 'JavaScript',
        children: []
      },
      {
        id: 4,
        deep: 2,
        extName: 'TypeScript',
        children: []
      }
    ]
  },
  {
    id: 2,
    extName: 'Backd',
    deep: 1,
    children: [
      {
        id: 5,
        extName: 'Java',
        deep: 2,
        children: []
      },
      {
        id: 6,
        extName: 'PHP',
        deep: 2,
        children: []
      },
      {
        id: 7,
        extName: 'Node.js',
        deep: 2,
        children: []
      }
    ]
  }
]

const selectables: Selectable[] = [
  { label: 'Paid', value: 1 },
  { label: 'Unpaid', value: 2 }
]

export default function Page(): ReactNode {
  // States
  const [values, setValues] = useState<string[]>([])
  const [signValues, setSignValues] = useState<string[]>([])
  const [payStatus, setPayStatus] = useState<number>(0)

  return (
    <>
      {/** Table filter Card */}
      <Card sx={{ minWidth: 275 }} className='mb-6'>
        <CardActions>
          <Grid container spacing={6} sx={{ width: '100%' }}>
            <Grid size={{ xs: 4, sm: 2 }}>
              {/* Enable multiple selection, enable checkbox effect, and allow root node selection */}
              <MultipleAnimationSelect
                nodes={treeData}
                labelBy='extName'
                multiSelect
                checkboxSelection
                value={values}
                onSelectedItemsClick={items => setValues(items)}
                rootNodeSelectable
              />
            </Grid>
            <Grid size={{ xs: 4, sm: 2 }}>
              {/* Disable multi-select and checkbox, and prohibit root node selection */}
              <MultipleAnimationSelect
                nodes={treeData}
                labelBy='extName'
                value={signValues}
                onSelectedItemsClick={items => setSignValues(items)}
              />
            </Grid>
            <Grid size={{ xs: 4, sm: 2 }}>
              <SimpleSelect
                defaultValue={{ label: 'Please select payment status', value: 0, disabled: true }}
                items={selectables}
                label='paid status'
                value={payStatus}
                onChange={(v): void => setPayStatus(v as number)}
              />
            </Grid>
            <Grid container spacing={3} alignContent='flex-end'>
              <Button size='medium' variant='contained' startIcon={<i className='tabler-search' />}>
                Search
              </Button>
              <Button size='medium' variant='contained' startIcon={<i className='tabler-refresh' />}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      {/** Table List */}
      {/* Default table for multiple selections to delete */}
      <EnhancedTable<User>
        total={100}
        onPageChange={(page: number, perPage: number): void => {
          console.log(page, perPage)
        }}
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
        total={100}
        onPageChange={(page: number, perPage: number): void => {
          console.log(page, perPage)
        }}
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
