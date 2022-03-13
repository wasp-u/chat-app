import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from 'store'
import { updateUserData } from 'store/slices/userSlice'
import { ChangeUserDataForm } from './ChangeUserDataForm'

type Props = {
    changeSettingMode: () => void
}
export const Settings: React.FC<Props> = ({ changeSettingMode }) => {
    const id = useSelector((state: RootStateType) => state.user.userData.uid)
    const displayName = useSelector(
        (state: RootStateType) => state.user.userData.displayName
    )
    const dispatch = useDispatch()

    const submitUserData = (name: string) => {
        if (!!id) {
            dispatch(updateUserData(name))
            changeSettingMode()
        }
    }

    return (
        <div>
            <ChangeUserDataForm
                displayName={displayName ? displayName : ''}
                title='Settings'
                buttonText='Save'
                onSubmit={submitUserData}
            />
        </div>
    )
}
