import { Chip, Grid, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootStateType } from 'store'
import { Dialog, UserData } from 'store/slices/appSlice'
import { useGetDialogInfo } from '../../../hooks/useGetDialogInfo'
import UserAvatar from '../../../common/UserAvatar'
import { getDisplayTime } from '../../../common/getDisplayTime'

type Props = {
    isActive: boolean
    dialog: Dialog
    onCLick: (user: UserData, dialogId: string) => void
}

export const DialogItem: React.FC<Props> = React.memo(({ dialog, isActive, onCLick }) => {
    const uid = useSelector((state: RootStateType) => state.app.userData?.uid) as string

    const { dialogWithUser, dialogLastMessage } = useGetDialogInfo(dialog)
    const status = dialogWithUser?.status.state

    const newMessagesCount = dialog.newMessagesCount[uid] || 0
    const isMyMessage = uid === dialogLastMessage?.fromId

    const sendTime = dialogLastMessage?.time ? getDisplayTime(dialogLastMessage?.time) : ''

    if (!dialogWithUser || !dialogLastMessage) {
        return (
            <Grid container p={2}>
                <Grid item mr={2}>
                    <Skeleton variant='circular' width={40} height={40} />
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
            <Grid item mr={2}>
                <UserAvatar
                    displayName={dialogWithUser.displayName}
                    photoURL={dialogWithUser.photoURL}
                    status={status}
                />
            </Grid>
            <Grid item xs zeroMinWidth>
                <Typography color='text.primary' noWrap>
                    {dialogWithUser.displayName}
                </Typography>
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
                        {sendTime}
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
