import { Dialog } from 'store/slices/userSlice'
import styles from 'styles/SideBar.module.scss'
import { DialogItem } from './DialogItem'
import { motion } from 'framer-motion'

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
    activeDialogId: string
    onItemClick: (uid: string) => void
}

export const DialogsList: React.FC<DialogsListProps> = ({
    onItemClick,
    dialogs,
    activeDialogId,
}) => {
    return (
        <div>
            <h3>Dialogs:</h3>
            {dialogs.map((dialog, index) => (
                <motion.div
                    key={dialog.uid}
                    initial='hidden'
                    animate='visible'
                    variants={variants}
                    custom={index}
                >
                    <DialogItem
                        isActive={activeDialogId === dialog.uid}
                        onCLick={onItemClick}
                        key={dialog.uid}
                        dialog={dialog}
                    />
                </motion.div>
            ))}
        </div>
    )
}
