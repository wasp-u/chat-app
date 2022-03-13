import {useState} from 'react'
import styles from 'styles/SideBar.module.scss'
import {motion} from 'framer-motion'

const variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
}

type SearchProps = {
    onSearch: (searchedValue: string) => void
}

export const Search: React.FC<SearchProps> = ({onSearch}) => {
    const [searchedValue, setSearchValue] = useState('')

    const searchHandle = () => {
        setSearchValue('')
        onSearch(searchedValue)
    }

    return (
        <motion.div
            initial='hidden'
            animate='visible'
            transition={{duration: 0.3}}
            variants={variants}
        >
            <div className={styles.search}>
                <div className={styles.searchHeader}>
                    <input
                        placeholder='Enter name'
                        value={searchedValue}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                    <button onClick={searchHandle}>Search</button>
                </div>
            </div>
        </motion.div>
    )
}
