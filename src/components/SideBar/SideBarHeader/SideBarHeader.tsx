import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'reactfire'
import { removeUser, setOpenChat } from 'store/slices/appSlice'
import { Grid, IconButton, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AccountMenu } from './AccountMenu'
import { Search } from './Search'
import { RootStateType } from '../../../store'

type SideBarHeaderProps = {
    settingMode: boolean
    changeSettingMode: () => void
    onSearch: (searchedValue: string) => void
}

export const SideBarHeader: React.FC<SideBarHeaderProps> = ({
    settingMode,
    changeSettingMode,
    onSearch,
}) => {
    const auth = useAuth()
    const user = useSelector((state: RootStateType) => state.app.userData)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const dispatch = useDispatch()

    const signOut = async () => {
        await auth.signOut()
        dispatch(setOpenChat(null))
        dispatch(removeUser())
    }

    return (
        <Grid container spacing={2} alignItems='center' wrap={'nowrap'}>
            <Grid item>
                {!settingMode ? (
                    <Tooltip title='Account settings'>
                        <IconButton
                            onClick={handleClick}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}>
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title='back'>
                        <IconButton onClick={changeSettingMode}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Grid>
            <Grid item xs>
                <Search onSearch={onSearch} />
            </Grid>
            {user && (
                <AccountMenu
                    open={open}
                    user={user}
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    logoutHandleClick={signOut}
                    settingsHandleClick={changeSettingMode}
                />
            )}
        </Grid>
    )
}
