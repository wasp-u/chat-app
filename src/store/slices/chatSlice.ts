import { dialogsAPI } from './../../api/firebase_api/dialogs'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chatAPI } from '../../api/firebase_api/chat'

const initialState = {
    error: null as string | null,
    messages: [] as MessageType[],
}
export type MessageType = {
    id: string
    fromId: string
    text: string
    time: number
    edited: boolean
    viewed: boolean
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        setMessages(state, action: PayloadAction<MessageType[]>) {
            state.messages = action.payload
        },
    },
})

export const { setMessages } = chatSlice.actions

let _newMessageHandler: ((data: any) => void) | null = null
const newMessageHandlerCreator = (dispatch: any) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = data => {
            dispatch(setMessages(data))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (dialodId: string) => async (dispatch: any) => {
    chatAPI.subscribe(newMessageHandlerCreator(dispatch), dialodId)
}
export const stopMessagesListening = (dialodId: string) => (dispatch: any) => {
    const unsubscribe = chatAPI.subscribe(newMessageHandlerCreator(dispatch), dialodId)
    unsubscribe()
}
export const sendMessage = (text: string, toUserId: string) => async (dispatch: any) => {
    await dialogsAPI.sendMessage(text, toUserId)
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

export default chatSlice.reducer
