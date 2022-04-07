import { Dialog } from 'store/slices/appSlice'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection, query, where } from 'firebase/firestore'
import { useMemo } from 'react'

const dialogsSort = (dialogs: Dialog[]) => {
    let result = dialogs
    if (dialogs && dialogs.length >= 2) {
        result = [...dialogs] as Dialog[]
        result.sort((a, b) => {
            if (a.lastMessageTime > b.lastMessageTime) return -1
            else if (a.lastMessageTime === b.lastMessageTime) return 0
            else return 1
        })
    }
    return result
}

export const useGetUserDialogs = (uid?: string) => {
    const firestore = useFirestore()
    const queryUid = uid ? uid : ''

    const q = query(
        collection(firestore, 'dialogs'),
        where('usersIdInDialog', 'array-contains', queryUid)
    )

    const { status, data: dialogs } = useFirestoreCollectionData(q)
    let result = dialogs as Dialog[]

    const memoizedResult = useMemo(() => dialogsSort(result), [result])

    return { status, dialogs: memoizedResult }
}
