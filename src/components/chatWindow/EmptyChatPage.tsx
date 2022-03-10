import styles from 'styles/HomePage.module.scss';
import empty_chat_icon from 'icons/empty_messages.svg';


export const EmptyChatPage = () => {
    return (
        <div className={styles.empty_message}>
            <img src={empty_chat_icon} alt="" />
            <p>Choose a chat room</p>
        </div>
    );
};
