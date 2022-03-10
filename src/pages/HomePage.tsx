import { Chat } from 'components/chatWindow/Chat'
import { EmptyChatPage } from 'components/chatWindow/EmptyChatPage'
import { SideBar } from 'components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useSearchParams } from 'react-router-dom'
import { RootStateType } from 'store'
import { getAuthUser } from 'store/slices/userSlice'
import styles from 'styles/HomePage.module.scss'
import './../firebase'

type QueryString = {
    uid?: string
}

const HomePage = () => {

    const uid = useSelector((state: RootStateType) => state.user.userData.uid)
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeChatId, setActiveChatId] = useState('' as string | null)
    const dispatch = useDispatch()

    useEffect(() => {
        const query: QueryString = {}
        if (activeChatId) {
            query.uid = activeChatId
        }
        setSearchParams(query)
    }, [activeChatId, setSearchParams])

    useEffect(() => {
        dispatch(getAuthUser())
    }, [dispatch])

    const changeActiveChatId = (uid: string | null) => {
        setActiveChatId(uid)
    }

    return (uid
        ? <div className={styles.homePage}>
            <SideBar changeActiveChatId={changeActiveChatId} />
            {searchParams.get('uid')
                ? <Chat withUID={activeChatId} />
                : <EmptyChatPage />
            }
        </div>
        : <Navigate to={`/login`} />
    )
}

export default HomePage



