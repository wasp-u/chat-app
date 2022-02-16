import { Timestamp } from 'firebase/firestore';
import { limitToLast, onValue, query, set } from 'firebase/database';
import { ref } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import './../../firebase'

const db = getDatabase()
// ref(db, 'messages/');

const subscribeToMessagesChange = (callback: any, uid?: string, chatId?: string) => {
    if (!!uid && !!chatId) {
        const messagesListRef = query(ref(db, `users/${uid}/dialogs/${chatId}/messages`), limitToLast(30));
        onValue(messagesListRef, (snapshot) => {
            const data = snapshot.val();
            callback(data)
        });
    } else {
        const messagesListRef = query(ref(db, 'messages/'), limitToLast(30));
        onValue(messagesListRef, (snapshot) => {
            const data = snapshot.val();
            callback(data)
        });
    }
}

export const chatAPI = {
    send(message: { fromId: string, fromName: string, text: string, photoURL: string }) {
        const id = (Timestamp.now().seconds * 1000 + new Date().getTime())
        set(ref(db, 'messages/' + id), {
            id: id,
            time: Timestamp.now().seconds * 1000,
            fromId: message.fromId,
            fromName: message.fromName,
            text: message.text,
            photoURL: message.photoURL
        });
    },
    subscribe(callback: any, uid?: string, chatId?: string) {
        subscribeToMessagesChange(callback, uid, chatId)
    },
}