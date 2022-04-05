import { useDispatch } from 'react-redux'
import { useAuth } from 'reactfire'
import { removeUser, setOpenChat } from 'store/slices/userSlice'
import { Button, Grid, Typography } from '@mui/material'

type SideBarHeaderProps = {
    displayName: string
    settingMode: boolean
    changeSettingMode: () => void
}

export const SideBarHeader: React.FC<SideBarHeaderProps> = ({
    settingMode,
    changeSettingMode,
    displayName,
}) => {
    const auth = useAuth()
    const dispatch = useDispatch()

    const signOut = async () => {
        await auth.signOut()
        dispatch(setOpenChat(null))
        dispatch(removeUser())
    }

    return (
        <Grid container spacing={2} alignItems='center'>
            <Grid item xs={6}>
                <Typography color='text.primary' noWrap>
                    Hello {displayName}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Button
                    disableElevation
                    fullWidth
                    size='small'
                    variant='contained'
                    onClick={signOut}>
                    Logout
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    disableElevation
                    fullWidth
                    size='small'
                    variant='contained'
                    disabled
                    onClick={changeSettingMode}>
                    {settingMode ? 'X' : 'Setting'}
                </Button>
            </Grid>
        </Grid>
    )
}
