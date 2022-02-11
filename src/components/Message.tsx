import { Avatar } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootStateType } from 'store'
import styles from 'styles/Chat.module.scss'

type Props = {
    message: {
        text: string
        fromId: string
        fromName: string
        time: number
    }
}

export const Message: React.FC<Props> = React.memo(function Message({ message }) {

    const id = useSelector((state: RootStateType) => state.user.userAuthData.id) as string
    const sendTime = new Date(message.time)
    const displayTime = sendTime.toString().split(' ')[4];

    return (
        <div
            className={styles.message}
            style={message.fromId == id
                ? { background: '#468faf', 'marginLeft': 'auto' }
                : { background: '#89c2d9' }}>
            <Avatar className={styles.avatar} size={40}>{message.fromName[0]}</Avatar>
            <div>
                <div className={styles.userName}>
                    {message.fromName}
                </div>
                <div>
                    {message.text}
                </div>
            </div>
            <div className={styles.time}>
                {displayTime}
            </div>
        </div>
    )
})
