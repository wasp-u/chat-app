import { Timestamp } from 'firebase/firestore';
import { limitToLast, off, onValue, query, set } from 'firebase/database';
import { ref } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import './../../firebase'

const db = getDatabase()

const subscribeToMessagesChange = (callback: any, uid?: string, chatId?: string) => {
    if (!!uid && !!chatId) {
        const messagesListRef = ref(db, `users/${uid}/dialogs/${chatId}/messages`);
        onValue(messagesListRef, (snapshot) => {
            const data = snapshot.val();
            callback(data)
        });
    } else {
        const messagesListRef = query(ref(db, 'generalChat/messages'), limitToLast(30));
        onValue(messagesListRef, (snapshot) => {
            const data = snapshot.val();
            callback(data)
        });
    }
}

export const chatAPI = {
    send(message: { fromId: string, fromName: string, text: string, photoURL?: string | null }) {
        const id = (Timestamp.now().seconds * 1000 + new Date().getTime())
        set(ref(db, 'generalChat/messages/' + id), {
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
    unsubscribe(uid: string, chatId: string) {
        const messagesListRef = ref(db, `users/${uid}/dialogs/${chatId}/messages`);
        off(messagesListRef)
    }
}