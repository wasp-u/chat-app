import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "store"
import { signOut } from "store/slices/userSlice"
import styles from 'styles/DialogsWindow.module.scss'

export const DialogsWindow = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state: RootStateType) => state.user.userData)

    const logoutHandler = () => {
        dispatch(signOut())
    }

    return (
        <div className={styles.dialogsWindow}>
            <p>Hello {userData.displayName}</p>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}
