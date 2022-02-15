import { RootStateType } from './../store/index';
import { useSelector } from "react-redux"

export const useAuth = () => {
    const { uid } = useSelector((state: RootStateType) => state.user.userData)
    return {
        isAuth: !!uid,
        uid
    }
}