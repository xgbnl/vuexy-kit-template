// React Imports
import type { ReactNode } from 'react'

export type Order = 'asc' | 'desc'

export interface HeadCell<T> {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
  format?: (row: T) => any
  action?: (row: T) => ReactNode
}
