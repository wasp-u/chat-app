import { useDispatch } from 'react-redux'
import { onAuth } from 'store/slices/userSlice'
import { LoginForm } from './LoginForm'

export const Login = () => {
    const dispatch = useDispatch()

    const onLogin = (email: string, password: string) => {
        dispatch(onAuth(email, password))
    }

    return (
        <div>
            <LoginForm buttonText='Sign In' onSubmit={onLogin} title='Login' />
        </div>
    )
}
