// Redux Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Store Imports
import { useAppSelector } from '@/redux-store/hooks'

export interface PassportState {
  token: string
}

const { localStorage } = window

const initialState: PassportState = {
  token: localStorage.getItem('access-token') || ''
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

export default passportSlice.reducer
