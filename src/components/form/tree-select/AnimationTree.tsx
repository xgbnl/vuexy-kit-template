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
import type { MultiTreeProps, Node, Nodes } from './types'

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

const presenter = (items: Nodes, labelBy: string): ReactNode => {
  return items.map(
    (tree: Node): ReactNode => (
      <CustomTreeItem itemId={`${tree.id}`} key={`grid-community-${uuid()}`} label={tree[labelBy]}>
        {tree.children ? presenter(tree.children, labelBy) : null}
      </CustomTreeItem>
    )
  )
}

export default function AnimationTree(props: MultiTreeProps) {
  const { nodes, labelBy, onSelectedItemsChange, selectedItems, multiSelect, checkboxSelection } = props

  // States
  const nodeView = useMemo(() => presenter(nodes, labelBy), [nodes, labelBy])

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
