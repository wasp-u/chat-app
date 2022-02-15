import { Chat } from 'components/Chat'
import { DialogsWindow } from 'components/DialogsWindow'
import { Settings } from 'components/Settings'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootStateType } from 'store'
import styles from 'styles/HomePage.module.scss'
import './../firebase'

const HomePage = () => {

    const dispatch = useDispatch()
    const [settingMode, setSettingMode] = useState(false)
    const uid = useSelector((state: RootStateType) => state.user.userData.uid)

    const changeSettingMode = () => {
        setSettingMode(!settingMode)
    }

    return (uid
        ? <div className={styles.homePage}>
            <div className={styles.sideBar}>
                {settingMode
                    ? <Settings changeSettingMode={changeSettingMode} />
                    : <DialogsWindow />
                }
                <button onClick={changeSettingMode}>{settingMode ? 'X' : 'Setting'}</button>
            </div>
            <Chat />
        </div>
        : <Navigate to={`/login`} />
    )
}

export default HomePage