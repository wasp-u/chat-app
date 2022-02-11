import { Timestamp } from 'firebase/firestore';
import { onValue, set } from 'firebase/database';
import { ref } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import './../../firebase'

const db = getDatabase()
const messagesListRef = ref(db, 'messages/');

const subscribeToMessagesChange = (callback: any) => {
    onValue(messagesListRef, (snapshot) => {
        const data = snapshot.val();
        callback(data)
    });
}

export const chatAPI = {
    send(message: { fromId: string, fromName: string, text: string }) {
        const id = (Timestamp.now().seconds * 1000 + new Date().getTime())
        set(ref(db, 'messages/' + id), {
            id: id,
            time: Timestamp.now().seconds * 1000,
            fromId: message.fromId,
            fromName: message.fromName,
            text: message.text
        });
    },
    subscribe(callback: any) {
        subscribeToMessagesChange(callback)
    },
}