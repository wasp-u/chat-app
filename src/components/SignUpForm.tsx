import { useState } from "react"
import styles from 'styles/Form.module.scss'

type Props = {
    title: string
    buttonText: string
    onSubmit: (email: string, password: string, userName: string, userLastName: string) => void
}

export const SignUpForm: React.FC<Props> = ({ buttonText, onSubmit, title }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = () => {
        onSubmit(email, password, name, lastName)
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
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name" />
            <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name" />
            <button onClick={handleSubmit}>{buttonText}</button>
        </div>
    )
}
