import { Dropdown, Menu } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { DeleteFilled, EllipsisOutlined } from '@ant-design/icons'
import styles from 'styles/Chat.module.scss'
import { Loader } from 'components/Loader'
import { useSelector } from 'react-redux'
import { RootStateType } from 'store'
import { useGetUser } from 'hooks/useGetUser'

type Props = {
    deleteDialogHandle: () => void
}

export const ChatHeader: React.FC<Props> = ({ deleteDialogHandle }) => {
    const withUserId = useSelector((state: RootStateType) => state.user.openChatWithId) as string
    const withUser = useGetUser(withUserId)

    const menu = (
        <Menu style={{ background: '#212121' }}>
            <Menu.Item key='0' danger onClick={deleteDialogHandle}>
                <div style={{ display: 'flex' }}>
                    <DeleteFilled style={{ fontSize: '20px', color: '#aa1d1d' }} />
                    <p style={{ marginLeft: '5px' }}>Delete dialog</p>
                </div>
            </Menu.Item>
        </Menu>
    )
    if (withUser) {
        return (
            <div className={styles.chatHeader}>
                <div className={styles.userInfo}>
                    <div className={styles.chatHeader_userPhoto}>
                        {withUser.photoURL ? (
                            <img
                                style={{ width: 50, borderRadius: '50%' }}
                                src={withUser.photoURL}
                                alt='avatar'
                            />
                        ) : (
                            <Avatar size={50}>
                                {withUser.displayName ? withUser.displayName[0] : 'U'}
                            </Avatar>
                        )}
                    </div>
                    <div>
                        <p>{withUser.displayName}</p>
                    </div>
                </div>
                <Dropdown trigger={['click']} overlay={menu}>
                    <div className={styles.deleteIcon}>
                        <EllipsisOutlined style={{ fontSize: '30px' }} />
                    </div>
                </Dropdown>
            </div>
        )
    } else {
        return <Loader />
    }
}
