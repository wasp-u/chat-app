import styles from 'styles/HomePage.module.scss'
import empty_chat_icon from 'icons/empty_messages.svg'
import {motion} from 'framer-motion'

const variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
}

export const EmptyChatPage = () => {
    return (
        <motion.div
            initial='hidden'
            animate='visible'
            transition={{duration: 0.5}}
            variants={variants}
            className={styles.empty_message}
        >
            <img src={empty_chat_icon} alt='' />
            <p>Choose a chat room</p>
        </motion.div>
    )
}
