import { Chat } from 'components/Chat'
import { DialogsWindow } from 'components/DialogsWindow'
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

    // const dispatch = useDispatch()
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
    }, [activeChatId])

    useEffect(() => {
        if (uid !== null) {
            dispatch(getAuthUser())
        }
    }, [])

    const changeActiveChatId = (uid: string | null) => {
        setActiveChatId(uid)
    }

    return (uid
        ? <div className={styles.homePage}>
            <DialogsWindow changeActiveChatId={changeActiveChatId} />
            {searchParams.get('uid')
                ? <Chat withUID={activeChatId} />
                : <div>Empty Chat</div>
            }
        </div>
        : <Navigate to={`/login`} />
    )
}

export default HomePage