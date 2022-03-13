import { useState } from 'react'
import { GoogleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import styles from 'styles/Form.module.scss'

type Props = {
    title: string
    buttonText: string
    loadingStatus: 'success' | 'loading'
    onSubmit: (email: string, password: string) => void
    onLoginWithGoogle: () => void
}

export const LoginForm: React.FC<Props> = ({
    buttonText,
    title,
    loadingStatus,
    onSubmit,
    onLoginWithGoogle,
}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        onSubmit(email, password)
    }
    return (
        <div className={styles.form}>
            <h1>{title}</h1>
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
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    loading={loadingStatus === 'loading'}
                    className={styles.signInButton}
                    onClick={handleSubmit}
                >
                    {buttonText}
                </Button>
                <Button className={styles.signInButton} onClick={onLoginWithGoogle}>
                    <GoogleOutlined />
                </Button>
            </div>
            <p>
                or <Link to='/register'>Sign up</Link>
            </p>
        </div>
    )
}
