import { useEffect, useRef, useState } from 'react'
import { Message } from './Message'
import { useSelector } from 'react-redux'
import { RootStateType } from 'store'
import { Box } from '@mui/material'
import NoMessageData from '../../common/NoMessageData'

type Props = {
    editMessageId: string
    deleteMessageHandler: (messageId: string) => void
    messageViewedToggleHandler: (messageId: string) => void
    editMessageHandler: (messageText: string, messageId: string) => void
}

export const ChatBody: React.FC<Props> = ({
    editMessageId,
    editMessageHandler,
    deleteMessageHandler,
    messageViewedToggleHandler,
}) => {
    const myId = useSelector((state: RootStateType) => state.user.userData?.uid) as string
    const messages = useSelector((state: RootStateType) => state.user.messages)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [isAutoscroll, setIsAutoscroll] = useState(false)

    const scrollToBottom = () => {
        isAutoscroll && messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
        const element = e.currentTarget
        if (element.scrollHeight - element.scrollTop - element.clientHeight <= 100) {
            !isAutoscroll && setIsAutoscroll(true)
        } else {
            isAutoscroll && setIsAutoscroll(false)
        }
    }

    useEffect(scrollToBottom, [messages])

    if (messages && messages.length !== 0) {
        return (
            <Box
                onScroll={scrollHandler}
                sx={{
                    mt: 'auto',
                    px: 2,
                    overflowY: 'scroll',
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                }}>
                {messages.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                        isMyMessage={myId === message.fromId}
                        isEditing={message.id === editMessageId}
                        onEditHandle={editMessageHandler}
                        deleteHandler={deleteMessageHandler}
                        messageViewedToggleHandler={messageViewedToggleHandler}
                    />
                ))}
                <div ref={messagesEndRef} />
            </Box>
        )
    } else {
        return <NoMessageData />
    }
}
