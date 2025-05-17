'use client'

// React Imports
import type { ReactElement } from 'react'

// MUI Imports
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'

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

  return (
    <Grid container rowGap={4}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h2'>Tables</Typography>
        <Typography variant='subtitle1'>Normal list</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <MuiTable<User> sortBy='id' total={2} headCells={headCells} rows={users} onPageChange={handlePageChange} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1'>Enable multiple selection</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <MuiTable<User>
          total={2}
          onPageChange={handlePageChange}
          rows={users}
          sortBy='id'
          headCells={headCells}
          multiple={true}
          slotProps={{
            slot: () => <Button variant='contained'>Contained</Button>,
            effectActions: (rows: User[]) => (
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
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1'>Empty state</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <MuiTable<User> sortBy='id' total={0} headCells={headCells} rows={[]} onPageChange={handlePageChange} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1'>Table Filters</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Card sx={{ minWidth: 275 }} className='mb-6'>
          <CardActions>
            <Grid container spacing={4} sx={{ width: '100%' }}>
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
      </Grid>
    </Grid>
  )
}

export default TableExample
