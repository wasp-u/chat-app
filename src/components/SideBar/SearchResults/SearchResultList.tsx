import { Loader } from 'common/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from 'store'
import { LoadingType, setSearchedUsers, UserData } from 'store/slices/appSlice'
import { User } from './User'
import { motion } from 'framer-motion'
import { Close } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import NoData from '../../../common/NoData'

const variants = {
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.1,
        },
    }),
    hidden: { opacity: 0, x: -100 },
}

type Props = {
    loadingStatus: LoadingType
    onItemClick: (user: UserData) => void
    onCloseClick: () => void
}

export const SearchResultList: React.FC<Props> = ({ loadingStatus, onItemClick, onCloseClick }) => {
    const searchedUsers = useSelector((state: RootStateType) => state.app.searchedUsers)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(setSearchedUsers([]))
        }
    }, [dispatch])

    if (loadingStatus === 'loading') return <Loader />
    if (searchedUsers.length === 0) return <NoData />

    return (
        <Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography color='text.primary'>Users:</Typography>
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}>
                    <IconButton onClick={onCloseClick}>
                        <Close />
                    </IconButton>
                </motion.div>
            </Stack>
            <Stack>
                {searchedUsers.map((user, i) => (
                    <motion.div
                        key={i}
                        initial='hidden'
                        animate='visible'
                        variants={variants}
                        custom={i}>
                        <User onCLick={onItemClick} key={user.uid} user={user} />
                    </motion.div>
                ))}
            </Stack>
        </Stack>
    )
}
