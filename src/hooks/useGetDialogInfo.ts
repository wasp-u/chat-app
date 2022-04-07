import { Dialog, UserData } from 'store/slices/appSlice'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { doc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { RootStateType } from '../store'
import { MessageType } from '../store/slices/chatSlice'

export const useGetDialogInfo = (dialog: Dialog) => {
    const firestore = useFirestore()
    const uid = useSelector((state: RootStateType) => state.app.userData?.uid) as string

    const withUserId = dialog.usersIdInDialog.filter(id => id !== uid)[0]

    let lastMessageRef = doc(firestore, `dialogs/0/messages`, '0')
    let userRef = doc(firestore, `users/`, '0')

    if (!!dialog.id && !!dialog.lastMessageId && !!withUserId) {
        lastMessageRef = doc(firestore, `dialogs/${dialog.id}/messages`, dialog.lastMessageId)
        userRef = doc(firestore, `users/`, withUserId)
    }

    const { data: lastMessage } = useFirestoreDocData(lastMessageRef)
    const { data: user } = useFirestoreDocData(userRef)

    if (user && lastMessage) {
        return {
            dialogWithUser: user as UserData,
            dialogLastMessage: lastMessage as MessageType,
        }
    } else {
        return { dialogWithUser: null, dialogLastMessage: null }
    }
}
