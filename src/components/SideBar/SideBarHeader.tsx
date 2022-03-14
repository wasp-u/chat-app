import { useDispatch } from 'react-redux'
import { useAuth } from 'reactfire'
import { removeUser } from 'store/slices/userSlice'
import styles from 'styles/SideBar.module.scss'

type SideBarHeaderProps = {
    userName: string | null
    settingMode: boolean
    changeSettingMode: () => void
}

export const SideBarHeader: React.FC<SideBarHeaderProps> = ({
    userName,
    settingMode,
    changeSettingMode,
}) => {
    const auth = useAuth()
    const dispatch = useDispatch()
    const signOut = (auth: any) => auth.signOut().then(() => dispatch(removeUser()))

    return (
        <div className={styles.sideBarHeader}>
            <p>Hello {userName}</p>
            <button onClick={() => signOut(auth)}>Logout</button>
            <button disabled onClick={changeSettingMode}>
                {settingMode ? 'X' : 'Setting'}
            </button>
        </div>
    )
}
