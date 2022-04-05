import { dialogsAPI } from './../../api/firebase_api/dialogs'
import { userInfo } from 'api/firebase_api/userInfo'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userAuth } from 'api/firebase_api/auth'

const initialState = {
    userData: null as UserData | null,
    dialogs: [] as Dialog[],
    dataStatus: 'success' as LoadingType,
    error: null as string | null,
    messages: [] as MessageType[],
    searchedUsers: [] as UserData[],
    openChat: null as OpenChat | null,
}
type ForUserAuth = {
    email: string
    password: string
    name: string
}
export type UserData = {
    uid: string
    displayName: string | null
    email: string | null
    photoURL?: string | null
    status: {
        state: 'online' | 'offline'
        last_changed: number
    }
}
export type LoadingType = 'success' | 'loading' | 'error'
export type Dialog = {
    lastMessageId: string
    usersIdInDialog: [string, string]
    usersInDialog: [UserData, UserData]
    id: string
    newMessagesCount: {
        [key: string]: number
    }
}
export type OpenChat = {
    withUser: UserData
    dialogId: string
}
export type MessageType = {
    id: string
    fromId: string
    text: string
    time: number
    edited: boolean
    viewed: boolean
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setStatus(state, action: PayloadAction<LoadingType>) {
            state.dataStatus = action.payload
        },
        setUserData(state, action: PayloadAction<UserData>) {
            state.userData = action.payload
        },
        removeUser(state) {
            state.userData = null
            state.dialogs = []
        },
        setMessages(state, action) {
            state.messages = action.payload
        },
        setDialogs(state, action: PayloadAction<Dialog[]>) {
            state.dialogs = action.payload
        },
        setSearchedUsers(state, action: PayloadAction<UserData[]>) {
            state.searchedUsers = [...action.payload]
        },
        setOpenChat(state, action: PayloadAction<OpenChat | null>) {
            state.openChat = action.payload
        },
    },
})

export const {
    setStatus,
    setUserData,
    removeUser,
    setMessages,
    setSearchedUsers,
    setDialogs,
    setOpenChat,
} = userSlice.actions

// let _newMessageHandler: ((data: any) => void) | null = null
// const newMessageHandlerCreator = (dispatch: any) => {
//     if (_newMessageHandler === null) {
//         _newMessageHandler = data => {
//             dispatch(setMessages(data))
//         }
//     }
//     return _newMessageHandler
// }
//
// export const startMessagesListening = (dialodId: string) => async (dispatch: any) => {
//     chatAPI.subscribe(newMessageHandlerCreator(dispatch), dialodId)
// }
// export const stopMessagesListening = (dialodId: string) => (dispatch: any) => {
//     const unsb = chatAPI.subscribe(newMessageHandlerCreator(dispatch), dialodId)
//     unsb()
// }
export const onAuthWithGoogle = () => async (dispatch: any) => {
    const newUser = await userAuth.authMeWithGoogle()
    const user: UserData = await userInfo.getUser(newUser.uid)
    dispatch(setUserData(user))
}
export const onSearchUsers = (name: string) => async (dispatch: any) => {
    dispatch(setStatus('loading'))
    const users = await userInfo.searchUser(name)
    dispatch(setSearchedUsers(users))
    dispatch(setStatus('success'))
}
export const onRegister = (forUserAuth: ForUserAuth) => async (dispatch: any) => {
    await userAuth.registerMe(forUserAuth.email, forUserAuth.password, forUserAuth.name)
}
export const getAuthUser = (uid: string) => async (dispatch: any) => {
    const user = await userInfo.getUser(uid)
    dispatch(setUserData(user))
}
export const sendMessage =
    (text: string, fromUser: UserData, toUser: UserData) => async (dispatch: any) => {
        await dialogsAPI.sendMessage(text, fromUser, toUser)
    }
export const removeMessage = (dialogId: string, messageId: string) => async (dispatch: any) => {
    await dialogsAPI.deleteMessage(dialogId, messageId)
}
export const removeDialog = (dialogId: string) => async (dispatch: any) => {
    // await dialogsAPI.deleteDialog(dialogId)
}
export const editMessage =
    (dialogId: string, messageId: string, newMessageText: string) => async (dispatch: any) => {
        await dialogsAPI.editMessage(dialogId, messageId, newMessageText)
    }
export const messageViewedToggle =
    (dialogId: string, messageId: string) => async (dispatch: any) => {
        await dialogsAPI.messageViewedToggle(dialogId, messageId)
    }
export const onlineStatusToggle = (uid: string) => async (dispatch: any) => {
    await userInfo.onlineStatusToggle(uid)
}
export const setOfflineStatus = (uid: string) => async (dispatch: any) => {
    await userInfo.setOfflineStatus(uid)
}

export default userSlice.reducer
