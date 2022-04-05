import './App.css'
import HomePage from 'pages/HomePage'
import LoginPage from 'pages/LoginPage'
import RegisterPage from 'pages/RegisterPage'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import { useMemo } from 'react'
import getDesignTokens from './common/theme'

function App() {
    const app = useFirebaseApp()
    const firestore = getFirestore()
    const auth = getAuth(app)

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'

    const theme = useMemo(() => createTheme(getDesignTokens(prefersDarkMode)), [prefersDarkMode])

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider sdk={auth}>
                <FirestoreProvider sdk={firestore}>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='login' element={<LoginPage />} />
                        <Route path='register' element={<RegisterPage />} />
                    </Routes>
                </FirestoreProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
