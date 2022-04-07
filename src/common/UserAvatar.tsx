import React from 'react'
import { Avatar, Badge } from '@mui/material'

type Props = {
    displayName: string | null
    photoURL?: string | null
    status?: 'online' | 'offline'
    size?: number
}

const UserAvatar: React.FC<Props> = ({ displayName, photoURL, status, size = 45 }) => {
    return (
        <Badge color='success' overlap='circular' variant={'dot'} invisible={status !== 'online'}>
            {photoURL ? (
                <Avatar
                    alt='user'
                    src={photoURL}
                    sx={{
                        height: size,
                        width: size,
                    }}
                />
            ) : (
                <Avatar
                    sx={{
                        height: size,
                        width: size,
                    }}>
                    {displayName ? displayName[0] : 'U'}
                </Avatar>
            )}
        </Badge>
    )
}

export default UserAvatar
