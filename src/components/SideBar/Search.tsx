import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from 'styles/SideBar.module.scss';

type SearchProps = {
    onSearch: (searchedValue: string) => void
};

export const Search: React.FC<SearchProps> = ({ onSearch }) => {

    const [searchedValue, setSearchValue] = useState('');

    const searchHandle = () => {
        setSearchValue('');
        onSearch(searchedValue)
    };

    return (
        <div>
            <div className={styles.search}>
                <div className={styles.searchHeader}>
                    <input
                        placeholder="Enter name"
                        value={searchedValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                    <button onClick={searchHandle}>Search</button>
                </div>
            </div>
        </div>
    );
};


