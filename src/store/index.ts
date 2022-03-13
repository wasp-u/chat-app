import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})

type RootReducerType = typeof store.getState
export type RootStateType = ReturnType<RootReducerType>
