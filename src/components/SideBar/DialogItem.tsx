import Avatar from "antd/lib/avatar/avatar"
import { useSelector } from "react-redux"
import { RootStateType } from "store"
import { Dialog, MessageType, UserData } from "store/slices/userSlice"
import styles from 'styles/DialogItem.module.scss'

type Props = {
    dialog: Dialog
    onCLick: (user: UserData) => void
}

export const DialogItem: React.FC<Props> = ({ dialog, onCLick }) => {

    const uid = useSelector((state: RootStateType) => state.user.userData.uid)
    const withUID = useSelector((state: RootStateType) => state.user.openChatWhit.uid)
    let displayTime = ''
    let lastMessage: MessageType | undefined = undefined

    if (!!dialog.messages) {
        const messages = Object.keys(dialog.messages)
        const lastMessageIndex = messages[messages.length - 1]
        lastMessage = dialog.messages[`${lastMessageIndex}`]
    }

    if (lastMessage) {
        const sendLastMessageTime = new Date(lastMessage.time)
        const time = sendLastMessageTime.toString().split(' ')[4].split(':');
        displayTime = time[0] + ':' + time[1]
    }

    return (
        <div
            className={dialog.uid === withUID ? `${styles.userCard} ${styles.userCard_active}` : `${styles.userCard}`}
            onClick={() => onCLick(dialog)}>
            <div className={styles.profilePhoto}>
                {dialog.photoURL
                    ? <img
                        className={styles.profilePhoto}
                        style={{ 'borderRadius': '50%' }}
                        src={dialog.photoURL}
                        alt='#'
                    />
                    : <Avatar size={40}>{dialog.displayName ? dialog.displayName[0] : 'U'}</Avatar>
                }
            </div>
            <div className={styles.nameAndLastMessage}>
                <div>
                    <p>{dialog.displayName}</p>
                    <p>{dialog.email}</p>
                </div>
                {lastMessage &&
                    <div className={styles.lastMessage}>
                        {uid === lastMessage.fromId && <a style={{ 'marginRight': '5px' }} href='/#'>You: </a>}
                        <div className={styles.textAndTime}>
                            <div className={styles.text}>{lastMessage.text}</div>
                            <div>{displayTime}</div>
                        </div>
                    </div>}

            </div>
        </div>
    )
}