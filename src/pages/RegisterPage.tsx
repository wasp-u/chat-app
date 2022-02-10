import { SignUp } from 'components/SignUp'
import { useAuth } from 'hooks/useAuth'
import { Link, Navigate } from 'react-router-dom'
import styles from 'styles/RegisterPage.module.scss'

function RegisterPage() {
    const authUser = useAuth()

    return (authUser.isAuth
        ? <Navigate to={`/`} />
        : <div className={styles.registerPage}>
            <SignUp />
            <p>
                or <Link to='/login'>Sign in</Link>
            </p>
        </div>
    )
}

export default RegisterPage