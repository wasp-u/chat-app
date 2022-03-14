import { Chat } from 'components/chatWindow/Chat'
import { EmptyChatPage } from 'components/chatWindow/EmptyChatPage'
import { Loader } from 'components/Loader'
import { SideBar } from 'components/SideBar/SideBar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useSigninCheck } from 'reactfire'
import { setOpenChatWithId, setUserData } from 'store/slices/userSlice'
import styles from 'styles/HomePage.module.scss'
import './../firebase'

const HomePage = () => {
    const { status, data: signInResult } = useSigninCheck()
    let user = signInResult ? signInResult.user : null

    const dispatch = useDispatch()

    useEffect(() => {
        user &&
            dispatch(
                setUserData({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                })
            )
    }, [user, dispatch])

    const [searchParams] = useSearchParams()
    const chatIsOpen = !!searchParams.get('uid')

    useEffect(() => {
        dispatch(setOpenChatWithId(searchParams.get('uid')))
    }, [searchParams, dispatch])

    if (status === 'loading') {
        return <Loader />
    } else if (status === 'success' && user) {
        return (
            <div className={styles.homePage}>
                <SideBar chatIsOpen={chatIsOpen} user={user} />
                {chatIsOpen ? <Chat /> : <EmptyChatPage />}
            </div>
        )
    } else {
        return <Navigate to={`/login`} />
    }
}

export default HomePage
