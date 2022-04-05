import { Avatar, Stack, Typography } from '@mui/material'
import { UserData } from 'store/slices/userSlice'

type UserProps = {
    user: UserData
    onCLick: (user: UserData) => void
}

export const User: React.FC<UserProps> = ({ user, onCLick }) => {
    return (
        <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            sx={{
                p: 2,
                borderRadius: 2,
                '&:hover': {
                    bgcolor: 'action.hover',
                    cursor: 'pointer',
                },
            }}
            onClick={() => onCLick(user)}>
            {user.photoURL ? (
                <Avatar alt='user' src={user.photoURL} />
            ) : (
                <Avatar>{user.displayName ? user.displayName[0] : 'U'}</Avatar>
            )}
            <Stack>
                <Typography color='text.primary'>{user.displayName}</Typography>
                <Typography color='text.primary' variant={'body2'}>
                    {user.email}
                </Typography>
            </Stack>
        </Stack>
    )
}
