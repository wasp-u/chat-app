import { motion } from 'framer-motion'
import ForumIcon from '@mui/icons-material/Forum'
import { Box, Typography } from '@mui/material'
import React from 'react'

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

export const EmptyChatPage = () => {
    return (
        <motion.div
            initial='hidden'
            animate='visible'
            transition={{ duration: 0.5 }}
            variants={variants}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.primary',
                    bgcolor: 'background.paper',
                    my: 2,
                    p: 3,
                    height: 'calc(100vh - 16px)',
                    borderRadius: 4,
                }}>
                <ForumIcon sx={{ fontSize: 80 }} />
                <Typography variant={'overline'}>Choose a chat room</Typography>
            </Box>
        </motion.div>
    )
}
