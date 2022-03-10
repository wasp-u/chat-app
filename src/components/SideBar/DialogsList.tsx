import { useSelector } from "react-redux";
import { RootStateType } from "store";
import { UserData } from "store/slices/userSlice";
import styles from 'styles/SideBar.module.scss';
import { DialogItem } from "./DialogItem";

type DialogsListProps = {
    onItemClick: (user: UserData) => void
    onOpenGeneralChat: () => void
};

export const DialogsList: React.FC<DialogsListProps> = ({ onItemClick, onOpenGeneralChat }) => {

    const dialogs = useSelector((state: RootStateType) => state.user.dialogs);

    return (
        <div>
            <h3>Dialogs:</h3>
            <button className={styles.generalChatButton} onClick={onOpenGeneralChat}>
                General chat
            </button>
            {dialogs.map(dialog => <DialogItem onCLick={onItemClick} key={dialog.uid} dialog={dialog} />)}
        </div>
    );
};
