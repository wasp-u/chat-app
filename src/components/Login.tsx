import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from 'reactfire'
import { onAuthWithGoogle } from 'store/slices/userSlice'
import { LoginForm } from './LoginForm'

export const Login = () => {
    const dispatch = useDispatch()
    const auth = useAuth()
    const [loginStatus, setLoginStatus] = useState<'success' | 'loading'>('success')

    const onLogin = (email: string, password: string) => {
        setLoginStatus('loading')
        signInWithEmailAndPassword(auth, email, password).then(() => setLoginStatus('success'))
    }

    const onLoginWithGoogle = () => {
        dispatch(onAuthWithGoogle())
    }

    return (
        <div>
            <LoginForm
                buttonText='Sign In'
                onSubmit={onLogin}
                onLoginWithGoogle={onLoginWithGoogle}
                title='Login'
                loadingStatus={loginStatus}
            />
        </div>
    )
}
