import { KeyboardEvent, KeyboardEventHandler, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "store"
import { sendMessage, startMessagesListening } from "store/slices/userSlice"
import { Message } from "./Message"
import styles from 'styles/Chat.module.scss'

export const Chat = () => {
    const [newMessage, setNewMessage] = useState('')
    const name = useSelector((state: RootStateType) => state.user.userData.displayName)
    const id = useSelector((state: RootStateType) => state.user.userData.uid)
    const photoURL = useSelector((state: RootStateType) => state.user.userData.photoURL) as string
    const messages = useSelector((state: RootStateType) => state.user.messages)

    const dispatch = useDispatch()

    const onMessageTextChange = (text: string) => {
        setNewMessage(text)
    }

    useEffect(() => {
        dispatch(startMessagesListening())
    }, [dispatch])

    const onSendClick = () => {
        if (!!name && !!id && !!newMessage && newMessage !== '\n') {
            dispatch(sendMessage({ fromId: id, fromName: name, text: newMessage, photoURL }))
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
            <h1 className={styles.title}>chat</h1>
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
