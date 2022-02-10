import { useDispatch } from 'react-redux'
import { onRegister } from 'store/slices/userSlice'
// @ts-ignore
import { SignUpForm } from './SignUpForm'

export const SignUp = () => {
    const dispatch = useDispatch()

    const onSignUp = (email: string, password: string, userName: string, userLastName: string) => {
        dispatch(onRegister({ email, password, name: userName, lastName: userLastName }))
    }

    return (
        <div>
            <SignUpForm buttonText='Sign Up' onSubmit={onSignUp} title='Sign Up' />
        </div>
    )
}
