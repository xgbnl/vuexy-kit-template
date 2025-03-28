// React Imports
import type { ReactNode } from 'react'

export type Order = 'asc' | 'desc'

export interface Entity {
  id: number | string
}

export type EnhancedTableSlotProp<T> = {
  slotProps?: {
    root?: () => ReactNode
    actions?: (rows: T[]) => ReactNode
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
