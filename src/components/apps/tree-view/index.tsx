'use client'

// React Imports
import type { ReactElement, MouseEvent, SyntheticEvent } from 'react'
import { useState } from 'react'

// MUI Imports
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'

// Components Imports
import CustomTextField from '@/@core/components/mui/TextField'
import EmptyState from '../empty-state'

// Hooks Imports
import useFieldName from './useFieldName'
import useTransform from './useTransform'

// Types Imports
import type { Option, MuiTreeViewParameters, FieldNames } from './types'

const treeItem = (options: Option[]): ReactElement[] => {
  return options.map<ReactElement>(option => (
    <TreeItem key={option.value} itemId={option.value as string} label={option.label}>
      {option.children && option.children?.length > 0 ? treeItem(option.children) : null}
    </TreeItem>
  ))
}

const MuiTreeView = (props: MuiTreeViewParameters): ReactElement => {
  // States
  const { options, onChange, error, helperText, label, id, value, fieldNames } = props

  const [selected, setSelected] = useState<string[]>((): string[] => {
    return value?.map<string>(v => (typeof v === 'number' ? String(v) : v)) ?? []
  })

  const [visible, setVisible] = useState<boolean>(false)
  const [toggle, setToggle] = useState<string>()

  const { values, cache } = useTransform(options, useFieldName(fieldNames as FieldNames))

  // Hooks
  const handleRootExpansionToggle = (value: string): void => {
    if (value !== toggle) {
      if (!selected.includes(value)) {
        setSelected([value])
      }

      setToggle(value)
    }
  }

  const handleTreeItemClick = (event: MouseEvent, id: string): void => {
    event.stopPropagation() // Prevent click events from triggering the drop-down menu to close.

    const option = cache.get(id) as Option

    if (option.isLeaf) {
      const exists = selected.includes(option.value as string)
      const newSelected = [...selected, id]

      if (!exists) {
        setSelected(newSelected)
      }

      setVisible(false)

      const reduces = exists ? selected : newSelected

      onChange(reduces.map<Option>(value => cache.get(value) as Option))
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
        value={selected}
        {...{ error, helperText, label }}
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
            renderValue: (selected: unknown): string =>
              (selected as string[]).map(value => cache.get(value)?.label).join('/')
          }
        }}
      >
        {values.length > 0 ? (
          <SimpleTreeView
            multiSelect
            selectedItems={selected.map<string>(value => String(value))}
            sx={{
              '& .MuiTreeItem-content': {
                flexDirection: 'row-reverse'
              }
            }}
            id={id}
            onItemClick={handleTreeItemClick}
            onItemExpansionToggle={(_, id): void => handleRootExpansionToggle(id)}
          >
            {treeItem(values)}
          </SimpleTreeView>
        ) : (
          <EmptyState />
        )}
      </CustomTextField>
    </>
  )
}

export default MuiTreeView
