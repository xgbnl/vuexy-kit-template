'use client'

// React Imports
import type { ReactElement, MouseEvent, SyntheticEvent } from 'react'
import { useState, useMemo } from 'react'

// MUI Imports
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import type { TextFieldProps } from '@mui/material'

// Components Imports
import CustomTextField from '@/@core/components/mui/TextField'

export type Option = {
  label: string
  value: number
  children?: Option[]
  isLeaf?: boolean
}

const buildNodeMap = (options: Option[], map: Map<number, Option>): Map<number, Option> => {
  for (const option of options) {
    map.set(option.value, option)

    if (option.children && option.children.length > 0) {
      option.isLeaf = false
      buildNodeMap(option.children, map)
    } else {
      option.isLeaf = true
    }
  }

  return map
}

const treeItem = (options: Option[]): ReactElement[] => {
  return options.map<ReactElement>(option => (
    <TreeItem key={option.value} itemId={String(option.value)} label={option.label}>
      {option.children && option.children?.length > 0 ? treeItem(option.children) : null}
    </TreeItem>
  ))
}

type Props = {
  options: Option[]
  onChange: (id: number[]) => void
} & Pick<TextFieldProps, 'error' | 'helperText'>

const Cascader = ({ options, onChange, error, helperText }: Props): ReactElement => {
  // States
  const [selected, setSelected] = useState<Option[]>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [toggle, setToggle] = useState<number>(0)

  const repositories = useMemo<Map<number, Option>>(() => buildNodeMap(options, new Map<number, Option>()), [options])

  // Hooks
  const handleRootExpansionToggle = (id: string): void => {
    const key = parseInt(id)

    if (key !== toggle) {
      const option = repositories.get(key) as Option

      if (!selected.includes(option)) {
        setSelected([option])
      }

      setToggle(key)
    }
  }

  const handleTreeItemClick = (event: MouseEvent, id: string): void => {
    event.stopPropagation() // Prevent click events from triggering the drop-down menu to close.

    const option = repositories.get(parseInt(id as string)) as Option

    if (option.isLeaf) {
      const newSelected = [...selected, option]

      setSelected(newSelected)

      setVisible(false)

      onChange(newSelected.map(option => option.value))
    }
  }

  const handleClose = (event: SyntheticEvent): void => {
    event.stopPropagation()

    if (selected.length === 1) {
      setSelected([])
    }

    setVisible(false)
  }

  return (
    <>
      <CustomTextField
        onClick={(): void => setVisible(true)}
        select
        fullWidth
        label='城市'
        value={selected}
        error={error}
        helperText={helperText}
        slotProps={{
          select: {
            MenuProps: {
              PaperProps: {
                style: {
                  top: '150px',
                  maxHeight: 'calc(50% - 96px)'
                }
              }
            },
            open: visible,
            onClose: handleClose,
            renderValue: (selected: unknown): string => (selected as Option[]).map(option => option.label).join('/')
          }
        }}
      >
        <SimpleTreeView
          sx={{
            '& .MuiTreeItem-content': {
              flexDirection: 'row-reverse'
            }
          }}
          id='region-tree'
          onItemClick={handleTreeItemClick}
          onItemExpansionToggle={(_, id): void => handleRootExpansionToggle(id)}
        >
          {treeItem(options)}
        </SimpleTreeView>
      </CustomTextField>
    </>
  )
}

export default Cascader
