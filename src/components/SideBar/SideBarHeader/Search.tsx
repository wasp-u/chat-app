import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Close, SearchOutlined } from '@mui/icons-material'

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

type SearchProps = {
    onSearch: (searchedValue: string) => void
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchedValue, setSearchValue] = useState('')

    const searchHandle = () => {
        setSearchValue('')
        onSearch(searchedValue)
    }

    return (
        <motion.div
            initial='hidden'
            animate='visible'
            transition={{ duration: 0.3 }}
            variants={variants}>
            <TextField
                autoComplete='off'
                placeholder='Search users'
                fullWidth
                sx={{
                    bgcolor: 'action.selected',
                }}
                size='small'
                value={searchedValue}
                onChange={e => setSearchValue(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            {searchedValue && (
                                <IconButton disableRipple onClick={() => setSearchValue('')}>
                                    <Close />
                                </IconButton>
                            )}
                            <IconButton disableRipple onClick={searchHandle}>
                                <SearchOutlined />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </motion.div>
    )
}
