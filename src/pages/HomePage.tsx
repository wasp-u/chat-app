import { Loader } from 'common/Loader'
import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useSigninCheck } from 'reactfire'
import { RootStateType } from 'store'
import { onlineStatusToggle, setOfflineStatus } from 'store/slices/appSlice'
import './../firebase'
import { Box, Container, Grid } from '@mui/material'
import { SideBar } from '../components/SideBar/SideBar'
import { EmptyChatPage } from '../components/Chat/EmptyChatPage'

const Chat = React.lazy(() => import('../components/Chat/Chat'))

const HomePage = () => {
    const { status, data: signInResult } = useSigninCheck()

    const dispatch = useDispatch()

    useEffect(() => {
        if (signInResult && signInResult.user) {
            dispatch(onlineStatusToggle(signInResult.user.uid))
        }
        return () => {
            if (signInResult && signInResult.user) {
                dispatch(setOfflineStatus(signInResult.user.uid))
            }
        }
    }, [status, dispatch])

    const openChat = useSelector((state: RootStateType) => state.app.openChat)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (openChat?.withUser.uid !== (searchParams.get('uid') as string)) {
            openChat && setSearchParams({ uid: openChat.withUser.uid })
        }
    }, [openChat, dispatch])

    if (status === 'loading') {
        return <Loader />
    } else if (status === 'success' && signInResult.signedIn) {
        return (
            <Box sx={{ bgcolor: 'background.default', height: '100vh' }}>
                <Container maxWidth='xl'>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={4}>
                            <SideBar uid={signInResult.user.uid} />
                        </Grid>
                        <Grid item xs={8}>
                            {openChat ? (
                                <Suspense fallback={<Loader />}>
                                    <Chat openChat={openChat} />
                                </Suspense>
                            ) : (
                                <EmptyChatPage />
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        )
    } else {
        return <Navigate to={`/login`} />
    }
}

export default HomePage
