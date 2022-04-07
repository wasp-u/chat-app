import { Stack, Typography } from '@mui/material'
import { UserData } from 'store/slices/appSlice'
import UserAvatar from '../../../common/UserAvatar'
import React from 'react'

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
            <UserAvatar
                displayName={user.displayName}
                photoURL={user.photoURL}
                status={user.status.state}
            />
            <Stack>
                <Typography color='text.primary'>{user.displayName}</Typography>
                <Typography color='text.primary' variant={'body2'}>
                    {user.email}
                </Typography>
            </Stack>
        </Stack>
    )
}
