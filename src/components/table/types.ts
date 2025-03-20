// React Imports
import type { ReactNode } from 'react'

export type Order = 'asc' | 'desc'

export interface Entity {
  id?: number
  createdAt?: string
  updatedAt?: string
}

export interface HeadCell<T> {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
  format?: (row: T) => any
  action?: (row: T) => ReactNode
}

export type SlotProp<T> = {
  slotProps?: {
    components?: () => ReactNode
    effectComponents?: (rows: T[]) => ReactNode
  }
}
