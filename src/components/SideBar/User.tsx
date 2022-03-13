import Avatar from 'antd/lib/avatar/avatar'
import {UserData} from 'store/slices/userSlice'
import styles from 'styles/User.module.scss'

type UserProps = {
    user: UserData
    onCLick: (user: UserData) => void
}

export const User: React.FC<UserProps> = ({user, onCLick}) => {
    return (
        <div className={styles.userCard} onClick={() => onCLick(user)}>
            <div className={styles.profilePhoto}>
                {user.photoURL ? (
                    <img
                        style={{width: 40, borderRadius: '50%'}}
                        src={user.photoURL}
                        alt='avatar'
                    />
                ) : (
                    <Avatar size={40}>{user.displayName ? user.displayName[0] : 'U'}</Avatar>
                )}
            </div>
            <div>
                <p>{user.displayName}</p>
                <p>{user.email}</p>
            </div>
        </div>
    )
}
