import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'store/index'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from './firebase'

ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </FirebaseAppProvider>,
    document.getElementById('root')
)

reportWebVitals()
