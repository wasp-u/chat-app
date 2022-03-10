import { useDispatch } from "react-redux";
import { signOut } from "store/slices/userSlice";
import styles from 'styles/SideBar.module.scss';

type SideBarHeaderProps = {
    userName: string | null;
    settingMode: boolean;
    changeSettingMode: () => void;
};

export const SideBarHeader: React.FC<SideBarHeaderProps> = ({ userName, settingMode, changeSettingMode }) => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(signOut());
    };

    return (
        <div className={styles.dialogsWindowHeader}>
            <p>Hello {userName}</p>
            <button onClick={logoutHandler}>Logout</button>
            <button disabled onClick={changeSettingMode}>{settingMode ? 'X' : 'Setting'}</button>
        </div>
    );
};
