import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "store"
import { sendMessage, startMessagesListening } from "store/slices/userSlice"
import { Message } from "./Message"
import styles from 'styles/Chat.module.scss'

export const Chat = () => {
    const [newMessage, setNewMessage] = useState('')
    const dispatch = useDispatch()
    const name = useSelector((state: RootStateType) => state.user.userData.name)
    const id = useSelector((state: RootStateType) => state.user.userAuthData.id)
    const messages = useSelector((state: RootStateType) => state.user.messages)

    const onMessageTextChange = (text: string) => {
        setNewMessage(text)
    }
    useEffect(() => {
        dispatch(startMessagesListening())
    }, [])
    const onSendClick = () => {
        if (!!name && !!id && !!newMessage) {
            dispatch(sendMessage({ fromId: id, fromName: name, text: newMessage }))
            setNewMessage('')
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
                <textarea placeholder="Enter your message" value={newMessage} onChange={(e) => onMessageTextChange(e.target.value)} />
                <button onClick={onSendClick}>Send</button>
            </div>
        </div>
    )
}
