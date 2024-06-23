import React, { useEffect } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useThemeColor from '../../hooks/useThemeColor';

const ModalSuccessScreen = ({ title, setOpenModal, setSuccesScreen }) => {
    const { textColor } = useThemeColor()

    useEffect(() => {
        setTimeout(() => {
            setOpenModal(false)
            setSuccesScreen(null)
        }, 1500)
    }, [])
    return (
        <div className='flex flex-col items-center md:p-10'>
            <h1
                className='md:text-3xl w-full text-center font-bold pb-8'
                style={{ color: textColor }}
            >User {title === `delete` ? `Deleted` : `Edited`} Succesfully</h1>
            <CheckCircleIcon
                color='primary'
                sx={{ fontSize: `80px` }}
                className='animate-bounce'
            />
        </div>
    )
}

export default ModalSuccessScreen
