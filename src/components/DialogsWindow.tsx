import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "store"
import { removeUser } from "store/slices/userSlice"

export const DialogsWindow = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state: RootStateType) => state.user.userData)

    const logoutHandler = () => {
        dispatch(removeUser())
    }

    return (
        <div>
            <p>Hello {userData.name} {userData.lastName}</p>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}
