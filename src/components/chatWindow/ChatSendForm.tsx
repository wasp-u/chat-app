import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { SendRounded } from '@mui/icons-material'

type ChatSendFormProps = {
    initialValue: string
    deactivateEditMode: () => void
    onSubmit: (newMessage: string) => void
}

export const ChatSendForm: React.FC<ChatSendFormProps> = ({
    onSubmit,
    initialValue,
    deactivateEditMode,
}) => {
    const [value, setValue] = useState(initialValue)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        initialValue && textAreaRef.current?.focus()
    }, [initialValue])

    const onEnterKeyClick = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            value && onSubmit(value)
            setValue('')
        }
    }
    const onSubmitHandle = () => {
        value && onSubmit(value)
        setValue('')
    }

    useEffect(() => {
        if (value === '\n') {
            setValue('')
        }
    }, [value])
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <Box px={4} py={2}>
            <TextField
                inputRef={textAreaRef}
                autoComplete='off'
                id='outlined-basic'
                placeholder='Enter your message...'
                fullWidth
                multiline
                minRows={2}
                maxRows={10}
                onBlur={deactivateEditMode}
                sx={{
                    bgcolor: 'action.selected',
                }}
                size='small'
                value={value}
                onChange={e => setValue(e.target.value)}
                InputProps={{
                    onKeyDown: onEnterKeyClick,
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={onSubmitHandle}>
                                <SendRounded fontSize={'large'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}
