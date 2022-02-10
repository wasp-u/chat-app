import { useEffect, useState } from "react"
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
        if (!!name && !!id) {
            dispatch(sendMessage({ fromId: id, fromName: name, text: newMessage }))
            setNewMessage('')
        }
    }

    return (
        <div >
            <h1>chat</h1>
            <div className={styles.chat}>
                <div className={styles.chat_window}>
                    {messages.map(message => <Message text={message.text} fromId={message.fromId} fromName={message.fromName} />)}
                </div>
                <textarea value={newMessage} onChange={(e) => onMessageTextChange(e.target.value)} />
                <button onClick={onSendClick}>Send</button>
            </div>
        </div>
    )
}
