import { child, update } from 'firebase/database';
import { get } from 'firebase/database';
import { Timestamp } from 'firebase/firestore';
import { limitToLast, onValue, query, set } from 'firebase/database';
import { ref } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import './../../firebase'

const db = getDatabase()
const dbRef = ref(getDatabase());

const subscribeToMessagesChange = (callback: any, uid: string) => {
    const dialogsListRef = query(ref(db, `users/${uid}/dialogs/`), limitToLast(30));
    onValue(dialogsListRef, (snapshot) => {
        const data = snapshot.val();
        callback(data)
    });
}

export const dialogsAPI = {
    sendMessageToUser(message: { fromId: string, fromName: string, text: string, photoURL: string }, toId: string) {
        const id = (Timestamp.now().seconds * 1000 + new Date().getTime())
        set(ref(db, `users/${message.fromId}/dialogs/${toId}/messages/${id}`), {
            id: id,
            time: Timestamp.now().seconds * 1000,
            fromId: message.fromId,
            fromName: message.fromName,
            text: message.text,
            photoURL: message.photoURL
        });
        get(child(dbRef, `users/${toId}/dialogs/${message.fromId}`)).then((snapshot) => {
            if (!snapshot.exists()) {
                set(ref(db, `users/${toId}/dialogs/${message.fromId}`), {
                    uid: message.fromId,
                    displayName: message.fromName,
                    photoURL: message.photoURL
                });
            }
        }).catch((error) => {
            console.error(error);
        });
        set(ref(db, `users/${toId}/dialogs/${message.fromId}/messages/${id}`), {
            id: id,
            time: Timestamp.now().seconds * 1000,
            fromId: message.fromId,
            fromName: message.fromName,
            text: message.text,
            photoURL: message.photoURL
        });
    },
    subscribe(callback: any, uid: string) {
        subscribeToMessagesChange(callback, uid)
    },
}