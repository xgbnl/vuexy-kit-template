'use client'

// React Imports
import { useState, type ReactElement } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'

// Components Imports
import EnumSelect from '@/components/apps/enum-select'
import EnumRadio from '@/components/apps/enum-radio'

function makeOption<E>(label: string, value: E, disabled: boolean = false): Option<E> {
  return { label, value, disabled } as Option<E>
}

type PayStatus = 'all' | 'paid' | 'unpaid'

type Toggle = 'enabled' | 'disabled'

export default function EnumOptionExample(): ReactElement {
  // States
  const [payStatus, setPayStatus] = useState<PayStatus>('all')
  const [toggle, setToggle] = useState<Toggle>('enabled')

  return (
    <>
      {/** Table filter Card */}
      <Card sx={{ minWidth: 275 }} className='mb-6'>
        <CardActions>
          <Grid size={{ xs: 4, sm: 2 }}>
            <EnumSelect
              items={[
                makeOption<PayStatus>('All pay status', 'all'),
                makeOption<PayStatus>('Paid', 'paid'),
                makeOption<PayStatus>('Unpaid', 'unpaid')
              ]}
              label='Union select'
              value={payStatus}
              onChange={(v): void => setPayStatus(v)}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 3 }}>
            <EnumRadio
              label='Union Radios'
              onChange={(value): void => setToggle(value)}
              value={toggle}
              options={[makeOption<Toggle>('Enabled', 'enabled'), makeOption<Toggle>('Disabled', 'disabled')]}
            />
          </Grid>
        </CardActions>
      </Card>
    </>
  )
}
