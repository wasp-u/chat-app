import { Dialog } from 'store/slices/userSlice'
import { ref } from 'firebase/database'
import { useDatabase, useDatabaseObjectData } from 'reactfire'

export const useGetUserDialogs = (uid: string) => {
    const database = useDatabase()
    const dialogsRef = ref(database, `users/${uid}/dialogs/`)

    const { status, data: dialogs } = useDatabaseObjectData<{ [index: string]: Dialog }>(dialogsRef)

    let dialogsArr = [] as Dialog[]
    for (let key in dialogs) {
        dialogsArr.push(dialogs[key])
    }
    dialogsArr.pop()

    return { dialogsLoadingStatus: status, dialogs: dialogsArr }
}
