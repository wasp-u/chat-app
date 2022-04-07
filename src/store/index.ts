import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import chatReducer from './slices/chatSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        chat: chatReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

type RootReducerType = typeof store.getState
export type RootStateType = ReturnType<RootReducerType>
