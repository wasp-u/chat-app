import { onValue, push, set } from 'firebase/database';
import { ref } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import './../../firebase'

const db = getDatabase();
const messagesListRef = ref(db, 'messages/');

const subscribeToMessagesChange = (callback: any) => {
    onValue(messagesListRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        callback(data)
    });
}

export const chatAPI = {
    send(message: { fromId: string, fromName: string, text: string }) {
        const newMessageRef = push(messagesListRef);
        set(newMessageRef, {
            fromId: message.fromId,
            fromName: message.fromName,
            text: message.text
        });
    },
    subscribe(callback: any) {
        subscribeToMessagesChange(callback)
    },
}