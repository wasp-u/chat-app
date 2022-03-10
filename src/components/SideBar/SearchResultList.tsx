import { Spin } from "antd";
import { useSelector } from "react-redux";
import { RootStateType } from "store";
import { UserData } from "store/slices/userSlice";
import { User } from "./User";

type Props = {
    onItemClick: (user: UserData) => void
    onCloseClick: () => void
};

export const SearchResultList: React.FC<Props> = ({ onItemClick, onCloseClick }) => {

    const searchedUsers = useSelector((state: RootStateType) => state.user.searchedUSers);
    const loadingStatus = useSelector((state: RootStateType) => state.user.status);

    return (
        <div>
            <div style={{ 'display': 'flex', 'justifyContent': 'space-between', 'alignItems': 'center' }}>
                <h3>Users:</h3>
                <button onClick={onCloseClick}>x</button>
            </div>
            {loadingStatus === 'pending'
                ? <div style={{ 'display': "flex", 'justifyContent': "center" }}>
                    <Spin size="large" />
                </div>
                : searchedUsers.map(user => <User onCLick={onItemClick} key={user.uid} user={user} />)
            }
        </div>
    );
};
