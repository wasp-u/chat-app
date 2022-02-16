import { dialogsAPI } from './../../api/firebase_api/dialogs';
import { chatAPI } from './../../api/firebase_api/chat';
import { userInfo } from 'api/firebase_api/userInfo';
import { createSlice } from "@reduxjs/toolkit";
import { userAuth } from "api/firebase_api/auth";

const initialState = {
    userData: {} as UserData,
    dialogs: [] as Dialog[],
    status: 'success' as 'success' | 'pending',
    error: null as string | null,
    messages: [] as Message[],
    searchedUSers: [] as UserData[],
    openChatWhit: {} as UserData
}
type Dialog = UserData & {
    messages: {}
}
type Message = {
    fromId: string
    fromName: string
    text: string
    time: number
    id: number
    photoURL: string
}
type ForUserAuth = {
    email: string
    password: string
    name: string,
}
export type UserData = {
    displayName: string | null,
    email: string | null,
    photoURL: string | null,
    uid: string | null,
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
                uid: null
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
        setOpenChatWhit(state, action) {
            state.openChatWhit = action.payload
        }
    }
})

export const { setStatus, setUserData, removeUser, setMessages, setSearchedUsers, setDialogs, setOpenChatWhit } = userSlice.actions

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

export const startMessagesListening = (uid?: string, chatId?: string) => async (dispatch: any) => {
    chatAPI.subscribe(newMessageHandlerCreator(dispatch), uid, chatId)
}
export const startDialogsListening = (uid: string) => async (dispatch: any) => {
    dialogsAPI.subscribe(newDialogsHandlerCreator(dispatch), uid)
}
export const onAuth = (email: string, password: string) =>
    async (dispatch: any) => {
        try {
            const user = await userAuth.authMe(email, password)
            dispatch(setUserData(user))
        } catch (error) {
            // @ts-ignore
            console.log(error.Message);
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
        const users: UserData[] = await userInfo.searchUser(name)
        dispatch(setSearchedUsers(users))
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
// export const getUserData = (id: string) =>
//     async (dispatch: any) => {
//         try {
//             const userData = await userInfo.getUserData(id)
//             if (!userData) {
//                 throw new Error('Hmm....')
//             }
//             dispatch(setUserData({ userName: userData.userName, userLastName: userData.userLastName, email: userData.email }))
//         } catch (error) {
//             console.log(error);
//         }
// }
export const updateUserData = (name: string) =>
    async (dispatch: any) => {
        await userAuth.updateUserData(name).then(() => {
            return userAuth.getAuthUser() as UserData
        }).then(user => {
            userInfo.setNewUserData(user)
            dispatch(setUserData(user))
        })
    }
export const sendMessageToGeneralChat = (Message: { fromId: string, fromName: string, text: string, photoURL: string }) =>
    async (dispatch: any) => {
        await chatAPI.send(Message)
    }
export const sendMessageToUser = (Message: { fromId: string, fromName: string, text: string, photoURL: string | null },
    to: { id: string, displayName: string | null, photoURL: string | null }) =>
    async (dispatch: any) => {
        await dialogsAPI.sendMessageToUser(Message, to)
    }
export const signOut = () =>
    async (dispatch: any) => {
        await userAuth.signOut()
        dispatch(removeUser())
    }
export default userSlice.reducer