import { UserData } from './../../store/slices/userSlice'
import './../../firebase'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    Timestamp,
    updateDoc,
} from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth'
import { getDatabase, onDisconnect, onValue, ref, set } from 'firebase/database'

const db = getFirestore()
const dbRef = getDatabase()
const auth = getAuth()

export const userInfo = {
    async updateUserData(name: string) {
        const db = getFirestore()
        const user = auth.currentUser
        if (user) {
            await updateProfile(user, {
                displayName: name,
            })
            await updateDoc(doc(db, 'users', user.uid), { displayName: name })
        }
    },
    async getUser(uid: string) {
        const user = await getDoc(doc(db, 'users', uid))
        console.log(user.data())
        return user.data() as UserData
    },
    async searchUser(searchValue: string) {
        let users = [] as any[]

        const docSnap = await getDocs(collection(db, 'users'))
        docSnap.forEach(doc => {
            const user = doc.data()
            const name = user.displayName
            if (name.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1) {
                users.push(user)
            }
        })

        return users as UserData[]
    },
    onlineStatusToggle(uid: string) {
        const userStatusDatabaseRef = ref(dbRef, 'status/' + uid)
        const isOfflineForFirestore = {
            state: 'offline',
            last_changed: Timestamp.now().seconds * 1000,
        }

        const isOnlineForFirestore = {
            state: 'online',
            last_changed: Timestamp.now().seconds * 1000,
        }

        onValue(ref(dbRef, '.info/connected'), snapshot => {
            if (snapshot.val() == false) {
                updateDoc(doc(db, 'users', uid), {
                    status: isOfflineForFirestore,
                })
                return
            }
            onDisconnect(userStatusDatabaseRef)
                .set(isOfflineForFirestore)
                .then(() => {
                    updateDoc(doc(db, 'users', uid), {
                        status: isOnlineForFirestore,
                    })
                    set(userStatusDatabaseRef, isOnlineForFirestore)
                })
        })
    },
    setOfflineStatus(uid: string) {
        const userStatusDatabaseRef = ref(dbRef, 'status/' + uid)
        const isOfflineForFirestore = {
            state: 'offline',
            last_changed: Timestamp.now().seconds * 1000,
        }
        updateDoc(doc(db, 'users', uid), {
            status: isOfflineForFirestore,
        })
        set(userStatusDatabaseRef, isOfflineForFirestore)
    },
}
