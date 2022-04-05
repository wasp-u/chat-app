import './../../firebase'
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore'

const db = getFirestore()

const subscribeToMessagesChange = (callback: any, dialogId: string) => {
    const q = query(collection(db, `dialogs/${dialogId}/messages`))
    return onSnapshot(q, querySnapshot => {
        const messages = [] as any[]
        querySnapshot.forEach(doc => {
            messages.push(doc.data())
        })
        callback(messages)
    })
}

export const chatAPI = {
    subscribe(callback: any, dialogId: string) {
        return subscribeToMessagesChange(callback, dialogId)
    },
}
