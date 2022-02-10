import { Login } from "components/Login";
import { useAuth } from "hooks/useAuth";
import { Link, Navigate } from "react-router-dom"
import styles from 'styles/LoginPage.module.scss'

function LoginPage() {

    const authUser = useAuth()

    return (authUser.isAuth
        ? <Navigate to={`/`} />
        : <div className={styles.loginPage}>
            <Login />
            <p>
                or <Link to='/register'>Sign up</Link>
            </p>
        </div>
    )
}

export default LoginPage