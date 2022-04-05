import React from 'react'
import RateReviewIcon from '@mui/icons-material/RateReview'
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
            <RateReviewIcon sx={{ fontSize: 80 }} />
            <Typography variant='overline'>Write the first message...</Typography>
        </Box>
    )
}

export default NoData
