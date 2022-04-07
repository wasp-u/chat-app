import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { UserData } from '../../../store/slices/appSlice'
import UserAvatar from '../../../common/UserAvatar'

type Props = {
    anchorEl: null | HTMLElement
    open: boolean
    user: UserData
    handleClose: () => void
    logoutHandleClick: () => void
    settingsHandleClick: () => void
}
export const AccountMenu: React.FC<Props> = ({
    anchorEl,
    open,
    user,
    handleClose,
    logoutHandleClick,
    settingsHandleClick,
}) => {
    return (
        <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.42))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 23,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <MenuItem>
                <UserAvatar displayName={user.displayName} photoURL={user.photoURL} />
                {user.displayName}
            </MenuItem>
            <Divider />
            <MenuItem onClick={settingsHandleClick}>
                <ListItemIcon>
                    <Settings fontSize='small' />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={logoutHandleClick}>
                <ListItemIcon>
                    <Logout fontSize='small' color={'error'} />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    )
}
