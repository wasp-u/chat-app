import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import './../../firebase'

const auth = getAuth();
const provider = new GoogleAuthProvider()

export const userAuth = {
    authMeWithGoogle() {
        return signInWithPopup(auth, provider)
            .then((result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // console.log(result.user);
                return { id: result.user.uid, email: result.user.email, fullName: result.user.displayName }

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    },
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

