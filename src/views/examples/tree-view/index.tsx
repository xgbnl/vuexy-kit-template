'use client'

// React Imports
import type { ReactElement } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Components Imports
import MuiTreeView from '@/components/apps/tree-view'

// Types Imports
import type { Option } from '@/components/apps/tree-view/types'

const options: Option[] = [
  {
    name: '北京',
    id: 10,
    children: [{ name: '北京市', id: 1011 }]
  },
  {
    name: '重庆',
    id: 23,
    children: [{ name: '重庆市', id: 2310 }]
  }
]

const TreeViewExample = (): ReactElement => {
  return (
    <Grid container rowSpacing={4}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h2'>TreeView(Cascader)</Typography>
        <Typography variant='subtitle2'>Normal tree</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <MuiTreeView options={options} label='cities' onChange={(id): void => console.log(id)} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle2'>Replacer field name</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <MuiTreeView
          value={[10, 1011]}
          fieldNames={{ label: 'name', value: 'id' }}
          options={options}
          label='cities'
          onChange={(id): void => console.log(id)}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle2'>Empty status</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <MuiTreeView options={[]} label='cities' onChange={(id): void => console.log(id)} />
      </Grid>
    </Grid>
  )
}

export default TreeViewExample
