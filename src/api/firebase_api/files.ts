import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { getAuth, updateProfile } from 'firebase/auth'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'

const storage = getStorage()
const firestore = getFirestore()
const auth = getAuth()

export const filesAPI = {
    updateUserPhoto(callback: any, file: File) {
        const mountainImagesRef = ref(storage, 'images/' + file.name)
        const uploadTask = uploadBytesResumable(mountainImagesRef, file)

        uploadTask.on(
            'state_changed',
            snapshot => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                callback(Math.round(progress))
                // console.log('Upload is ' + Math.round(progress) + '% done')
            },
            error => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    const user = auth.currentUser
                    if (user) {
                        updateProfile(user, {
                            photoURL: downloadURL,
                        })
                        updateDoc(doc(firestore, 'users', user.uid), { photoURL: downloadURL })
                    }
                    // updateDoc(firestore,)
                    // console.log('File available at', downloadURL)
                })
                callback(0)
            }
        )
    },
    // uploadBytes(mountainImagesRef, file).then(snapshot => {
    //     console.log(snapshot.ref.)
    // })
}
