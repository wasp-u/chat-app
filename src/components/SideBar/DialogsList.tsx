import {Dialog} from 'store/slices/userSlice'
import styles from 'styles/SideBar.module.scss'
import {DialogItem} from './DialogItem'
import {motion} from 'framer-motion'

const variants = {
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.1,
        },
    }),
    hidden: {opacity: 0, x: -100},
}

type DialogsListProps = {
    dialogs: Dialog[]
    onItemClick: (uid: string) => void
}

export const DialogsList: React.FC<DialogsListProps> = ({onItemClick, dialogs}) => {
    return (
        <div>
            <h3>Dialogs:</h3>
            <motion.button
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.2}}
                className={styles.generalChatButton}
                onClick={() => onItemClick('GeneralChat')}
            >
                General chat
            </motion.button>
            {dialogs.map((dialog, index) => (
                <motion.div
                    key={dialog.uid}
                    initial='hidden'
                    animate='visible'
                    variants={variants}
                    custom={index}
                >
                    <DialogItem onCLick={onItemClick} key={dialog.uid} dialog={dialog} />
                </motion.div>
            ))}
        </div>
    )
}
