'use client'

// React Imports
import { type ReactNode, useRef } from 'react'

// Redux Imports
import { Provider } from 'react-redux'

import { store, type AppStore } from '@/redux-store/store'

export default function ReduxStoreProvider({ children }: { children: ReactNode }): ReactNode {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = store
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
