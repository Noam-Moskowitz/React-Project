import React, { useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from 'react-router-dom';
import useThemeColor from '../../hooks/useThemeColor';

const SuccessScreen = () => {
    const { message } = useParams();
    const navigate = useNavigate();
    const { backgroundColor, textColor } = useThemeColor()

    useEffect(() => {
        setTimeout(() => {
            if (message === `Registration`) {
                navigate(`/login`);
            } else {
                navigate(`/`)
            }
        }, 1000)

    }, [])

    return (
        <div
            className='w-screen h-screen pt-10'
            style={{ backgroundColor: backgroundColor }}
        >
            <div
                className='font-bold text-center'
                style={{ color: textColor }}
            >
                <h1 className='text-4xl'>{message} Succesful</h1>
                <div className='animate-bounce pt-10'>
                    <CheckCircleIcon sx={{ fontSize: `150px` }} color='primary' />
                </div>
                <h2 className='text-2xl animate-pulse'>Rerouting..</h2>
            </div>
        </div>
    )
}

export default SuccessScreen
