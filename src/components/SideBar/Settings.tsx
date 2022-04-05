import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from 'store'
import { ChangeUserDataForm } from './ChangeUserDataForm'

type Props = {
    changeSettingMode: () => void
}
export const Settings: React.FC<Props> = ({ changeSettingMode }) => {
    const displayName = useSelector((state: RootStateType) => state.user.userData?.displayName)
    const dispatch = useDispatch()

    const submitUserData = (name: string) => {
        // dispatch(updateUserData(name))
        changeSettingMode()
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
