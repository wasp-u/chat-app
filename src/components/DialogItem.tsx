import Avatar from "antd/lib/avatar/avatar"
import { useSelector } from "react-redux"
import { RootStateType } from "store"
import { Dialog, UserData } from "store/slices/userSlice"
import styles from 'styles/DialogItem.module.scss'

type Props = {
    dialog: Dialog
    onCLick: (user: UserData) => void
}

export const DialogItem: React.FC<Props> = ({ dialog, onCLick }) => {

    const uid = useSelector((state: RootStateType) => state.user.userData.uid)
    let displayTime = ''
    if (dialog.lastMessage) {
        const sendLastMessageTime = new Date(dialog.lastMessage.time)
        const time = sendLastMessageTime.toString().split(' ')[4].split(':');
        displayTime = time[0] + ':' + time[1]
    }

    return (
        <div className={styles.userCard} onClick={() => onCLick(dialog)}>
            <div className={styles.profilePhoto}>
                {dialog.photoURL
                    ? <img
                        className={styles.profilePhoto}
                        style={{ 'borderRadius': '50%' }}
                        src={dialog.photoURL}
                    />
                    : <Avatar size={40}>{dialog.displayName ? dialog.displayName[0] : 'U'}</Avatar>
                }
            </div>
            <div className={styles.nameAndLastMessage}>
                <div>
                    <p>{dialog.displayName}</p>
                    <p>{dialog.email}</p>
                </div>
                {dialog.lastMessage &&
                    <div className={styles.lastMessage}>
                        {uid === dialog.lastMessage.fromId && <a style={{ 'marginRight': '5px' }}>You: </a>}
                        <div className={styles.textAndTime}>
                            <p>{dialog.lastMessage.text}</p>
                            <p>{displayTime}</p>
                        </div>
                    </div>}

            </div>
        </div>
    )
}