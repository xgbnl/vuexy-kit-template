'use client'

// React Imports
import { forwardRef, useMemo, useCallback } from 'react'
import type { Ref, ReactNode } from 'react'

// MUI Imports
import Collapse from '@mui/material/Collapse'
import type { TransitionProps } from '@mui/material/transitions'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem, type TreeItemProps } from '@mui/x-tree-view/TreeItem'

// ThirdParty Imports
import { useSpring, animated } from '@react-spring/web'

// Type Imports
import type { TreeViewProps, Option, Options } from './types'

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

export default function Tree(props: TreeViewProps) {
  const { options, onSelectedItemsChange, selectedItems, multiSelect, checkboxSelection, aliasble } = props

  const presenter = useCallback(
    (options: Options): ReactNode => {
      return options.map((option: Option): ReactNode => {
        const value = aliasble?.value ? option[aliasble.value as keyof Option] : option.value

        let element = null

        if (Array.isArray(option.children) && option.children.length > 0) {
          element = presenter(option.children)
        }

        if (aliasble?.children) {
          const alias = aliasble.children as keyof Option

          const childrens = option[alias]

          if (Array.isArray(childrens) && childrens.length > 0) {
            element = presenter(childrens)
          }
        }

        return (
          <CustomTreeItem
            itemId={`${value}`}
            key={`community-tree-item-${value}`}
            label={(aliasble?.label ? option[aliasble.label as keyof Option] : option.label) as string}
          >
            {element}
          </CustomTreeItem>
        )
      })
    },
    [aliasble]
  )

  // States
  const nodeView = useMemo(() => presenter(options), [presenter, options])

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
