import React from 'react'

const CustomLoader = () => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center '>
            <div className='h-[120px] w-[120px]  border-8  rounded-full border-t-blue-500 animate-spin'></div>
            <h1 className='p-2 text-2xl text-blue-500 font-bold  animate-pulse'>Loading</h1>
        </div>
    )
}

export default CustomLoader
