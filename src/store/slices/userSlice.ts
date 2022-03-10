import { dialogsAPI } from './../../api/firebase_api/dialogs';
import { chatAPI } from './../../api/firebase_api/chat';
import { userInfo } from 'api/firebase_api/userInfo';
import { createSlice } from "@reduxjs/toolkit";
import { userAuth } from "api/firebase_api/auth";

const initialState = {
    userData: {} as UserData,
    dialogs: [] as Dialog[],
    status: 'success' as 'success' | 'pending' | 'error',
    error: null as string | null,
    messages: [] as MessageType[],
    searchedUSers: [] as UserData[],
    openChatWhit: {} as UserData
}
export type Dialog = UserData & {
    messages: { [index: string]: MessageType }
}
export type MessageType = {
    id: number
    fromId: string
    fromName: string
    text: string
    time: number
    edited?: boolean
    photoURL?: string
    viewed?: boolean
}
type ForUserAuth = {
    email: string
    password: string
    name: string,
}
export type UserData = {
    displayName: string | null,
    email: string | null,
    photoURL?: string | null,
    uid: string,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setStatus(state, action) {
            state.status = action.payload
        },
        setUserData(state, action) {
            state.userData = {
                displayName: action.payload.displayName,
                email: action.payload.email,
                photoURL: action.payload.photoURL,
                uid: action.payload.uid,
            }
        },
        removeUser(state) {
            state.userData = {
                displayName: null,
                email: null,
                photoURL: null,
                uid: ''
            }
        },
        setMessages(state, action) {
            let messagesArr = []
            for (let item in action.payload) {
                messagesArr.push(action.payload[item])
            }
            state.messages = messagesArr
        },
        setDialogs(state, action) {
            let dialogsArr = []
            for (let key in action.payload) {
                dialogsArr.push(action.payload[key])
            }
            state.dialogs = dialogsArr

        },
        setSearchedUsers(state, action) {
            state.searchedUSers = action.payload
        },
        setOpenChatWith(state, action) {
            state.openChatWhit = action.payload
        }
    }
})

export const { setStatus, setUserData, removeUser, setMessages, setSearchedUsers, setDialogs, setOpenChatWith } = userSlice.actions

let _newMessageHandler: ((data: any) => void) | null = null
const newMessageHandlerCreator = (dispatch: any) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (data) => {
            dispatch(setMessages(data))
        }
    }
    return _newMessageHandler
}
let _newDialogsHandler: ((data: any) => void) | null = null
const newDialogsHandlerCreator = (dispatch: any) => {
    if (_newDialogsHandler === null) {
        _newDialogsHandler = (data) => {
            dispatch(setDialogs(data))
        }
    }
    return _newDialogsHandler
}
let _newAuthUserHandler: ((data: any) => void) | null = null
const newAuthUserHandlerCreator = (dispatch: any) => {
    if (_newAuthUserHandler === null) {
        _newAuthUserHandler = (data) => {
            dispatch(setUserData(data))
        }
    }
    return _newAuthUserHandler
}

export const startMessagesListening = (uid?: string, chatId?: string) => async (dispatch: any) => {
    chatAPI.subscribe(newMessageHandlerCreator(dispatch), uid, chatId)
}
export const stopMessagesListening = (uid: string, chatId: string) => (dispatch: any) => {
    chatAPI.unsubscribe(uid, chatId)
}
export const startDialogsListening = (uid: string) => async (dispatch: any) => {
    dialogsAPI.subscribe(newDialogsHandlerCreator(dispatch), uid)
}
export const onAuth = (email: string, password: string) =>
    async (dispatch: any) => {
        try {
            dispatch(setStatus('pending'))
            const user = await userAuth.authMe(email, password)
            dispatch(setUserData(user))
            dispatch(setStatus('success'))
        } catch (error) {
            dispatch(setStatus('error'))
        }
    }
export const onAuthWithGoogle = () =>
    async (dispatch: any) => {
        const user: UserData = await userAuth.authMeWithGoogle()
        dispatch(setUserData(user))
        userInfo.setNewUserData(user)
    }
export const onSearchUsers = (name: string) =>
    async (dispatch: any) => {
        dispatch(setStatus('pending'))
        const users: UserData[] = await userInfo.searchUser(name)
        dispatch(setSearchedUsers(users))
        dispatch(setStatus('success'))
    }
export const onRegister = (forUserAuth: ForUserAuth) =>
    async (dispatch: any) => {
        await userAuth.registerMe(forUserAuth.email, forUserAuth.password)
        userAuth.updateUserData(forUserAuth.name).then(() => {
            return userAuth.getAuthUser()
        }).then((user) => {
            dispatch(setUserData(user))
            userInfo.setNewUserData(user)
        })
    }
export const getAuthUser = () => async (dispatch: any) => {
    userAuth.subscribe(newAuthUserHandlerCreator(dispatch))
}
export const updateUserData = (name: string) =>
    async (dispatch: any) => {
        await userAuth.updateUserData(name).then(() => {
            return userAuth.getAuthUser() as UserData
        }).then(user => {
            userInfo.setNewUserData(user)
            dispatch(setUserData(user))
        })
    }
export const sendMessageToGeneralChat = (MessageType: { fromId: string, fromName: string, text: string, photoURL?: string | null }) =>
    async (dispatch: any) => {
        await chatAPI.send(MessageType)
    }
export const sendMessageToUser = (MessageType: { fromId: string, fromName: string, text: string, photoURL?: string | null },
    to: { id: string, displayName: string | null, photoURL?: string | null }) =>
    async (dispatch: any) => {
        await dialogsAPI.sendMessageToUser(MessageType, to)
    }
export const signOut = () =>
    async (dispatch: any) => {
        await userAuth.signOut()
        dispatch(removeUser())
    }
export const removeMessageForMe = (myId: string, toUserId: string, messageID: number) =>
    async (dispatch: any) => {
        await dialogsAPI.deleteMessageForMe(myId, toUserId, messageID)
    }
export const removeMessageForAll = (myId: string, toUserId: string, messageID: number) =>
    async (dispatch: any) => {
        await dialogsAPI.deleteMessageForMe(myId, toUserId, messageID)
        await dialogsAPI.deleteMessageForUser(myId, toUserId, messageID)
    }
export const removeDialog = (myId: string, toUserId: string) =>
    async (dispatch: any) => {
        await dialogsAPI.deleteDialog(myId, toUserId)
    }
export const editMessage = (myId: string, toUserId: string, messageID: number, newMessageText: string) =>
    async (dispatch: any) => {
        await dialogsAPI.editMessage(myId, toUserId, messageID, newMessageText)
    }
export const messageViewedToggle = (myId: string, toUserId: string, messageID: number) =>
    async (dispatch: any) => {
        await dialogsAPI.messageViewedToggle(myId, toUserId, messageID)
    }

export default userSlice.reducer