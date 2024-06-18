import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import React from 'react'

const SkeletonCard = () => {
    return (
        <div>
            <Card>
                <CardHeader
                    title={
                        <div className='bg-gray-400 rounded w-full h-15'></div>
                    }
                    subheader={
                        <div className='bg-gray-400 rounded w-full h-5'></div>
                    }
                />
                <CardMedia
                    sx={{height:240, backgroundColor:'gray'}}
                />
                <CardContent>
                    <Typography>
                        <div className='bg-gray-400 rounded w-full py-5'></div> 
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography>
                        <div className='bg-gray-400 rounded w-full py-4'></div> 
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography>
                        <div className='bg-gray-400 rounded w-full py-3'></div> 
                    </Typography>
                </CardContent>
            </Card>
            
        </div>
    )
}

export default SkeletonCard
