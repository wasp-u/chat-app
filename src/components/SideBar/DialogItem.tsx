import Avatar from 'antd/lib/avatar/avatar'
import { useLastMessageIsNew } from 'hooks/useLastMessageIsNew'
import { useSelector } from 'react-redux'
import { RootStateType } from 'store'
import { Dialog, MessageType } from 'store/slices/userSlice'
import styles from 'styles/DialogItem.module.scss'

type Props = {
    isActive: boolean
    dialog: Dialog
    onCLick: (uid: string) => void
}

export const DialogItem: React.FC<Props> = ({ dialog, isActive, onCLick }) => {
    const uid = useSelector((state: RootStateType) => state.user.userData.uid)
    let displayTime = ''

    let lastMessage = {} as MessageType

    if (dialog.messages) {
        const messages = Object.keys(dialog.messages)
        const lastMessageKey = messages[messages.length - 1]
        lastMessage = dialog.messages[`${lastMessageKey}`]
        const sendLastMessageTime = new Date(lastMessage.time)
        const time = sendLastMessageTime.toString().split(' ')[4].split(':')
        displayTime = time[0] + ':' + time[1]
    }

    const isMyMessage = uid === lastMessage?.fromId

    const lastMessageIsNew = useLastMessageIsNew(uid, dialog.uid, lastMessage.id)

    return (
        <div
            className={
                isActive ? `${styles.userCard} ${styles.userCard_active}` : `${styles.userCard}`
            }
            onClick={() => onCLick(dialog.uid)}
        >
            <div className={styles.profilePhoto}>
                {dialog.photoURL ? (
                    <img
                        className={styles.profilePhoto}
                        style={{ borderRadius: '50%' }}
                        src={dialog.photoURL}
                        alt='#'
                    />
                ) : (
                    <Avatar size={40}>{dialog.displayName ? dialog.displayName[0] : 'U'}</Avatar>
                )}
            </div>
            <div className={styles.nameAndLastMessage}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <p>{dialog.displayName}</p>
                    {!isMyMessage && lastMessageIsNew && (
                        <div
                            style={{
                                background: '#2F7E9B',
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                            }}
                        ></div>
                    )}
                </div>
                {lastMessage && (
                    <div className={styles.lastMessage}>
                        {isMyMessage && (
                            <a style={{ marginRight: '5px' }} href='/#'>
                                You:{' '}
                            </a>
                        )}
                        <div className={styles.textAndTime}>
                            <div className={styles.text}>{lastMessage.text}</div>
                            <div>{displayTime}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
