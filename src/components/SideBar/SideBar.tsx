import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from 'store'
import {onSearchUsers, setDialogs, setOpenChatWithId, UserData} from 'store/slices/userSlice'
import {DialogsList} from './DialogsList'
import {Search} from './Search'
import {SearchResultList} from './SearchResultList'
import {Settings} from './Settings'
import {SideBarHeader} from './SideBarHeader'
import {useGetUserDialogs} from 'hooks/useGetUserDialogs'
import {useSearchParams} from 'react-router-dom'
import {Loader} from 'components/Loader'
import styles from 'styles/SideBar.module.scss'
import {User} from 'firebase/auth'

type Props = {
    user: User
}

export const SideBar: React.FC<Props> = React.memo(function SideBar({user}) {
    const dispatch = useDispatch()

    const userData = user
    const {dialogsLoadingStatus, dialogs} = useGetUserDialogs(userData.uid)
    useEffect(() => {
        dialogs && dispatch(setDialogs(dialogs))
    }, [dialogs, dispatch])

    const [settingsVisible, setSettingsVisible] = useState(false)
    const [searchResultVisible, setSearchResultVisible] = useState(false)
    const dialogsListVisible = !settingsVisible && !searchResultVisible

    const changeSettingMode = () => {
        setSettingsVisible(!settingsVisible)
    }

    const onSearch = (searchedValue: string) => {
        dispatch(onSearchUsers(searchedValue))
        setSearchResultVisible(true)
    }

    const setSearchParams = useSearchParams()[1]
    const openChat = (uid: string) => {
        setSearchParams({uid})
        dispatch(setOpenChatWithId(uid))
    }

    const onSearchResultItemClick = (user: UserData) => {
        openChat(user.uid)
        setSearchResultVisible(false)
    }

    return (
        <div className={styles.dialogsWindow}>
            <SideBarHeader
                userName={userData.displayName}
                settingMode={settingsVisible}
                changeSettingMode={changeSettingMode}
            />
            <Search onSearch={onSearch} />
            {searchResultVisible && (
                <SearchResultList
                    onItemClick={onSearchResultItemClick}
                    onCloseClick={() => setSearchResultVisible(false)}
                />
            )}
            {settingsVisible && <Settings changeSettingMode={changeSettingMode} />}
            {dialogsListVisible &&
                (dialogsLoadingStatus === 'success' ? (
                    <DialogsList dialogs={dialogs} onItemClick={openChat} />
                ) : (
                    <Loader />
                ))}
        </div>
    )
})
