import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "store"
import { editMessage, removeDialog, sendMessageToGeneralChat, sendMessageToUser, startMessagesListening, UserData } from "store/slices/userSlice"
import { ChatBody } from "./ChatBody"
import { ChatHeader } from "./ChatHeader"
import { ChatSendForm } from "./ChatSendForm"
import styles from 'styles/Chat.module.scss'

type Props = {
    withUID: string | null
}

export const Chat: React.FC<Props> = ({ withUID }) => {

    const userData = useSelector((state: RootStateType) => state.user.userData)
    const chatWithUser = useSelector((state: RootStateType) => state.user.openChatWhit)

    const [initialFormValue, setInitialFormValue] = useState('');
    const [editMessageMode, setEditMessageMode] = useState(false);
    const [editMessageId, setEditMessageId] = useState(0);

    const dispatch = useDispatch()

    useEffect(() => {
        if (withUID !== 'GeneralChat') {
            // @ts-ignore
            dispatch(startMessagesListening(userData.uid, withUID))
        } else {
            dispatch(startMessagesListening())
        }
    }, [dispatch, withUID, userData.uid])

    const generalChatHeader: UserData = {
        displayName: 'General Chat',
        email: '',
        uid: 'GeneralChat'
    }

    const deleteDialogHandle = () => {
        if (!!userData.uid && !!chatWithUser.uid) {
            dispatch(removeDialog(userData.uid, chatWithUser.uid))
        }
    }

    const onSendClick = (messageText: string) => {
        if (!!userData.uid && !!userData.displayName && !!chatWithUser.uid) {
            if (editMessageMode) {
                dispatch(editMessage(userData.uid, chatWithUser.uid, editMessageId, messageText))
                setEditMessageMode(false)
                setInitialFormValue('')
                setEditMessageId(0)
            } else {
                if (withUID !== 'GeneralChat') {
                    dispatch(sendMessageToUser(
                        { fromId: userData.uid, fromName: userData.displayName, text: messageText, photoURL: userData.photoURL },
                        { id: chatWithUser.uid, displayName: chatWithUser.displayName, photoURL: chatWithUser.photoURL }
                    ));
                } else {
                    dispatch(sendMessageToGeneralChat({ fromId: userData.uid, fromName: userData.displayName, text: messageText, photoURL: userData.photoURL }));
                }
            }
        }
    };

    const onEditHandle = (messagePreviousText: string, messageId: number) => {
        setInitialFormValue(messagePreviousText)
        setEditMessageMode(true)
        setEditMessageId(messageId)
    }

    return (
        <div >
            <div className={styles.chat}>
                <ChatHeader
                    chatWithUser={withUID !== 'GeneralChat' ? chatWithUser : generalChatHeader}
                    deleteDialogHandle={deleteDialogHandle} />
                <ChatBody onEditHandle={onEditHandle} />
                <ChatSendForm onSubmit={onSendClick} initialValue={initialFormValue} />
            </div>
        </div>
    )
}


