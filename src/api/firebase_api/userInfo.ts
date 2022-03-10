import { UserData } from './../../store/slices/userSlice';
import { getDatabase, ref, set, get, child } from "firebase/database";
import './../../firebase'

const db = getDatabase();
const dbRef = ref(getDatabase());

export const userInfo = {
    setNewUserData(user: UserData) {
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
            if (!snapshot.exists()) {
                set(ref(db, 'users/' + user.uid), {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                });
            }
        }).catch((error) => {
            console.error(error);
        });

    },
    getUserData(userId: string) {
        return get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val()
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    },
    searchUser(searchValue: string) {
        let users = [] as UserData[]
        return get(child(dbRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
                for (let key in snapshot.val()) {
                    const name = snapshot.val()[key].displayName
                    if (name.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1) {
                        users.push(snapshot.val()[key])
                    }
                }
            } else {
                console.log("No data available");
            }
            return users
        }).catch((error) => {
            console.error(error);
            return []
        });
    }
}