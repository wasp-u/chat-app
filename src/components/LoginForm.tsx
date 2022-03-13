import { useState } from 'react'
import { GoogleOutlined } from '@ant-design/icons'
import styles from 'styles/Form.module.scss'
import { Loader } from './Loader'

type Props = {
    title: string
    buttonText: string
    loadingStatus: 'success' | 'loading'
    onSubmit: (email: string, password: string) => void
    onLoginWithGoogle: () => void
}

export const LoginForm: React.FC<Props> = ({
    buttonText,
    onSubmit,
    title,
    loadingStatus,
    onLoginWithGoogle,
}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        onSubmit(email, password)
    }
    return (
        <div className={styles.form}>
            <p>{title}</p>
            <input
                className={styles.email_input}
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='email'
            />
            <input
                className={styles.password_input}
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='password'
            />
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-around',
                }}
            >
                <button onClick={handleSubmit}>{buttonText}</button>
                <GoogleOutlined
                    onClick={onLoginWithGoogle}
                    className={styles.signInWithGoogleButton}
                />
                {loadingStatus === 'loading' && <Loader />}
            </div>
        </div>
    )
}
