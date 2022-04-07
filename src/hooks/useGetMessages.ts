import { MessageType } from 'store/slices/chatSlice'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection } from 'firebase/firestore'

export const useGetMessages = (dialogId: string) => {
    const firestore = useFirestore()
    const messagesRef = collection(firestore, `dialogs/${dialogId}/messages`)

    const { status, data: messages } = useFirestoreCollectionData(messagesRef)

    return { status, messages: messages as MessageType[] }
}
