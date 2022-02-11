import { useState } from "react"
import styles from 'styles/Form.module.scss'

type Props = {
    title: string
    buttonText: string
    onSubmit: (email: string, password: string) => void
    onLoginWithGoogle: () => void
}

export const LoginForm: React.FC<Props> = ({ buttonText, onSubmit, title, onLoginWithGoogle }) => {
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email" />
            <input
                className={styles.password_input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password" />
            <button style={{ 'marginBottom': '10px' }} onClick={handleSubmit}>{buttonText}</button>
            <button onClick={onLoginWithGoogle}>Sign In with google account</button>
        </div>
    )
}
