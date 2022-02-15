import { chatAPI } from './../../api/firebase_api/chat';
import { userInfo } from 'api/firebase_api/userInfo';
import { createSlice } from "@reduxjs/toolkit";
import { userAuth } from "api/firebase_api/auth";

const initialState = {
    userData: {
        displayName: null as string | null,
        email: null as string | null,
        photoURL: null as string | null,
        uid: null as string | null,
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
    photoURL: string
}
type ForUserAuth = {
    email: string
    password: string
    name: string,
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
        }

    }
})

export const { setStatus, setUserData, removeUser, setMessages } = userSlice.actions

// let _newDataHandler: ((data: any) => void) | null = null
// const newDataHandlerCreator = (dispatch: any) => {
//     if (_newDataHandler === null) {
//         _newDataHandler = (data) => {
//             for (let key in data) {
//                 dispatch(setUserData(data[key]))
//             }
//         }
//     }
//     return _newDataHandler
// }

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
        try {
            const user = await userAuth.authMe(email, password)
            dispatch(setUserData(user))
        } catch (error) {
            // @ts-ignore
            console.log(error.message);
        }
    }
export const onAuthWithGoogle = () =>
    async (dispatch: any) => {
        const user = await userAuth.authMeWithGoogle()
        dispatch(setUserData(user))
    }
export const onRegister = (forUserAuth: ForUserAuth) =>
    async (dispatch: any) => {
        await userAuth.registerMe(forUserAuth.email, forUserAuth.password)
        userAuth.updateUserData(forUserAuth.name).then(() => {
            return userAuth.getAuthUser()
        }).then((user) => {
            dispatch(setUserData(user))
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
            const user = userAuth.getAuthUser()
            dispatch(setUserData(user))
        })
    }
export const sendMessage = (message: { fromId: string, fromName: string, text: string, photoURL: string }) =>
    async (dispatch: any) => {
        await chatAPI.send(message)
    }
export const signOut = () =>
    async (dispatch: any) => {
        await userAuth.signOut()
        dispatch(removeUser())
    }
export default userSlice.reducer