// React Imports
import type { ReactNode, ReactElement } from 'react'

export type Order = 'asc' | 'desc'

export type Attribute = {
  id: number
  createdAt?: string
  updatedAt?: string
  action?: unknown
}

export type EnhancedTableSlotProp<T> = {
  slotProps?: {
    slot?: () => ReactNode
    effectActions?: (rows: T[]) => ReactElement
  }
}

export type HeadCell<T> = {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
  format?: (row: T) => ReactNode
  action?: (row: T) => ReactElement
}

export type EnhancedTableRowProps<T> = {
  row: T
  columns: HeadCell<T>[]
}
