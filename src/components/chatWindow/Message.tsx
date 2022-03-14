import { Avatar, Dropdown, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from 'store'
import { DeleteFilled, EditOutlined } from '@ant-design/icons'
import {
    MessageType,
    messageViewedToggle,
    removeMessageForAll,
    removeMessageForMe,
} from 'store/slices/userSlice'
import styles from 'styles/Chat.module.scss'

type Props = {
    message: MessageType
    onEditHandle: (messageText: string, messageId: number) => void
}

export const Message: React.FC<Props> = React.memo(function Message({ message, onEditHandle }) {
    const myID = useSelector((state: RootStateType) => state.user.userData.uid) as string
    const withChatId = useSelector((state: RootStateType) => state.user.openChatWithId) as string

    const sendTime = new Date(message.time)
    const time = sendTime.toString().split(' ')[4].split(':')
    const displayTime = time[0] + ':' + time[1]

    const [isMessageHover, setIsMessageHover] = useState(false)

    const dispatch = useDispatch()

    const onMessageHover = () => {
        setIsMessageHover(true)
    }
    const onMessageHoverLeave = () => {
        setIsMessageHover(false)
    }

    const deleteForMeHandle = () => {
        withChatId && dispatch(removeMessageForMe(myID, withChatId, message.id))
    }
    const deleteForAllHandle = () => {
        withChatId && dispatch(removeMessageForAll(myID, withChatId, message.id))
    }

    const menu = (
        <Menu style={{ background: '#212121' }}>
            <Menu.Item key='0' danger onClick={deleteForMeHandle}>
                Delete for me
            </Menu.Item>
            <Menu.Item key='1' danger onClick={deleteForAllHandle}>
                Delete for all
            </Menu.Item>
        </Menu>
    )
    const isMyMessage = myID === message.fromId

    useEffect(() => {
        !isMyMessage && dispatch(messageViewedToggle(myID, withChatId, message.id))
    }, [dispatch, myID, withChatId, message.id, isMyMessage])

    return (
        <div
            className={styles.message}
            style={
                isMyMessage
                    ? { background: '#242331', marginLeft: 'auto' }
                    : { background: '#212121' }
            }
            onMouseEnter={onMessageHover}
            onMouseLeave={onMessageHoverLeave}
        >
            <div className={styles.profilePhoto}>
                {message.photoURL ? (
                    <img style={{ borderRadius: '50%' }} src={message.photoURL} alt='avatar' />
                ) : (
                    <Avatar size={40}>{message.fromName[0]}</Avatar>
                )}
            </div>
            <div>
                <div className={styles.userName}>{message.fromName}</div>
                <div className={styles.messageText}>{message.text}</div>
            </div>
            {!isMessageHover ? (
                <div className={styles.info}>
                    <p>{displayTime}</p>
                    <div className={styles.additionalInfo}>
                        {message.edited && <span>edited</span>}
                        {isMyMessage &&
                            (message.viewed ? (
                                <img
                                    src='https://img.icons8.com/color/18/000000/double-tick.png'
                                    alt='one check'
                                />
                            ) : (
                                <img
                                    src='https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/25/000000/external-tick-interface-royyan-wijaya-detailed-outline-royyan-wijaya.png'
                                    alt='double check'
                                />
                            ))}
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex' }}>
                    {isMyMessage && (
                        <EditOutlined
                            onClick={() => onEditHandle(message.text, message.id)}
                            className={styles.editIcon}
                        />
                    )}
                    <Dropdown overlay={menu}>
                        <DeleteFilled className={styles.deleteIcon} />
                    </Dropdown>
                </div>
            )}
        </div>
    )
})
