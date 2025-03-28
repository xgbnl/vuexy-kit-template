'use client'

// React Imports
import { useEffect, useState, type ReactNode } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'

// Components Imports
import EnhancedTableContainer from '@/views/apps/enhanced-table'
import type { Entity, HeadCell } from '@/views/apps/enhanced-table/types'
import Cascader from '@/views/apps/cascader'
import type { Option } from '@/views/apps/cascader/types'
import SimpleSelect, { type Selectable } from '@/views/apps/select/SimpleSelect'
import { Get, type JsonResponse } from '@/libs/fetch'

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

const treeData: readonly Option[] = [
  {
    value: 1,
    extName: 'Front',
    isLeaf: false,
    children: [
      {
        value: 3,
        isLeaf: true,
        extName: 'JavaScript',
        children: []
      },
      {
        value: 4,
        isLeaf: true,
        extName: 'TypeScript',
        children: []
      }
    ]
  },
  {
    value: 2,
    extName: 'Backed',
    isLeaf: false,
    children: [
      {
        value: 5,
        isLeaf: true,
        extName: 'PHP',
        children: []
      },
      {
        value: 6,
        isLeaf: true,
        extName: 'JAVA',
        children: []
      },
      {
        value: 7,
        isLeaf: true,
        extName: 'Golang',
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

  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    Get<JsonResponse<Option[]>>('regions', { params: { deep: 2 } }).then(res => {
      if (res && res.code === 200) {
        setOptions(res.data)
      }
    })
  }, [])

  return (
    <>
      {/** Table filter Card */}
      <Card sx={{ minWidth: 275 }} className='mb-6'>
        <CardActions>
          <Grid container spacing={6} sx={{ width: '100%' }}>
            <Grid size={{ xs: 4, sm: 2 }}>
              {/* Enable multiple selection, enable checkbox effect, and allow root node selection */}
              <Cascader
                options={options}
                aliasble={{
                  label: 'name',
                  value: 'id'
                }}
                multiSelect
                checkboxSelection
                value={values}
                onSelectedItemsClick={items => setValues(items)}
                rootNodeSelectable
              />
            </Grid>
            <Grid size={{ xs: 4, sm: 2 }}>
              {/* Disable multi-select and checkbox, and prohibit root node selection */}
              <Cascader
                options={treeData}
                aliasble={{
                  label: 'extName'
                }}
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
      <EnhancedTableContainer<User>
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
      <EnhancedTableContainer<User>
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
