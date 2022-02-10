import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import './../../firebase'

const auth = getAuth();

export const userAuth = {
    authMe(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                return { uid: userCredential.user.uid, email: userCredential.user.email }
            })
            .catch(error => error.message);
    },
    registerMe(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                return { uid: userCredential.user.uid, email: userCredential.user.email }
            })
            .catch(error => error.message);
    }
}

