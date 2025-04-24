'use client'

// React Imports
import { useState, type ReactNode } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'

// Components Imports
import EnhancedTableContainer from '@/views/apps/enhanced-table'
import type { Entity, HeadCell } from '@/types/apps/tableType'
import SimpleSelect from '@/views/apps/select'
import DateRange from '@/views/apps/date-range'
import TimePicker from '@/views/apps/time-picker'
import CustomRadio from '@/views/apps/radio'

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

function makeOption<E>(label: string, value: E, disabled: boolean = false): Option<E> {
  return { label, value, disabled } as Option<E>
}

const enum PayStatus {
  All = 'all',
  Paid = 'paid',
  Unpaid = 'unpaid'
}

const enum Toggle {
  Enabled = 'enabled',
  Disabled = 'disabled'
}

const payStatusOption: Option<PayStatus>[] = [
  makeOption<PayStatus>('All pay status', PayStatus.All),
  makeOption<PayStatus>('Paid', PayStatus.Paid),
  makeOption<PayStatus>('Unpaid', PayStatus.Unpaid)
]

const toggleOption: Option<Toggle>[] = [
  makeOption<Toggle>('enabled', Toggle.Enabled),
  makeOption<Toggle>('disabled', Toggle.Disabled)
]

export default function Page(): ReactNode {
  // States
  const [payStatus, setPayStatus] = useState<PayStatus>(PayStatus.All)
  const [toggle, setToggle] = useState<Toggle>(Toggle.Enabled)

  return (
    <>
      {/** Table filter Card */}
      <Card sx={{ minWidth: 275 }} className='mb-6'>
        <CardActions>
          <Grid container spacing={4} sx={{ width: '100%' }}>
            <Grid size={{ xs: 4, sm: 2 }}>
              <SimpleSelect
                items={payStatusOption}
                label='Paid Status'
                value={payStatus}
                onChange={(v): void => setPayStatus(v)}
              />
            </Grid>
            <Grid size={{ xs: 2, sm: 2.3 }}>
              <DateRange
                onChange={value => {
                  console.log(value)
                }}
              />
            </Grid>
            <Grid size={{ xs: 2, sm: 3 }}>
              <CustomRadio
                label='Radios'
                onChange={(value): void => setToggle(value)}
                value={toggle}
                options={toggleOption}
              />
            </Grid>
            <Grid size={{ xs: 1, sm: 1 }}>
              <TimePicker onChange={(date): void => console.log(date)} />
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
        total={2}
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
        total={2}
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
