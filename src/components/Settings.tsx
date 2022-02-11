import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from 'store'
import { setUserDataHandle } from 'store/slices/userSlice'
import { ChangeUserDataForm } from './ChangeUserDataForm'

type Props = {
    changeSettingMode: () => void
}
export const Settings: React.FC<Props> = ({ changeSettingMode }) => {
    const id = useSelector((state: RootStateType) => state.user.userAuthData.id)
    const email = useSelector((state: RootStateType) => state.user.userAuthData.email)

    const dispatch = useDispatch()

    const submitUserData = (userName: string, userLastName: string) => {
        if (!!id && !!email) {
            dispatch(setUserDataHandle({ userId: id, email, userName, userLastName }))
            changeSettingMode()
        }
    }

    return (
        <div>
            <ChangeUserDataForm title="Settings" buttonText="Save" onSubmit={submitUserData} />
        </div>
    )
}
