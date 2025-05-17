// React Imports
import type { ReactNode, ReactElement } from 'react'

export type Order = 'asc' | 'desc'

export type Row = {
  id: number
  action?: unknown
} & Record<string, any>

export type RowKey<T extends Row> = keyof T | ((row: T) => string | number)

export type TableSlotProp<T> = {
  slotProps?: {
    slot?: () => ReactNode
    effectActions?: (rows: T[]) => ReactElement
  }
}

export type TableHeadCell<T extends Row> = {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
  format?: (row: T) => ReactNode
  action?: (row: T) => ReactElement
}

export type TableRowProps<T extends Row> = {
  row: T
  columns: TableHeadCell<T>[]
}
