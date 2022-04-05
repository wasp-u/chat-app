import { Avatar, Grid, IconButton, Tooltip, Typography, Zoom } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { UserData } from '../../store/slices/userSlice'

type Props = {
    withUser: UserData
    deleteDialogHandle: () => void
}

export const ChatHeader: React.FC<Props> = ({ deleteDialogHandle, withUser }) => {
    const lastVisit = new Date(withUser.status.last_changed)
    return (
        <Grid
            container
            alignItems={'center'}
            borderRadius={'8px 8px 0 0'}
            py={2}
            bgcolor={'action.selected'}>
            <Grid item mr={2}>
                {withUser.photoURL ? (
                    <Avatar
                        sx={{ width: 56, height: 56, justifyContent: 'center', ml: 4 }}
                        alt='user'
                        src={withUser.photoURL}
                    />
                ) : (
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            justifyContent: 'center',
                            ml: 4,
                        }}>
                        {withUser.displayName ? withUser.displayName[0] : 'U'}
                    </Avatar>
                )}
            </Grid>
            <Grid item xs>
                <Typography variant='body1'>{withUser.displayName}</Typography>
                {withUser.status.state === 'online' ? (
                    <Typography variant='caption' color={'success.main'}>
                        online
                    </Typography>
                ) : (
                    <Typography variant='caption'>
                        last visit:{' '}
                        {lastVisit.toDateString() + ' ' + lastVisit.toLocaleTimeString()}
                    </Typography>
                )}
            </Grid>
            <Grid item>
                <IconButton onClick={deleteDialogHandle}>
                    <Tooltip title='Delete dialog' TransitionComponent={Zoom} arrow>
                        <Delete color={'error'} />
                    </Tooltip>
                </IconButton>
            </Grid>
        </Grid>
    )
}
