import React from 'react'
import { RootStateType } from 'store'
import { useSelector } from 'react-redux'
import { Dialog, UserData } from 'store/slices/userSlice'
import { Loader } from 'common/Loader'
import { DialogItem } from './DialogItem'
import { motion } from 'framer-motion'
import { Stack, Typography } from '@mui/material'
import NoData from '../../common/NoData'

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

type DialogsListProps = {
    dialogs: Dialog[]
    status: 'loading' | 'success' | 'error'
    onItemClick: (user: UserData, dialogId: string) => void
}

export const DialogsList: React.FC<DialogsListProps> = React.memo(function DialogsList({
    dialogs,
    status,
    onItemClick,
}) {
    const activeDialogId = useSelector(
        (state: RootStateType) => state.user.openChat?.withUser.uid
    ) as string

    if (status === 'loading') {
        return <Loader />
    }
    if (dialogs && dialogs.length !== 0) {
        return (
            <Stack overflow={'scroll'}>
                <Typography color='text.primary' my={2}>
                    Dialogs:
                </Typography>
                {dialogs.map((dialog, index) => (
                    <motion.div
                        key={dialog.id}
                        initial='hidden'
                        animate='visible'
                        variants={variants}
                        custom={index}>
                        <DialogItem
                            isActive={dialog.usersIdInDialog.includes(activeDialogId)}
                            onCLick={onItemClick}
                            key={dialog.id}
                            dialog={dialog}
                        />
                    </motion.div>
                ))}
            </Stack>
        )
    } else {
        return <NoData />
    }
})
