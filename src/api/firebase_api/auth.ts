import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    browserSessionPersistence
} from "firebase/auth";
import './../../firebase'

const auth = getAuth();
const provider = new GoogleAuthProvider()

export const userAuth = {
    updateUserData(name: string) {
        const user = auth.currentUser
        // @ts-ignore
        return updateProfile(user, {
            displayName: name
        }).then(() => {
            console.log('updated');
        }).catch((error) => {
            console.log('error update');
        })
    },
    getAuthUser() {
        const user = auth.currentUser
        auth.setPersistence(browserSessionPersistence)
        // console.log(user);
        if (!!user) {
            return {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
            }
        } else return {
            displayName: null,
            email: null,
            photoURL: null,
            uid: null,
        }
    },
    authMeWithGoogle() {
        return signInWithPopup(auth, provider).then((result) => {
            const user = result.user
            return {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    },
    authMe(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user
                return {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid
                }
            })
            .catch(error => {
                throw new Error(error)
            });
    },
    registerMe(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user
                return {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid
                }
            })
            .catch(error => error.message);
    },
    signOut() {
        auth.signOut()
    }
}

