import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import './../../firebase'

const db = getDatabase();
const starCountRef = ref(db, 'users/');
const dbRef = ref(getDatabase());

const subscribeToUsersChange = (callback: any) => {
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        callback(data)
    });
}

export const userInfo = {
    setNewUserData(userData: { userId: string, email: string, userName: string, userLastName: string }) {
        set(ref(db, 'users/' + userData.userId), {
            userName: userData.userName,
            userLastName: userData.userLastName,
            email: userData.email
        });
    },
    // subscribe(callback: any) {
    //     subscribeToUsersChange(callback)
    // },
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
    }
}