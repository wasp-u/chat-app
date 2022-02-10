import { useSelector } from 'react-redux'
import { RootStateType } from 'store'
import styles from 'styles/Chat.module.scss'

type Props = {
    text: string
    fromId: string
    fromName: string
}

export const Message: React.FC<Props> = ({ text, fromId, fromName }) => {

    const id = useSelector((state: RootStateType) => state.user.userAuthData.id) as string

    return (
        <div className={styles.message} style={fromId == id ? { background: 'green' } : { background: 'red' }}>
            <div>
                {fromName}
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}
