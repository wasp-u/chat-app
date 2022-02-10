import { useState } from "react"

type Props = {
    title: string
    buttonText: string
    onSubmit: (userName: string, userLastName: string) => void
}

export const ChangeUserDataForm: React.FC<Props> = ({ buttonText, onSubmit, title }) => {
    const [userName, setUserName] = useState('')
    const [userLastName, setUserLastName] = useState('')

    const handleSubmit = () => {
        onSubmit(userName, userLastName)
        setUserName('')
        setUserLastName('')
    }

    return (
        <div >
            <p>{title}</p>
            <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Name" />
            <input
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                placeholder="Last Name" />
            <button onClick={handleSubmit}>{buttonText}</button>
        </div>
    )
}
