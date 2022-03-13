import {KeyboardEvent, useEffect, useRef, useState} from 'react'
import styles from 'styles/Chat.module.scss'
import {SendOutlined} from '@ant-design/icons'

type ChatSendFormProps = {
    initialValue: string
    onSubmit: (newMessage: string) => void
}

export const ChatSendForm: React.FC<ChatSendFormProps> = ({
    onSubmit,
    initialValue,
}) => {
    const [value, setValue] = useState(initialValue)

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const onEnterKeyClick = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            value && onSubmit(value)
            setValue('')
        }
    }
    const onSubmitHandle = () => {
        value && onSubmit(value)
        setValue('')
    }

    useEffect(() => {
        if (value === '\n') {
            setValue('')
        }
    }, [value])
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <div className={styles.sendForm}>
            <textarea
                ref={textAreaRef}
                onKeyDown={onEnterKeyClick}
                placeholder='Enter your message'
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <SendOutlined
                className={styles.sendButton}
                rotate={270}
                onClick={onSubmitHandle}
            />
        </div>
    )
}
