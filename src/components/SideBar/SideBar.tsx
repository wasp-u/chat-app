import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "store"
import { onSearchUsers, setOpenChatWith, startDialogsListening, UserData } from "store/slices/userSlice"
import { DialogsList } from "./DialogsList"
import { Search } from "./Search"
import { SearchResultList } from "./SearchResultList"
import { Settings } from "./Settings"
import styles from 'styles/SideBar.module.scss'
import { SideBarHeader } from "./SideBarHeader"

type Props = {
    changeActiveChatId: (uid: string) => void
}

export const SideBar: React.FC<Props> = ({ changeActiveChatId }) => {
    const dispatch = useDispatch()

    const userData = useSelector((state: RootStateType) => state.user.userData)

    const [settingMode, setSettingMode] = useState(false)
    const [searchMode, setSearchMode] = useState(false)

    const changeSettingMode = () => {
        setSettingMode(!settingMode)
    }

    const onSearch = (searchedValue: string) => {
        dispatch(onSearchUsers(searchedValue));
        setSearchMode(true)
    }

    useEffect(() => {
        if (userData.uid) {
            dispatch(startDialogsListening(userData.uid))
        }
    }, [dispatch])

    const openChat = (user: UserData) => {
        dispatch(setOpenChatWith(user));
        changeActiveChatId(user.uid);
    }
    const onSearchResultItemClick = (user: UserData) => {
        openChat(user)
        setSearchMode(false)
    }

    const onOpenGeneralChat = () => {
        changeActiveChatId('GeneralChat');
    }

    return (
        <div className={styles.dialogsWindow}>
            <SideBarHeader userName={userData.displayName} settingMode={settingMode} changeSettingMode={changeSettingMode} />
            {settingMode
                ? <Settings changeSettingMode={changeSettingMode} />
                : <div>
                    <Search onSearch={onSearch} />
                    {searchMode
                        ? <SearchResultList onItemClick={onSearchResultItemClick} onCloseClick={() => setSearchMode(false)} />
                        : <DialogsList onItemClick={openChat} onOpenGeneralChat={onOpenGeneralChat} />
                    }
                </div>}
        </div>
    )
}

