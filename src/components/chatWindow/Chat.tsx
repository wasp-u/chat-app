import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from 'store'
import {
    editMessage,
    removeDialog,
    sendMessageToGeneralChat,
    sendMessageToUser,
    startMessagesListening,
    stopMessagesListening,
    UserData,
} from 'store/slices/userSlice'
import {ChatBody} from './ChatBody'
import {ChatHeader} from './ChatHeader'
import {ChatSendForm} from './ChatSendForm'
import styles from 'styles/Chat.module.scss'
import {Loader} from '../Loader'
import {motion} from 'framer-motion'

type Props = {}

export const Chat: React.FC<Props> = () => {
    const userData = useSelector((state: RootStateType) => state.user.userData)
    const withUID = useSelector((state: RootStateType) => state.user.openChatWithId)

    const openDialog = useSelector(
        (state: RootStateType) => state.user.dialogs.filter(d => d.uid === withUID)[0]
    )

    const [initialFormValue, setInitialFormValue] = useState('')
    const [editMessageMode, setEditMessageMode] = useState(false)
    const [editMessageId, setEditMessageId] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        if (withUID !== 'GeneralChat') {
            // @ts-ignore
            dispatch(startMessagesListening(userData.uid, withUID))
        } else {
            dispatch(startMessagesListening())
        }
        return () => {
            // @ts-ignore
            dispatch(stopMessagesListening(userData.uid, withUID))
        }
    }, [dispatch, withUID, userData.uid])

    const generalChatHeader: UserData = {
        displayName: 'General Chat',
        email: '',
        uid: 'GeneralChat',
    }

    const deleteDialogHandle = () => {
        if (!!userData.uid && !!openDialog.uid) {
            dispatch(removeDialog(userData.uid, openDialog.uid))
        }
    }

    const onSendClick = (messageText: string) => {
        if (!!userData.uid && !!userData.displayName) {
            if (editMessageMode) {
                dispatch(editMessage(userData.uid, openDialog.uid, editMessageId, messageText))
                setEditMessageMode(false)
                setInitialFormValue('')
                setEditMessageId(0)
            } else {
                if (withUID !== 'GeneralChat') {
                    dispatch(
                        sendMessageToUser(
                            {
                                fromId: userData.uid,
                                fromName: userData.displayName,
                                text: messageText,
                                photoURL: userData.photoURL,
                            },
                            {
                                id: openDialog.uid,
                                displayName: openDialog.displayName,
                                photoURL: openDialog.photoURL,
                            }
                        )
                    )
                } else {
                    dispatch(
                        sendMessageToGeneralChat({
                            fromId: userData.uid,
                            fromName: userData.displayName,
                            text: messageText,
                            photoURL: userData.photoURL,
                        })
                    )
                }
            }
        }
    }

    const onEditHandle = (messagePreviousText: string, messageId: number) => {
        setInitialFormValue(messagePreviousText)
        setEditMessageMode(true)
        setEditMessageId(messageId)
    }
    const variants = {
        visible: {opacity: 1},
        hidden: {opacity: 0},
    }
    return withUID ? (
        <motion.div
            initial='hidden'
            animate='visible'
            layout
            variants={variants}
            transition={{duration: 0.1, delay: 0.1}}
            className={styles.chat}
        >
            <ChatHeader
                chatWithUser={withUID !== 'GeneralChat' ? openDialog : generalChatHeader}
                deleteDialogHandle={deleteDialogHandle}
            />
            <ChatBody onEditHandle={onEditHandle} />
            <ChatSendForm onSubmit={onSendClick} initialValue={initialFormValue} />
        </motion.div>
    ) : (
        <Loader />
    )
}
