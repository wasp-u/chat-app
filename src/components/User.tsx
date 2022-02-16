import Avatar from "antd/lib/avatar/avatar"
import { UserData } from "store/slices/userSlice"
import styles from 'styles/User.module.scss'

type UserProps = {
    user: {
        displayName: string | null,
        email: string | null,
        photoURL: string | null,
        uid: string | null,
    }
    onCLick: (uid: string | null) => void
}

export const User: React.FC<UserProps> = ({ user, onCLick }) => {
    return (
        <div className={styles.userCard} onClick={() => onCLick(user.uid)}>
            <div className={styles.profilePhoto}>
                {user.photoURL
                    ? <img
                        style={{ 'width': 40, 'borderRadius': '50%' }}
                        src={user.photoURL}
                    />
                    : <Avatar size={40}>{user.displayName ? user.displayName[0] : 'U'}</Avatar>
                }
            </div>
            <div>
                <p>{user.displayName}</p>
                <p>{user.email}</p>
            </div>
        </div>
    )
}