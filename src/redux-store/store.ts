// Redux Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import PassportSlice from '@/redux-store/features/passport'

export const store = configureStore({
  reducer: {
    passport: PassportSlice
  }
})

// Exports
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ReturnType<typeof store.dispatch>

export type Appstore = ReturnType<typeof store>
