import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    LoadingType,
    onSearchUsers,
    setDialogs,
    setOpenChat,
    setUserData,
    UserData,
} from 'store/slices/userSlice'
import { DialogsList } from './DialogsList'
import { SearchResultList } from './SearchResultList'
import { Settings } from './Settings'
import { SideBarHeader } from './SideBarHeader'
import { useGetUserDialogs } from 'hooks/useGetUserDialogs'
import { Stack } from '@mui/material'
import { Loader } from '../../common/Loader'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import Divider from '@mui/material/Divider'

type Props = {
    uid: string
}

export const SideBar: React.FC<Props> = ({ uid }) => {
    const dispatch = useDispatch()

    const [settingsVisible, setSettingsVisible] = useState(false)
    const [searchResultVisible, setSearchResultVisible] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState<LoadingType>('success')
    const dialogsListVisible = !settingsVisible && !searchResultVisible

    const { status, dialogs } = useGetUserDialogs(uid)
    const { user } = useGetUserInfo(uid)

    useEffect(() => {
        user && dispatch(setUserData(user))
    }, [user])

    useEffect(() => {
        dispatch(setDialogs(dialogs))
    }, [dispatch, dialogs])

    const changeSettingMode = () => {
        setSettingsVisible(!settingsVisible)
        searchResultVisible && setSearchResultVisible(false)
    }

    const onSearch = async (searchedValue: string) => {
        setLoadingStatus('loading')
        setSearchResultVisible(true)
        settingsVisible && setSettingsVisible(false)
        await dispatch(onSearchUsers(searchedValue))
        setLoadingStatus('success')
    }

    const onSearchResultItemClick = (user: UserData) => {
        dispatch(setOpenChat({ withUser: user, dialogId: `${uid}&${user.uid}` }))
        setSearchResultVisible(false)
    }

    if (!user) {
        return <Loader />
    }
    return (
        <Stack
            direction='column'
            justifyContent='flex-start'
            alignItems='stretch'
            spacing={4}
            sx={{
                bgcolor: 'background.paper',
                my: 2,
                p: 3,
                height: 'calc(100vh - 16px)',
                borderRadius: 4,
            }}>
            <SideBarHeader
                onSearch={onSearch}
                settingMode={settingsVisible}
                changeSettingMode={changeSettingMode}
            />
            <Divider />
            {searchResultVisible && (
                <SearchResultList
                    loadingStatus={loadingStatus}
                    onItemClick={onSearchResultItemClick}
                    onCloseClick={() => setSearchResultVisible(false)}
                />
            )}
            {settingsVisible && <Settings />}
            {dialogsListVisible && (
                <DialogsList
                    status={status}
                    dialogs={dialogs}
                    onItemClick={(user: UserData, dialogId: string) => {
                        dispatch(setOpenChat({ withUser: user, dialogId: dialogId }))
                    }}
                />
            )}
        </Stack>
    )
}
