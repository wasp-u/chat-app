import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from 'store'
import {
    Box,
    CircularProgress,
    IconButton,
    InputAdornment,
    LinearProgress,
    LinearProgressProps,
    Stack,
    styled,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { updateUserInfo, uploadFile, UserData } from '../../../store/slices/appSlice'
import { Close, Save } from '@mui/icons-material'
import Compressor from 'compressorjs'
import UserAvatar from '../../../common/UserAvatar'

const Input = styled('input')({
    display: 'none',
})

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant='determinate' {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant='body2' color='text.secondary'>{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    )
}

type Props = {}
export const Settings: React.FC<Props> = () => {
    const user = useSelector((state: RootStateType) => state.app.userData) as UserData
    const uploadStatus = useSelector((state: RootStateType) => state.app.uploadFileStatus)
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false)
    const [newFullName, setNewFullName] = useState(user.displayName)
    const [isLoading, setIsLoading] = useState(false)

    // const [selectedFile, setSelectedFile] = useState<File | null>(null)
    // const [isFilePicked, setIsFilePicked] = useState(false)
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0]
        if (!file) {
            return
        }
        new Compressor(file, {
            quality: 0.9,
            resize: 'cover',
            height: 600,
            width: 600,
            success(result: File) {
                // setSelectedFile(result)
                dispatch(uploadFile(result))
            },
            error(err) {
                console.log(err.message)
            },
        })
    }

    const saveFullNameHandler = async () => {
        if (newFullName !== user.displayName && newFullName) {
            setIsLoading(true)
            await dispatch(updateUserInfo(newFullName))
            setIsLoading(false)
            setIsEditing(false)
        }
    }

    return (
        <Stack alignItems={'center'} spacing={2}>
            <label htmlFor='contained-button-file'>
                <Input
                    accept='image/*'
                    id='contained-button-file'
                    type='file'
                    onChange={changeHandler}
                />
                <Tooltip title={'Change user photo'} placement={'right'}>
                    <UserAvatar
                        displayName={user.displayName}
                        photoURL={user.photoURL}
                        size={200}
                    />
                </Tooltip>
            </label>
            {/*<LinearProgressWithLabel value={uploadStatus} />*/}
            {isEditing ? (
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <TextField
                        autoComplete='off'
                        value={newFullName}
                        autoFocus
                        size={'small'}
                        sx={{
                            bgcolor: 'action.selected',
                        }}
                        // onBlur={() => setIsEditing(false)}
                        onChange={e => setNewFullName(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={saveFullNameHandler}>
                                        <Save />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {isLoading ? (
                        <CircularProgress size={30} />
                    ) : (
                        <IconButton onClick={() => setIsEditing(false)}>
                            <Close />
                        </IconButton>
                    )}
                </Stack>
            ) : (
                <Tooltip title={'Change full name'} arrow>
                    <Typography
                        variant={'h3'}
                        color='text.primary'
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                        onClick={() => setIsEditing(true)}>
                        {user.displayName}
                    </Typography>
                </Tooltip>
            )}
        </Stack>
    )
}
