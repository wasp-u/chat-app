import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from 'store'
import {
    editMessage,
    removeDialog,
    sendMessageToUser,
    startMessagesListening,
    stopMessagesListening,
} from 'store/slices/userSlice'
import { ChatBody } from './ChatBody'
import { ChatHeader } from './ChatHeader'
import { ChatSendForm } from './ChatSendForm'
import styles from 'styles/Chat.module.scss'
import { Loader } from '../Loader'
import { motion } from 'framer-motion'
import { useGetUser } from 'hooks/useGetUser'

type Props = {}

export const Chat: React.FC<Props> = () => {
    const userData = useSelector((state: RootStateType) => state.user.userData)
    const withUID = useSelector((state: RootStateType) => state.user.openChatWithId) as string

    const openDialogWith = useGetUser(withUID)

    const [initialFormValue, setInitialFormValue] = useState('')
    const [editMessageMode, setEditMessageMode] = useState(false)
    const [editMessageId, setEditMessageId] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(startMessagesListening(userData.uid, withUID))
        return () => {
            // @ts-ignore
            dispatch(stopMessagesListening(userData.uid, withUID))
        }
    }, [dispatch, withUID, userData.uid])

    const deleteDialogHandle = () => {
        dispatch(removeDialog(userData.uid, withUID))
    }

    const onSendClick = (messageText: string) => {
        if (!!userData.uid && !!userData.displayName) {
            if (editMessageMode) {
                dispatch(editMessage(userData.uid, withUID, editMessageId, messageText))
                setEditMessageMode(false)
                setInitialFormValue('')
                setEditMessageId(0)
            } else {
                dispatch(
                    sendMessageToUser(
                        {
                            fromId: userData.uid,
                            fromName: userData.displayName,
                            text: messageText,
                            photoURL: userData.photoURL,
                        },
                        {
                            id: withUID,
                            displayName: openDialogWith.displayName,
                            photoURL: openDialogWith.photoURL,
                        }
                    )
                )
            }
        }
    }

    const onEditHandle = (messagePreviousText: string, messageId: number) => {
        setInitialFormValue(messagePreviousText)
        setEditMessageMode(true)
        setEditMessageId(messageId)
    }
    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }
    return withUID ? (
        <motion.div
            initial='hidden'
            animate='visible'
            layout
            variants={variants}
            transition={{ duration: 0.1, delay: 0.1 }}
            className={styles.chat}
        >
            <ChatHeader deleteDialogHandle={deleteDialogHandle} />
            <ChatBody onEditHandle={onEditHandle} />
            <ChatSendForm onSubmit={onSendClick} initialValue={initialFormValue} />
        </motion.div>
    ) : (
        <Loader />
    )
}
