import { Chat } from 'components/Chat'
import { DialogsWindow } from 'components/DialogsWindow'
import { Settings } from 'components/Settings'
import { useAuth } from 'hooks/useAuth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootStateType } from 'store'
import { getUserData, startDataListening } from 'store/slices/userSlice'
import styles from 'styles/HomePage.module.scss'
import './../firebase'

const HomePage = () => {
    const { isAuth } = useAuth()
    const id = useSelector((state: RootStateType) => state.user.userAuthData.id)

    const dispatch = useDispatch()
    const [settingMode, setSettingMode] = useState(false)

    const changeSettingMode = () => {
        setSettingMode(!settingMode)
    }

    useEffect(() => {
        if (id !== null) {
            dispatch(getUserData(id))
        }
        // dispatch(startDataListening())
    }, [id])

    return (isAuth
        ? <div className={styles.homePage}>
            <div>
                <button onClick={changeSettingMode}>Setting</button>
                {settingMode
                    ? <Settings />
                    : <DialogsWindow />
                }
            </div>
            <Chat />
        </div>
        : <Navigate to={`/login`} />
    )
}

export default HomePage