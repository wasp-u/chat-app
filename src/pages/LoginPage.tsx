import {Login} from 'components/Login'
import {Link, Navigate} from 'react-router-dom'
import {useUser} from 'reactfire'
import styles from 'styles/LoginPage.module.scss'

function LoginPage() {
    const {status, data: user} = useUser()

    return user ? (
        <Navigate to={`/`} />
    ) : (
        <div className={styles.loginPage}>
            <Login />
            <p>
                or <Link to='/register'>Sign up</Link>
            </p>
        </div>
    )
}

export default LoginPage
