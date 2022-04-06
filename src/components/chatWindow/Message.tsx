import React, { useEffect, useState } from 'react'
import { MessageType } from 'store/slices/userSlice'
import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material'
import { Delete, Done, DoneAll, Edit } from '@mui/icons-material'

type Props = {
    message: MessageType
    isEditing: boolean
    isMyMessage: boolean
    onEditHandle: (messageText: string, messageId: string) => void
    deleteHandler: (messageId: string) => void
    messageViewedToggleHandler: (messageId: string) => void
}

//TODO: add delete access window

export const Message: React.FC<Props> = React.memo(
    ({
        isEditing,
        isMyMessage,
        message,
        onEditHandle,
        deleteHandler,
        messageViewedToggleHandler,
    }) => {
        const sendTime = new Date(message.time)
        const time = sendTime.toString().split(' ')[4].split(':')
        const displayTime = time[0] + ':' + time[1]

        const [isMessageHover, setIsMessageHover] = useState(false)

        const onMessageHover = () => {
            setIsMessageHover(true)
        }
        const onMessageHoverLeave = () => {
            setIsMessageHover(false)
        }

        useEffect(() => {
            !isMyMessage && !message.viewed && messageViewedToggleHandler(message.id)
        }, [])

        return (
            <Box
                sx={[
                    {
                        maxWidth: 'min(40vw,500px)',
                        mt: 2,
                        borderRadius: 4,
                        p: 2,
                        textAlign: 'justify',
                        backgroundImage:
                            'linear-gradient(0deg, rgba(36,255,188,0.5) 0%, rgba(219,136,255,0.6) 100%)',
                        backgroundSize: '100vw 100vh',
                        backgroundPositionY: '100vh',
                        backgroundAttachment: 'fixed',
                    },
                    isMyMessage && {
                        ml: 'auto',
                        borderBottomRightRadius: 0,
                    },
                    !isMyMessage && {
                        mr: 'auto',
                        borderBottomLeftRadius: 0,
                    },
                    isEditing && {
                        bgcolor: 'action.selected',
                        backgroundImage: 'none',
                        opacity: 0.4,
                        border: '1px dashed black',
                    },
                ]}
                onMouseEnter={onMessageHover}
                onMouseLeave={onMessageHoverLeave}>
                <Grid container spacing={1} justifyContent={'flex-end'} alignItems={'flex-end'}>
                    <Grid item xs component={Typography} sx={{ overflowWrap: 'break-word' }}>
                        {message.text}
                    </Grid>
                    {!isMessageHover ? (
                        <Grid item xs={1} component={Stack} justifyContent={'flex-end'}>
                            {message.edited && (
                                <Typography variant={'caption'} mr={1} color={'text.disabled'}>
                                    edited
                                </Typography>
                            )}
                            {isMyMessage &&
                                (message.viewed ? (
                                    <DoneAll fontSize={'small'} />
                                ) : (
                                    <Done fontSize={'small'} />
                                ))}
                            <Typography variant={'caption'}>{displayTime}</Typography>
                        </Grid>
                    ) : (
                        <Grid item xs={1}>
                            <Stack direction={'row'} spacing={0.5} justifyContent={'flex-end'}>
                                {isMyMessage && (
                                    <Tooltip title='Edit message' arrow>
                                        <Edit
                                            fontSize={'small'}
                                            onClick={() => onEditHandle(message.text, message.id)}
                                            sx={{
                                                '&:hover': {
                                                    cursor: 'pointer',
                                                },
                                            }}
                                        />
                                    </Tooltip>
                                )}
                                <Tooltip title='Delete' arrow>
                                    <Delete
                                        sx={{
                                            '&:hover': {
                                                cursor: 'pointer',
                                            },
                                        }}
                                        color={'error'}
                                        fontSize={'small'}
                                        onClick={() => deleteHandler(message.id)}
                                    />
                                </Tooltip>
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            </Box>
        )
    }
)
