import { MessageType } from 'store/slices/userSlice'
import { ref } from 'firebase/database'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import { useEffect, useState } from 'react'

export const useLastMessageIsNew = (uid: string, dialogId: string, messageId: number) => {
    const database = useDatabase()
    const messageRef = ref(database, `users/${dialogId}/dialogs/${uid}/messages/${messageId}`)

    const { data: message } = useDatabaseObjectData<MessageType>(messageRef)

    const [lastMessage, setLastMessage] = useState<MessageType>()

    useEffect(() => {
        setLastMessage(message)
    }, [message])

    if (lastMessage) {
        if (!!lastMessage?.viewed) {
            return false
        } else {
            return true
        }
    } else {
        return false
    }
}
