'use client'

// React Imports
import { useMemo } from 'react'

// Types Imports
import type { FieldNames, InternalFieldNames } from './types'

function fillFieldNames(fieldNames: FieldNames): InternalFieldNames {
  const { label, value, children } = fieldNames || {}

  const val = value || 'value'

  return {
    label: label || 'label',
    value: val,
    key: val,
    children: children || 'children'
  }
}

const useFieldName = (fieldNames: FieldNames): InternalFieldNames => {
  return useMemo(() => fillFieldNames(fieldNames), [fieldNames])
}

export default useFieldName
