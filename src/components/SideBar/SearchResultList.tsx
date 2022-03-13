import { Loader } from 'components/Loader'
import { useSelector } from 'react-redux'
import { RootStateType } from 'store'
import { UserData } from 'store/slices/userSlice'
import { User } from './User'
import { motion } from 'framer-motion'
import { CloseOutlined } from '@ant-design/icons'

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
    onItemClick: (user: UserData) => void
    onCloseClick: () => void
}

export const SearchResultList: React.FC<Props> = ({ onItemClick, onCloseClick }) => {
    const searchedUsers = useSelector((state: RootStateType) => state.user.searchedUSers)
    const loadingStatus = useSelector((state: RootStateType) => state.user.dataStatus)

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 10px',
                }}
            >
                <h3>Users:</h3>
                <button
                    style={{ background: 'none', color: '#fff', padding: '0 0 0 30px' }}
                    onClick={onCloseClick}
                >
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 180 }}
                        whileHover={{ scale: 1.2, color: '#C9C9C9' }}
                        transition={{ duration: 0.3 }}
                    >
                        <CloseOutlined />
                    </motion.div>
                </button>
            </div>
            <div>
                {loadingStatus === 'pending' ? (
                    <Loader />
                ) : (
                    searchedUsers.map((user, i) => (
                        <motion.div
                            key={i}
                            initial='hidden'
                            animate='visible'
                            variants={variants}
                            custom={i}
                        >
                            <User onCLick={onItemClick} key={user.uid} user={user} />
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    )
}
