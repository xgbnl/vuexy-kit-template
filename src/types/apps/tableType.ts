// React Imports
import type { ReactNode, ReactElement } from 'react'

export type Order = 'asc' | 'desc'

export interface Attribute {
  id: number
  createdAt?: string
  updatedAt?: string
}

export type EnhancedTableSlotProp<T> = {
  slotProps?: {
    slot?: () => ReactNode
    effectActions?: (rows: T[]) => ReactElement
  }
}

export interface HeadCell<T> {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
  format?: (row: T) => any
  action?: (row: T) => ReactNode
}

export type EnhancedTableRowProps<T> = {
  row: T
  columns: HeadCell<T>[]
}
