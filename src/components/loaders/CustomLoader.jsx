import React from 'react'
import useThemeColor from '../../hooks/useThemeColor'

const CustomLoader = () => {
    const { primaryColor, backgroundColor } = useThemeColor()
    return (
        <div
            className='w-screen h-screen flex flex-col items-center justify-center'
            style={{ backgroundColor: backgroundColor }}
        >
            <div
                className='h-[120px] w-[120px]  border-8  rounded-full  animate-spin'
                style={{ borderTopColor: primaryColor }}
            ></div>
            <h1
                className='p-2 text-2xl  font-bold  animate-pulse'
                style={{ color: primaryColor }}
            >Loading</h1>
        </div>
    )
}

export default CustomLoader
