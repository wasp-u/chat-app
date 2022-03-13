import { useEffect, useRef } from 'react'
import { Message } from './Message'
import { useSelector } from 'react-redux'
import { RootStateType } from 'store'
import styles from 'styles/Chat.module.scss'

type Props = {
    onEditHandle: (messageText: string, messageId: number) => void
}

export const ChatBody: React.FC<Props> = ({ onEditHandle }) => {
    const messages = useSelector((state: RootStateType) => state.user.messages)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    useEffect(scrollToBottom, [messages])

    return (
        <div className={styles.chat_window}>
            <div style={{ height: '200px' }}></div>
            {messages.map(message => (
                <Message key={message.id} message={message} onEditHandle={onEditHandle} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}
