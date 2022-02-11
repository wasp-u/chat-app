import { chatAPI } from './../../api/firebase_api/chat';
import { userInfo } from 'api/firebase_api/userInfo';
import { createSlice } from "@reduxjs/toolkit";
import { userAuth } from "api/firebase_api/auth";

const initialState = {
    userData: {
        email: null as string | null,
        name: null as string | null,
        lastName: null as string | null
    },
    userAuthData: {
        email: null as string | null,
        id: null as string | null,
    },
    status: 'success' as 'success' | 'pending',
    error: null as string | null,
    messages: [] as message[]
}
type message = {
    fromId: string
    fromName: string
    text: string
    time: number
    id: number
}
type ForUserAuth = {
    email: string
    password: string
    name: string,
    lastName: string
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
                email: action.payload.email,
                name: action.payload.userName,
                lastName: action.payload.userLastName
            }
        },
        setUserAuthData(state, action) {
            state.userAuthData = {
                email: action.payload.email,
                id: action.payload.id
            }
        },
        removeUser(state) {
            state.userAuthData = {
                email: null,
                id: null
            }
            state.userData = {
                email: null,
                name: null,
                lastName: null
            }
        },
        setMessages(state, action) {
            let messagesArr = []
            for (let item in action.payload) {
                messagesArr.push(action.payload[item])
            }
            state.messages = messagesArr
        }

    }
})

export const { setStatus, setUserData, setUserAuthData, removeUser, setMessages } = userSlice.actions

let _newDataHandler: ((data: any) => void) | null = null
const newDataHandlerCreator = (dispatch: any) => {
    if (_newDataHandler === null) {
        _newDataHandler = (data) => {
            for (let key in data) {
                dispatch(setUserData(data[key]))
            }
        }
    }
    return _newDataHandler
}

let _newMessageHandler: ((data: any) => void) | null = null
const newMessageHandlerCreator = (dispatch: any) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (data) => {
            dispatch(setMessages(data))
        }
    }
    return _newMessageHandler
}

export const startDataListening = () => async (dispatch: any) => {
    // userInfo.subscribe(newDataHandlerCreator(dispatch))
}
export const startMessagesListening = () => async (dispatch: any) => {
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const onAuth = (email: string, password: string) =>
    async (dispatch: any) => {
        const data = await userAuth.authMe(email, password)
        dispatch(setUserAuthData({ id: data.uid, email: data.email }))
    }
export const onAuthWithGoogle = () =>
    async (dispatch: any) => {
        // @ts-ignore
        const { id, email, fullName } = await userAuth.authMeWithGoogle()
        const name = fullName.split(' ')[0]
        const lastName = fullName.split(' ')[1]
        dispatch(setUserAuthData({ id, email: email }))
        dispatch(setUserDataHandle({ userId: id, email, userName: name, userLastName: lastName }))
    }
export const onRegister = (forUserAuth: ForUserAuth) =>
    async (dispatch: any) => {
        dispatch(setStatus('pending'))
        const { uid, email } = await userAuth.registerMe(forUserAuth.email, forUserAuth.password)
        dispatch(setStatus('success'))
        dispatch(setUserAuthData({ id: uid, email: email }))
        await dispatch(setUserDataHandle({ userId: uid, email, userName: forUserAuth.name, userLastName: forUserAuth.lastName }))
    }
export const getUserData = (id: string) =>
    async (dispatch: any) => {
        try {
            const userData = await userInfo.getUserData(id)
            if (!userData) {
                throw new Error('Hmm....')
            }
            dispatch(setUserData({ userName: userData.userName, userLastName: userData.userLastName, email: userData.email }))
        } catch (error) {
            console.log(error);
        }
    }
export const setUserDataHandle = (userData: { userId: string, email: string, userName: string, userLastName: string }) =>
    async (dispatch: any) => {
        dispatch(setStatus('pending'))
        await userInfo.setNewUserData(userData)
        dispatch(getUserData(userData.userId))
        dispatch(setStatus('success'))
    }
export const sendMessage = (message: { fromId: string, fromName: string, text: string }) =>
    async (dispatch: any) => {
        await chatAPI.send(message)
    }
export default userSlice.reducer