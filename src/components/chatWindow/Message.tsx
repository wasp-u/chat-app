import { Avatar, Dropdown, Menu, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from 'store'
import styles from 'styles/Chat.module.scss'
import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { MessageType, messageViewedToggle, removeMessageForAll, removeMessageForMe } from 'store/slices/userSlice'
import { useSearchParams } from 'react-router-dom'

type Props = {
    message: MessageType
    onEditHandle: (messageText: string, messageId: number) => void
}

export const Message: React.FC<Props> = React.memo(function Message({ message, onEditHandle }) {

    const id = useSelector((state: RootStateType) => state.user.userData.uid) as string
    const withChatId = useSelector((state: RootStateType) => state.user.openChatWhit.uid)
    const sendTime = new Date(message.time)
    const displayTime = sendTime.toString().split(' ')[4];

    const [isMessageHover, setIsMessageHover] = useState(false)

    const dispatch = useDispatch()

    const onMessageHover = () => {
        setIsMessageHover(true)
    }
    const onMessageHoverLeave = () => {
        setIsMessageHover(false)
    }

    const deleteForMeHandle = () => {
        withChatId && dispatch(removeMessageForMe(id, withChatId, message.id))
    }
    const deleteForAllHandle = () => {
        withChatId && dispatch(removeMessageForAll(id, withChatId, message.id))
    }

    const menu = (
        <Menu style={{ 'background': '#212121' }}>
            <Menu.Item key='0' danger onClick={deleteForMeHandle}>Delete for me</Menu.Item>
            <Menu.Item key='1' danger onClick={deleteForAllHandle}>Delete for all</Menu.Item>
        </Menu>
    );
    const isMyMessage = id === message.fromId
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (withChatId && searchParams.get('uid') !== 'GeneralChat') {
            !isMyMessage && dispatch(messageViewedToggle(id, withChatId, message.id))
        }
    }, [dispatch])

    return (
        <div
            className={styles.message}
            style={message.fromId === id
                ? { background: '#242331', 'marginLeft': 'auto' }
                : { background: '#212121' }}
            onMouseEnter={onMessageHover}
            onMouseLeave={onMessageHoverLeave}
        >
            <div className={styles.profilePhoto}>
                {message.photoURL
                    ? <img
                        style={{ 'borderRadius': '50%' }}
                        src={message.photoURL}
                    />
                    : <Avatar size={40}>{message.fromName[0]}</Avatar>
                }
            </div>
            <div>
                <div className={styles.userName}>
                    {message.fromName}
                </div>
                <div className={styles.messageText}>
                    {message.text}
                </div>
            </div>
            {!isMessageHover
                ? <div className={styles.info}>
                    <p>{displayTime}</p>
                    <div className={styles.additionalInfo}>
                        {message.edited && <span>edited</span>}
                        {isMyMessage && (message.viewed
                            ? <img src="https://img.icons8.com/color/18/000000/double-tick.png" />
                            : <img src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/25/000000/external-tick-interface-royyan-wijaya-detailed-outline-royyan-wijaya.png" />)
                        }
                    </div>
                </div>
                : <div style={{ 'display': 'flex' }}>
                    {isMyMessage && <Tooltip title="Edit message">
                        <EditOutlined onClick={() => onEditHandle(message.text, message.id)} className={styles.editIcon} />
                    </Tooltip>}
                    <Dropdown overlay={menu}>
                        <DeleteFilled className={styles.deleteIcon} />
                    </Dropdown>

                </div>
            }
        </div>
    )
})

