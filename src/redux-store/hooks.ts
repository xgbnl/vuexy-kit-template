// Redux Imports
import { useDispatch, useSelector, useStore } from 'react-redux'

// Type Imports
import type { AppDispatch, RootState, AppStore } from '@/redux-store/store'

// Hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()

export const useAppStore = useStore.withTypes<AppStore>()
