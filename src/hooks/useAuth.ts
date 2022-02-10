import { RootStateType } from './../store/index';
import { useSelector } from "react-redux"

export const useAuth = () => {
    const { id } = useSelector((state: RootStateType) => state.user.userAuthData)
    return {
        isAuth: !!id,
        id
    }
}