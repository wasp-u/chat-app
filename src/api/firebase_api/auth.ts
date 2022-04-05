import { getApp } from 'firebase/app'
import {
    browserLocalPersistence,
    browserPopupRedirectResolver,
    browserSessionPersistence,
    GoogleAuthProvider,
    indexedDBLocalPersistence,
    initializeAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth'
import './../../firebase'

const auth = initializeAuth(getApp(), {
    persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence],
    popupRedirectResolver: browserPopupRedirectResolver,
})
const provider = new GoogleAuthProvider()

const emptyUser = {
    displayName: null,
    email: null,
    photoURL: null,
    uid: '',
}

export const userAuth = {
    async authWithEmailAndPassword(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            return {
                displayName: userCredential.user.displayName,
                email: userCredential.user.email,
                photoURL: userCredential.user.photoURL,
                uid: userCredential.user.uid,
            }
        } catch (e: any) {
            return e
        }
    },
    getAuthUser() {
        const user = auth.currentUser
        if (!!user) {
            return {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
            }
        } else return emptyUser
    },
    async authMeWithGoogle() {
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        return {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
        }
    },
    async registerMe(email: string, password: string, displayName: string) {
        let url = `https://us-central1-chat-c6cf2.cloudfunctions.net/registerNewUser?displayName=${displayName}&email=${email}&password=${password}`
        await fetch(url)
        await this.authWithEmailAndPassword(email, password)
    },
}
