import { KeyboardEvent, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "store"
import { sendMessageToGeneralChat, sendMessageToUser, startMessagesListening } from "store/slices/userSlice"
import { Message } from "./Message"
import styles from 'styles/Chat.module.scss'

type Props = {
    withUID: string | null
}

export const Chat: React.FC<Props> = ({ withUID }) => {

    const [newMessage, setNewMessage] = useState('')
    const name = useSelector((state: RootStateType) => state.user.userData.displayName)
    const uid = useSelector((state: RootStateType) => state.user.userData.uid)
    const photoURL = useSelector((state: RootStateType) => state.user.userData.photoURL) as string
    const messages = useSelector((state: RootStateType) => state.user.messages)
    const openChatWith = useSelector((state: RootStateType) => state.user.openChatWhit)

    const dispatch = useDispatch()

    const onMessageTextChange = (text: string) => {
        setNewMessage(text)
    }

    useEffect(() => {
        if (withUID !== 'GeneralChat') {
            // @ts-ignore
            dispatch(startMessagesListening(uid, withUID))
        } else {
            dispatch(startMessagesListening())
        }
    }, [dispatch, withUID])

    const onSendClick = () => {
        if (!!name && !!uid && !!newMessage && newMessage !== '\n' && !!withUID) {
            if (withUID !== 'GeneralChat') {
                // @ts-ignore
                dispatch(sendMessageToUser(
                    { fromId: uid, fromName: name, text: newMessage, photoURL },
                    { id: withUID, displayName: openChatWith.displayName, photoURL: openChatWith.photoURL }
                ))
            } else {
                dispatch(sendMessageToGeneralChat({ fromId: uid, fromName: name, text: newMessage, photoURL }))
            }
            setNewMessage('')
        }
        if (newMessage === '\n') {
            setNewMessage('')
        }
    }

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const onEnterKeyClick = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            onSendClick()
            textAreaRef.current?.blur()
        }
    }

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [messages]);

    return (
        <div >
            <div className={styles.chat}>
                <div className={styles.chat_window}>
                    {messages.map(message => <Message key={message.id} message={message} />)}
                    <div ref={messagesEndRef} />
                </div>
                <textarea
                    ref={textAreaRef}
                    onKeyDown={onEnterKeyClick}
                    placeholder="Enter your message"
                    value={newMessage !== '\n' ? newMessage : ''}
                    onChange={(e) => onMessageTextChange(e.target.value)} />
                <button onClick={onSendClick}>Send</button>
            </div>
        </div>
    )
}
