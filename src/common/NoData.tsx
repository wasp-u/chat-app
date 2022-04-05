import React from 'react'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import { Box, Typography } from '@mui/material'

const NoData = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'text.primary',
            }}>
            <SentimentNeutralIcon sx={{ fontSize: 80 }} />
            <Typography variant='h5'>NO DATA...</Typography>
        </Box>
    )
}

export default NoData
