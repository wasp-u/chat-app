import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { OpenChat, setOpenChat } from 'store/slices/appSlice'
import { ChatBody } from './ChatBody/ChatBody'
import { ChatHeader } from './ChatHeader/ChatHeader'
import { ChatSendForm } from './ChatSendForm/ChatSendForm'
import { useSearchParams } from 'react-router-dom'
import { Stack } from '@mui/material'
import {
    editMessage,
    messageViewedToggle,
    removeMessage,
    sendMessage,
    startMessagesListening,
} from '../../store/slices/chatSlice'

type Props = {
    openChat: OpenChat
}

const Chat: React.FC<Props> = React.memo(({ openChat }) => {
    const [initialFormValue, setInitialFormValue] = useState('')
    const [editMessageMode, setEditMessageMode] = useState(false)
    const [editMessageId, setEditMessageId] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = dispatch(startMessagesListening(openChat.dialogId))
        return () => {
            unsubscribe(dispatch)
        }
    }, [dispatch, openChat.dialogId])

    const setSearchParams = useSearchParams()[1]
    const deleteDialogHandler = () => {
        setSearchParams({})
        dispatch(setOpenChat(null))
        // openChat.dialogId && dispatch(removeDialog(openChat.dialogId))
    }

    const deleteMessageHandler = (messageId: string) => {
        dispatch(removeMessage(openChat.dialogId, messageId))
    }
    const messageViewedToggleHandler = (messageId: string) => {
        dispatch(messageViewedToggle(openChat.dialogId, messageId))
    }

    const onSendClick = (messageText: string) => {
        if (editMessageMode) {
            openChat.dialogId &&
                dispatch(editMessage(openChat.dialogId, editMessageId, messageText))
            deactivateEditMode()
        } else {
            openChat.withUser && dispatch(sendMessage(messageText, openChat.withUser.uid))
        }
    }

    const deactivateEditMode = () => {
        setEditMessageId('')
        setEditMessageMode(false)
        setInitialFormValue('')
    }

    const activateEditMode = (messagePreviousText: string, messageId: string) => {
        setInitialFormValue(messagePreviousText)
        setEditMessageMode(true)
        setEditMessageId(messageId)
    }

    return (
        <Stack
            direction='column'
            justifyContent='space-between'
            alignItems='stretch'
            sx={{
                color: 'text.primary',
                bgcolor: 'background.paper',
                my: 2,
                height: 'calc(100vh - 16px)',
                borderRadius: 2,
            }}>
            <ChatHeader deleteDialogHandle={deleteDialogHandler} withUser={openChat.withUser} />
            <ChatBody
                deleteMessageHandler={deleteMessageHandler}
                editMessageId={editMessageId}
                editMessageHandler={activateEditMode}
                messageViewedToggleHandler={messageViewedToggleHandler}
            />
            <ChatSendForm
                onSubmit={onSendClick}
                initialValue={initialFormValue}
                deactivateEditMode={deactivateEditMode}
            />
        </Stack>
    )
})
export default Chat
