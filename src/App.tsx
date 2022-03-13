import 'antd/dist/antd.min.css'
import './App.css'
import HomePage from 'pages/HomePage'
import LoginPage from 'pages/LoginPage'
import RegisterPage from 'pages/RegisterPage'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider, DatabaseProvider, useFirebaseApp } from 'reactfire'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

function App() {
    const app = useFirebaseApp()
    const database = getDatabase(app)
    const auth = getAuth(app)

    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={database}>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='register' element={<RegisterPage />} />
                </Routes>
            </DatabaseProvider>
        </AuthProvider>
    )
}

export default App
