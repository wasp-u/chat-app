import { useState } from "react"

type Props = {
    title: string
    buttonText: string
    displayName: string
    onSubmit: (name: string) => void
}

export const ChangeUserDataForm: React.FC<Props> = ({ buttonText, onSubmit, title, displayName }) => {
    const [name, setName] = useState(displayName)

    const handleSubmit = () => {
        onSubmit(name)
        setName('')
    }

    return (
        <div >
            <p>{title}</p>
            <p>Name:</p>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name" />
            <button onClick={handleSubmit}>{buttonText}</button>
        </div>
    )
}
