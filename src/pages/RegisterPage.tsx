import {SignUp} from 'components/SignUpScreen/SignUp'
import {Navigate} from 'react-router-dom'
import {useSigninCheck} from 'reactfire'
import {Box} from "@mui/material";

function RegisterPage() {
    const {status, data: signInResult} = useSigninCheck()

    return status === 'success' && signInResult.signedIn ? (
        <Navigate to={`/`}/>
    ) : (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            bgcolor: 'background.default'
        }}>
            <SignUp/>
        </Box>
    )
}

export default RegisterPage
