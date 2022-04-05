import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    increment,
    query,
    setDoc,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore'
import { MessageType } from 'store/slices/userSlice'
import './../../firebase'
import { getAuth } from 'firebase/auth'

const db = getFirestore()
const auth = getAuth()

export const dialogsAPI = {
    async _setMessage(text: string, dialogId: string, message: MessageType) {
        const dialogRef = doc(db, 'dialogs', dialogId, 'messages', message.id)
        await setDoc(dialogRef, message)
    },
    async sendMessage(text: string, toUserId: string) {
        const fromUserId = auth.currentUser?.uid as string
        // let url = `https://us-central1-chat-c6cf2.cloudfunctions.net/sendMessage?text=${text}&fromUserId=${fromUserId}&toUserId=${toUserId}`
        // await fetch(url)
        const message = {
            id: Timestamp.now().seconds * 1000 + new Date().getTime().toString(),
            text: text,
            time: Timestamp.now().seconds * 1000,
            fromId: fromUserId,
            viewed: false,
            edited: false,
        }
        const q = query(
            collection(db, 'dialogs'),
            where('usersIdInDialog', 'in', [
                [fromUserId, toUserId],
                [toUserId, fromUserId],
            ])
        )
        const dialog = await getDocs(q)
        let currentDialogId = ''
        if (dialog.empty) {
            currentDialogId = `${fromUserId}&${toUserId}`
            await setDoc(doc(db, 'dialogs', currentDialogId), {
                usersIdInDialog: [fromUserId, toUserId],
                id: currentDialogId,
            })
            await this._setMessage(text, currentDialogId, message)
        } else {
            dialog.forEach(d => (currentDialogId = d.data().id))
            await this._setMessage(text, currentDialogId, message)
        }
        await updateDoc(doc(db, 'dialogs', currentDialogId), {
            lastMessageId: message.id,
        })
        await updateDoc(doc(db, 'dialogs', currentDialogId), {
            [`newMessagesCount.${toUserId}`]: increment(1),
        })
    },
    // subscribe(callback: any) {
    //     const uid = auth.currentUser?.uid
    //     const q = query(collection(db, 'dialogs'), where('usersIdInDialog', 'array-contains', uid))
    //     return onSnapshot(q, docs => {
    //         const data = [] as Dialog[]
    //         docs.forEach(doc => {
    //             data.push(doc.data() as Dialog)
    //         })
    //         callback(data)
    //     })
    // },
    async deleteMessage(dialogId: string, messageId: string) {
        await deleteDoc(doc(db, `dialogs/${dialogId}/messages`, messageId))
    },
    //TODO: fix deleteDialog function

    // deleteDialog(dialogId: string) {
    //     const deleteFn = httpsCallable(functions, 'deleteDialog')
    //     deleteFn({ dialogId: dialogId })
    //         .then(function (result) {
    //             console.log('Delete success: ' + JSON.stringify(result))
    //         })
    //         .catch(function (err) {
    //             console.log('Delete failed, see console,')
    //             console.warn(err)
    //         })
    // },
    async editMessage(dialogId: string, messageId: string, newMessageText: string) {
        const messageDocRef = doc(db, `dialogs/${dialogId}/messages/`, messageId)
        await updateDoc(messageDocRef, {
            text: newMessageText,
            edited: true,
        })
    },

    async messageViewedToggle(dialogId: string, messageId: string) {
        const currentUserId = auth.currentUser?.uid
        const messageDocRef = doc(db, `dialogs/${dialogId}/messages/`, messageId)
        await updateDoc(messageDocRef, {
            viewed: true,
        })
        await updateDoc(doc(db, 'dialogs', dialogId), {
            [`newMessagesCount.${currentUserId}`]: 0,
        })
    },
}
