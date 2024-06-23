import { Alert } from '@mui/material'
import React from 'react'

const Notify = ({ severity, message }) => {
    return (
        <div className='flex items-center justify-center top-12 z-50 left-0 w-full  fixed'>
            <Alert className='animate-bounce' severity={severity}>{message}</Alert>
        </div>
    )
}

export default Notify
