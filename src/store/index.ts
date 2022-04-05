import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

type RootReducerType = typeof store.getState
export type RootStateType = ReturnType<RootReducerType>
