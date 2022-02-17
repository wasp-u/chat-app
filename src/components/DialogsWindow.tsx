import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "store"
import { onSearchUsers, setOpenChatWhit, signOut, startDialogsListening, UserData } from "store/slices/userSlice"
import styles from 'styles/DialogsWindow.module.scss'
import { DialogItem } from "./DialogItem"
import { Settings } from "./Settings"
import { User } from "./User"

type Props = {
    changeActiveChatId: (uid: string | null) => void
}

export const DialogsWindow: React.FC<Props> = ({ changeActiveChatId }) => {
    const dispatch = useDispatch()
    const userData = useSelector((state: RootStateType) => state.user.userData)
    const dialogs = useSelector((state: RootStateType) => state.user.dialogs)
    const searchedUsers = useSelector((state: RootStateType) => state.user.searchedUSers)

    const [searchName, setSearchName] = useState('')
    const [searchResultVisible, setSearchResultVisible] = useState(false)

    const logoutHandler = () => {
        dispatch(signOut())
    }
    const onSearch = async () => {
        setSearchName('')
        dispatch(onSearchUsers(searchName))
        setSearchResultVisible(true)
    }

    const [settingMode, setSettingMode] = useState(false)

    const changeSettingMode = () => {
        setSettingMode(!settingMode)
    }
    const userCardClickHandle = (user: UserData) => {
        dispatch(setOpenChatWhit(user))
        changeActiveChatId(user.uid)
        setSearchResultVisible(false)
    }

    useEffect(() => {
        if (userData.uid) {
            dispatch(startDialogsListening(userData.uid))
        }
    }, [])


    return (
        <div className={styles.dialogsWindow}>
            <div className={styles.dialogsWindowHeader}>
                <p>Hello {userData.displayName}</p>
                <button onClick={logoutHandler}>Logout</button>
                <button onClick={changeSettingMode}>{settingMode ? 'X' : 'Setting'}</button>
            </div>
            {settingMode
                ? <Settings changeSettingMode={changeSettingMode} />
                : <div className={styles.search}>
                    <div className={styles.searchHeader}>
                        <input
                            placeholder="Enter name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <button onClick={onSearch}>Search</button>
                    </div>
                    {searchResultVisible &&
                        <div>
                            <h3>Users:</h3>
                            {searchedUsers.map(user => <User onCLick={userCardClickHandle} key={user.uid} user={user} />)}
                        </div>}
                </div>}

            <div>
                <h3>Dialogs:</h3>
                {dialogs.map(dialog => <DialogItem onCLick={userCardClickHandle} key={dialog.uid} dialog={dialog} />)}
            </div>
            <button className={styles.generalChatButton} onClick={() => changeActiveChatId('GeneralChat')}>open general chat</button>
        </div>
    )
}


