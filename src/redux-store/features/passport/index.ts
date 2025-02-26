// Redux Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Type Imports
import { RootState } from '@/redux-store/store'

export interface PassportState {
  token: string
}

const initialState: PassportState = {
  token:  ''
}

export const passportSlice = createSlice({
  name: 'passport',
  initialState,
  reducers: {
    revokeAccessToken: (state): void => {
      state.token = ''
      localStorage.removeItem('access-token')
    },
    setToken: (state, action: PayloadAction<string>): void => {
      state.token = action.payload
      localStorage.setItem('access-token', state.token)
    }
  }
})

// Exports
export const { revokeAccessToken, setToken } = passportSlice.actions

// Hooks
export const useAccessToken = (state: RootState & { passport: PassportState }): string => state.passport.token

export const hasAccessToken = (state: RootState & { passport: PassportState }): boolean => state.passport.token !== ''

export default passportSlice.reducer
