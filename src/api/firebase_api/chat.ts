import { off, onValue } from 'firebase/database'
import { ref } from 'firebase/database'
import { getDatabase } from 'firebase/database'
import './../../firebase'

const db = getDatabase()

const subscribeToMessagesChange = (callback: any, uid: string, chatId: string) => {
    const messagesListRef = ref(db, `users/${uid}/dialogs/${chatId}/messages`)
    onValue(messagesListRef, snapshot => {
        const data = snapshot.val()
        callback(data)
    })
}

export const chatAPI = {
    subscribe(callback: any, uid: string, chatId: string) {
        subscribeToMessagesChange(callback, uid, chatId)
    },
    unsubscribe(uid: string, chatId: string) {
        const messagesListRef = ref(db, `users/${uid}/dialogs/${chatId}/messages`)
        off(messagesListRef)
    },
}
