import { userInfo } from 'api/firebase_api/userInfo'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userAuth } from 'api/firebase_api/auth'
import { filesAPI } from '../../api/firebase_api/files'

const initialState = {
    userData: null as UserData | null,
    dialogs: [] as Dialog[],
    error: null as string | null,
    searchedUsers: [] as UserData[],
    openChat: null as OpenChat | null,
    uploadFileStatus: 0,
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

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserData>) {
            state.userData = action.payload
        },
        removeUser(state) {
            state.userData = null
            state.dialogs = []
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
        setUploadFileStatus(state, action: PayloadAction<number>) {
            state.uploadFileStatus = action.payload
        },
    },
})

export const {
    setUserData,
    removeUser,
    setSearchedUsers,
    setDialogs,
    setOpenChat,
    setUploadFileStatus,
} = appSlice.actions

let _uploadFileStatusHandler: ((data: any) => void) | null = null
const uploadFileStatusHandler = (dispatch: any) => {
    if (_uploadFileStatusHandler === null) {
        _uploadFileStatusHandler = data => {
            dispatch(setUploadFileStatus(data))
        }
    }
    return _uploadFileStatusHandler
}

export const onAuthWithGoogle = () => async (dispatch: any) => {
    const newUser = await userAuth.authMeWithGoogle()
    const user: UserData = await userInfo.getUser(newUser.uid)
    dispatch(setUserData(user))
}
export const onSearchUsers = (name: string) => async (dispatch: any) => {
    const users = await userInfo.searchUser(name)
    dispatch(setSearchedUsers(users))
}
export const onRegister = (forUserAuth: ForUserAuth) => async (dispatch: any) => {
    await userAuth.registerMe(forUserAuth.email, forUserAuth.password, forUserAuth.name)
}
export const getAuthUser = (uid: string) => async (dispatch: any) => {
    const user = await userInfo.getUser(uid)
    dispatch(setUserData(user))
}
export const onlineStatusToggle = (uid: string) => async (dispatch: any) => {
    await userInfo.onlineStatusToggle(uid)
}
export const setOfflineStatus = (uid: string) => async (dispatch: any) => {
    await userInfo.setOfflineStatus(uid)
}
export const uploadFile = (file: File) => async (dispatch: any) => {
    await filesAPI.updateUserPhoto(uploadFileStatusHandler(dispatch), file)
}
export const updateUserInfo = (newFullName: string) => async (dispatch: any) => {
    await userInfo.updateUserData(newFullName)
}

export default appSlice.reducer
