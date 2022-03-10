import { child, push, remove, update } from 'firebase/database';
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
    sendMessageToUser(message: { fromId: string, fromName: string, text: string, photoURL?: string | null },
        to: { id: string, displayName: string | null, photoURL?: string | null }) {
        if (!message.photoURL) {
            message.photoURL = ''
        }
        if (!to.photoURL) {
            to.photoURL = ''
        }
        const messageID = (Timestamp.now().seconds * 1000 + new Date().getTime())
        get(child(dbRef, `users/${to.id}/dialogs/${message.fromId}`)).then((snapshot) => {
            if (!snapshot.exists()) {
                set(ref(db, `users/${to.id}/dialogs/${message.fromId}`), {
                    uid: message.fromId,
                    displayName: message.fromName,
                    photoURL: message.photoURL
                }).then(() => {
                    set(ref(db, `users/${to.id}/dialogs/${message.fromId}/messages/${messageID}`), {
                        id: messageID,
                        time: Timestamp.now().seconds * 1000,
                        fromId: message.fromId,
                        text: message.text,
                        fromName: message.fromName,
                        photoURL: message.photoURL
                    })
                })
            } else {
                set(ref(db, `users/${to.id}/dialogs/${message.fromId}/messages/${messageID}`), {
                    id: messageID,
                    time: Timestamp.now().seconds * 1000,
                    fromId: message.fromId,
                    text: message.text,
                    fromName: message.fromName,
                    photoURL: message.photoURL
                })
            }
        })
        get(child(dbRef, `users/${message.fromId}/dialogs/${to.id}`)).then((snapshot) => {
            if (!snapshot.exists()) {
                set(ref(db, `users/${message.fromId}/dialogs/${to.id}`), {
                    uid: to.id,
                    displayName: to.displayName,
                    photoURL: to.photoURL
                }).then(() => {
                    set(ref(db, `users/${message.fromId}/dialogs/${to.id}/messages/${messageID}`), {
                        id: messageID,
                        time: Timestamp.now().seconds * 1000,
                        fromId: message.fromId,
                        text: message.text,
                        fromName: message.fromName,
                        photoURL: message.photoURL
                    })
                })
            } else {
                set(ref(db, `users/${message.fromId}/dialogs/${to.id}/messages/${messageID}`), {
                    id: messageID,
                    time: Timestamp.now().seconds * 1000,
                    fromId: message.fromId,
                    text: message.text,
                    fromName: message.fromName,
                    photoURL: message.photoURL
                })
            }
        })
    },
    subscribe(callback: any, uid: string) {
        subscribeToMessagesChange(callback, uid)
    },
    deleteMessageForUser(myId: string, toUserId: string, messageID: number) {
        remove(ref(db, `users/${toUserId}/dialogs/${myId}/messages/${messageID}`))
    },
    deleteMessageForMe(myId: string, toUserId: string, messageID: number) {
        remove(ref(db, `users/${myId}/dialogs/${toUserId}/messages/${messageID}`))
    },
    deleteDialog(myId: string, toUserId: string) {
        remove(ref(db, `users/${myId}/dialogs/${toUserId}`))
        remove(ref(db, `users/${toUserId}/dialogs/${myId}`))
    },
    editMessage(myId: string, toUserId: string, messageID: number, newMessageText: string) {
        const updates: { [index: string]: string } = {};
        updates[`users/${myId}/dialogs/${toUserId}/messages/${messageID}/text`] = newMessageText;
        updates[`users/${toUserId}/dialogs/${myId}/messages/${messageID}/text`] = newMessageText;
        update(ref(db), updates);
        set(ref(db, `users/${myId}/dialogs/${toUserId}/messages/${messageID}/edited`), true)
        set(ref(db, `users/${toUserId}/dialogs/${myId}/messages/${messageID}/edited`), true)
    },
    messageViewedToggle(myId: string, toUserId: string, messageID: number) {
        set(ref(db, `users/${toUserId}/dialogs/${myId}/messages/${messageID}/viewed`), true)
    }
}