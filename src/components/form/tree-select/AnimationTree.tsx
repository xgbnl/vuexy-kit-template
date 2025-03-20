'use client'

// React Imports
import { forwardRef, useState, useMemo, useEffect } from 'react'
import type { Ref, ReactNode, MouseEvent } from 'react'

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

function buildTreeMap(nodes: Nodes, map: Map<number, Node> = new Map()): Map<number, Node> {
  for (const node of nodes) {
    map.set(node.id, node)

    if (node.children.length > 0) {
      buildTreeMap(node.children, map)
    }
  }

  return map
}

export default function AnimationTree({ nodes, labelBy, onItemClick }: MultiTreeProps) {
  // States
  const [selected, setSelected] = useState<Node[]>([])

  const cache = useMemo(() => buildTreeMap(nodes), [nodes])

  useEffect((): void => {
    onItemClick(selected)
  }, [selected])

  // Hooks
  const handelItemClick = (event: MouseEvent<unknown>, id: string): void => {
    const node = cache?.get(Number(id)) as Node

    if (!selected.some(n => n.id === node.id)) {
      setSelected([...selected, node])
    }
  }

  const presenter = (items: Nodes): ReactNode => {
    return items.map(
      (tree: Node): ReactNode => (
        <CustomTreeItem itemId={`${tree.id}`} key={`grid-community-${uuid()}`} label={tree[labelBy]}>
          {tree.children ? presenter(tree.children) : null}
        </CustomTreeItem>
      )
    )
  }

  return (
    <SimpleTreeView multiSelect checkboxSelection defaultExpandedItems={['grid']} onItemClick={handelItemClick}>
      {presenter(nodes)}
    </SimpleTreeView>
  )
}
