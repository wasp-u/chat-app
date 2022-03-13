import { ref } from 'firebase/database'
import { useDatabase, useDatabaseObjectData } from 'reactfire'

export const useGetUser = (uid: string) => {
    const database = useDatabase()

    const { data: displayName } = useDatabaseObjectData<string>(
        ref(database, `users/${uid}/displayName`)
    )
    const { data: photoURL } = useDatabaseObjectData<string>(ref(database, `users/${uid}/photoURL`))

    return { photoURL, displayName }
}
