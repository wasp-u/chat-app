import { Dialog } from 'store/slices/appSlice'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection, query, where } from 'firebase/firestore'

export const useGetUserDialogs = (uid?: string) => {
    const firestore = useFirestore()

    let q = query(collection(firestore, 'dialogs'), where('usersIdInDialog', 'array-contains', ''))
    if (uid) {
        q = query(collection(firestore, 'dialogs'), where('usersIdInDialog', 'array-contains', uid))
    }

    const { status, data: dialogs } = useFirestoreCollectionData(q)

    return { status, dialogs: dialogs as Dialog[] }
}
