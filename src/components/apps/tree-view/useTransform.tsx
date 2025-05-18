'use client'

// React Imports
import { useMemo } from 'react'

// Types Imports
import type { Option, InternalFieldNames, Cacheable, UseTransformReturn } from './types'

function transform(options: Option[], fieldNames: InternalFieldNames, cacheable: Cacheable): UseTransformReturn {
  const result = options.map<Option>(option => {
    const { label, value, children } = fieldNames
    const childrenList = option[children as keyof Option] as Option[] | undefined
    const isNotEmpty = Array.isArray(childrenList) && childrenList.length > 0

    const newOption: Option = {
      label: option[label as keyof Option],
      value: String(option[value as keyof Option]),
      isLeaf: option.isLeaf !== undefined ? option.isLeaf : !isNotEmpty
    } as Option

    if (isNotEmpty) {
      newOption.children = transform(childrenList, fieldNames, cacheable).values
    }

    cacheable.set(newOption.value as string, newOption)

    return newOption
  })

  return {
    values: result,
    cache: cacheable
  }
}

const useTransform = (options: Option[], fieldNames: InternalFieldNames): UseTransformReturn => {
  return useMemo(() => transform(options, fieldNames, new Map<string, Option>()), [options, fieldNames])
}

export default useTransform
