'use client'

// React Imports
import { ReactNode, useRef } from 'react'

// Redux Imports
import { Provider } from 'react-redux'

import { store, Appstore } from '@/redux-store/store'

export default function ReduxStoreProvider({ children }: { children: ReactNode }): ReactNode {

  const storeRef = useRef<Appstore | null>(null)

  if (!storeRef.current) {
    storeRef.current = store
  }

  return <Provider storeRef={storeRef} store={storeRef.current}>{children}</Provider>
}
