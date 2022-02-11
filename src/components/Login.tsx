import { useDispatch } from 'react-redux'
import { onAuth, onAuthWithGoogle } from 'store/slices/userSlice'
import { LoginForm } from './LoginForm'

export const Login = () => {
    const dispatch = useDispatch()

    const onLogin = (email: string, password: string) => {
        dispatch(onAuth(email, password))
    }

    const onLoginWithGoogle = () => {
        dispatch(onAuthWithGoogle())
    }

    return (
        <div>
            <LoginForm buttonText='Sign In' onSubmit={onLogin} onLoginWithGoogle={onLoginWithGoogle} title='Login' />
        </div>
    )
}
