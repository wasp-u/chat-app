import { getApp } from "firebase/app";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    User,
    setPersistence,
    browserSessionPersistence,
    initializeAuth,
    indexedDBLocalPersistence,
    browserLocalPersistence,
    browserPopupRedirectResolver,
    onAuthStateChanged
} from "firebase/auth";
import './../../firebase'

const auth = initializeAuth(getApp(), {
    persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence],
    popupRedirectResolver: browserPopupRedirectResolver,
});
const provider = new GoogleAuthProvider()
const subscribeAuthUser = (callback: any) => {
    onAuthStateChanged(auth, function (user) {
        if (user) {
            const userData = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
            }
            callback(userData)
        } else {
        }
    })
}
export const userAuth = {
    updateUserData(name: string) {
        const user = auth.currentUser as User
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
        console.log(user);
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
    subscribe(callback: any) {
        subscribeAuthUser(callback)
    },
    authMeWithGoogle() {
        return setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithPopup(auth, provider).then((result) => {
                    // const credential = GoogleAuthProvider.credentialFromResult(result);
                    // @ts-ignore
                    const user = result.user
                    console.log(user);

                    return {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        uid: user.uid
                    }
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                return {
                    displayName: null,
                    email: null,
                    photoURL: null,
                    uid: null
                }
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

