import { Dialog } from 'store/slices/userSlice'
import { DialogItem } from './DialogItem'
import { motion } from 'framer-motion'
import { Empty } from 'antd'

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
    if (dialogs.length !== 0) {
        return (
            <div style={{ overflow: 'auto' }}>
                <h3 style={{ marginBottom: 5 }}>Dialogs:</h3>
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
    } else {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
                <Empty style={{ color: 'gray' }} />
            </div>
        )
    }
}
