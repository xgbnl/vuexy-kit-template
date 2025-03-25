'use client'

// React Imports
import { forwardRef, useMemo } from 'react'
import type { Ref, ReactNode } from 'react'

// MUI Imports
import Collapse from '@mui/material/Collapse'
import type { TransitionProps } from '@mui/material/transitions'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem, type TreeItemProps } from '@mui/x-tree-view/TreeItem'

// ThirdParty Imports
import { useSpring, animated } from '@react-spring/web'

// Utils Imports
import { uuid } from '@/utils/uuid'

// Type Imports
import type { TreeViewProps, Option, Options, FieldName } from './types'

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
    }
  })

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  )
}

const CustomTreeItem = forwardRef((props: TreeItemProps, ref: Ref<HTMLLIElement>) => (
  <TreeItem {...props} slots={{ groupTransition: TransitionComponent, ...props.slots }} ref={ref} />
))

const presenter = (options: Options, fieldNames?: FieldName): ReactNode => {
  return options.map((option: Option): ReactNode => {
    // Var
    const value = fieldNames?.value ? option[fieldNames.value as keyof Option] : option.value
    const label = (fieldNames?.label ? option[fieldNames.label as keyof Option] : option.label) as string

    return (
      <CustomTreeItem itemId={`${value}`} key={`grid-community-${value}`} label={label}>
        {option.children ? presenter(option.children, fieldNames) : null}
      </CustomTreeItem>
    )
  })
}

export default function AnimationTree(props: TreeViewProps) {
  const { options, onSelectedItemsChange, selectedItems, multiSelect, checkboxSelection, fieldNames } = props

  // States
  const nodeView = useMemo(() => presenter(options, fieldNames), [options, fieldNames])

  return (
    <SimpleTreeView
      multiSelect={multiSelect}
      checkboxSelection={checkboxSelection}
      defaultExpandedItems={['grid']}
      selectedItems={selectedItems as string[]}
      onSelectedItemsChange={onSelectedItemsChange}
    >
      {nodeView}
    </SimpleTreeView>
  )
}
