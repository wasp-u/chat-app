import {Login} from 'components/SignInScreen/Login'
import {Navigate} from 'react-router-dom'
import {useSigninCheck} from 'reactfire'
import {Box} from "@mui/material";

function LoginPage() {
    const {status, data: signInResult} = useSigninCheck()

    return status === 'success' && signInResult.signedIn ? (
        <Navigate to={`/`}/>
    ) : (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            bgcolor: 'background.default'
        }}>
            <Login/>
        </Box>

    )
}

export default LoginPage
