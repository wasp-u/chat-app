import { UserData } from 'store/slices/userSlice'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { doc } from 'firebase/firestore'

export const useGetUserInfo = (uid: string) => {
    const firestore = useFirestore()

    const userRef = doc(firestore, `users/`, uid)

    const { data: user } = useFirestoreDocData(userRef)

    if (user) {
        return {
            user: user as UserData,
        }
    } else {
        return { user: null }
    }
}
