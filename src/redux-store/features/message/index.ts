// Redux Imports
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { WritableDraft } from 'immer'

import type { RootState } from '@/redux-store/store'

export interface MessageState {
  content: string | null
}

const initialState: MessageState = {
  content: null
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    cleanMessage: (state: WritableDraft<MessageState>): void => {
      state.content = null
    },
    setMessage: (state, action: PayloadAction<MessageState>): void => {
      state.content = action.payload.content
    }
  }
})

// Exports
export const { cleanMessage, setMessage } = messageSlice.actions

// Hooks
export const hasMessage = (state: RootState): boolean => state.message.content !== null
export const useMessage = (state: RootState): string => state.message.content as string

export default messageSlice.reducer
