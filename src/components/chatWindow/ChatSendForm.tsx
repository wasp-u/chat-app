import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Box, InputAdornment, styled, TextField } from '@mui/material'
import { SendRounded } from '@mui/icons-material'
import { uploadFile } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'

type ChatSendFormProps = {
    initialValue: string
    deactivateEditMode: () => void
    onSubmit: (newMessage: string) => void
}

const Input = styled('input')({
    display: 'none',
})

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

    const dispatch = useDispatch()
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        dispatch(uploadFile(e.target.files[0]))
        // setSelectedFile(e.target.files[0])
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
        <Box p={2}>
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
                            {/*<label htmlFor='contained-button-file' style={{ height: '35px' }}>*/}
                            {/*    <Input*/}
                            {/*        accept='image/*'*/}
                            {/*        id='contained-button-file'*/}
                            {/*        type='file'*/}
                            {/*        onChange={changeHandler}*/}
                            {/*    />*/}
                            {/*    <AttachFileIcon*/}
                            {/*        fontSize={'large'}*/}
                            {/*        sx={{*/}
                            {/*            '&:hover': {*/}
                            {/*                color: 'text.disabled',*/}
                            {/*                cursor: 'pointer',*/}
                            {/*            },*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*</label>*/}

                            <SendRounded
                                fontSize={'large'}
                                onClick={onSubmitHandle}
                                sx={{
                                    mx: 2,
                                    '&:hover': {
                                        color: 'text.disabled',
                                        cursor: 'pointer',
                                    },
                                }}
                            />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}
