import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from 'reactfire'
import { onAuthWithGoogle } from 'store/slices/userSlice'
import { LoginForm } from './LoginForm'
import { motion } from 'framer-motion'

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

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }

    return (
        <motion.div
            initial='hidden'
            animate='visible'
            transition={{ duration: 0.2 }}
            variants={variants}
        >
            <LoginForm
                buttonText='Sign In'
                onSubmit={onLogin}
                onLoginWithGoogle={onLoginWithGoogle}
                title='Login'
                loadingStatus={loginStatus}
            />
        </motion.div>
    )
}
