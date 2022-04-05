import { Avatar, Badge, Chip, Grid, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootStateType } from 'store'
import { Dialog, UserData } from 'store/slices/userSlice'
import { useGetDialogInfo } from '../../hooks/useGetDialogInfo'

type Props = {
    isActive: boolean
    dialog: Dialog
    onCLick: (user: UserData, dialogId: string) => void
}

export const DialogItem: React.FC<Props> = React.memo(function DialogItem({
    dialog,
    isActive,
    onCLick,
}) {
    const uid = useSelector((state: RootStateType) => state.user.userData?.uid) as string

    const { dialogWithUser, dialogLastMessage } = useGetDialogInfo(dialog)
    const status = dialogWithUser?.status.state

    const newMessagesCount = (dialog.newMessagesCount && dialog.newMessagesCount[uid]) || 0
    let displayTime = ''
    let isMyMessage = false

    if (dialogLastMessage) {
        const sendLastMessageTime = new Date(dialogLastMessage.time)
        const time = sendLastMessageTime.toString().split(' ')[4].split(':')
        displayTime = time[0] + ':' + time[1]
        isMyMessage = uid === dialogLastMessage.fromId
    }
    if (!dialogWithUser || !dialogLastMessage) {
        return (
            <Grid container p={2}>
                <Grid item mr={2}>
                    <Skeleton>
                        <Avatar />
                    </Skeleton>
                </Grid>
                <Grid item xs>
                    <Skeleton />
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid
            container
            wrap={'nowrap'}
            alignItems={'center'}
            sx={{
                p: 2,
                borderRadius: 2,
                overflow: 'hidden',
                '&:hover': {
                    bgcolor: 'action.hover',
                    cursor: 'pointer',
                },
            }}
            bgcolor={isActive ? 'action.selected' : ''}
            onClick={() => onCLick(dialogWithUser, dialog.id)}>
            <Badge
                color='success'
                overlap='circular'
                variant={'dot'}
                invisible={status !== 'online'}>
                <Grid item mr={2}>
                    {!!dialogWithUser.photoURL ? (
                        <Avatar alt='user' src={dialogWithUser.photoURL} />
                    ) : (
                        <Avatar>
                            {dialogWithUser.displayName ? dialogWithUser.displayName[0] : 'U'}
                        </Avatar>
                    )}
                </Grid>
            </Badge>
            <Grid item xs zeroMinWidth>
                <Typography color='text.primary'>{dialogWithUser.displayName}</Typography>
                <Stack direction='row' spacing={1}>
                    {isMyMessage && (
                        <Typography color='text.disabled' variant={'body2'}>
                            You:
                        </Typography>
                    )}
                    <Typography noWrap variant={'body2'} color='text.primary'>
                        {dialogLastMessage.text}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item>
                <Stack alignItems={'flex-end'}>
                    <Typography variant={'body2'} color='text.primary'>
                        {displayTime}
                    </Typography>
                    {newMessagesCount > 0 && (
                        <Chip
                            label={`${newMessagesCount} new`}
                            color={'info'}
                            sx={{
                                height: '100%',
                                borderRadius: 1.5,
                                span: {
                                    px: 1.5,
                                },
                            }}
                        />
                    )}
                </Stack>
            </Grid>
        </Grid>
    )
})
