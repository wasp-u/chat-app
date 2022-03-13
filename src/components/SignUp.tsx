import { useDispatch } from 'react-redux'
import { onRegister } from 'store/slices/userSlice'
import { SignUpForm } from './SignUpForm'
import { motion } from 'framer-motion'

export const SignUp = () => {
    const dispatch = useDispatch()

    const onSignUp = (email: string, password: string, userName: string) => {
        dispatch(onRegister({ email, password, name: userName }))
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
            <SignUpForm buttonText='Sign Up' onSubmit={onSignUp} title='Sign Up' />
        </motion.div>
    )
}
