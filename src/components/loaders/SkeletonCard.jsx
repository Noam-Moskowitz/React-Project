import React from 'react'

const SkeletonCard = () => {
    return (
        <div className='flex flex-col gap-4  bg-gray-200 p-2 border-2 rounded-lg justify-between h-[80vh]'>
            <div className='w-full h-[50%] bg-gray-400 rounded '></div>
            <div className='bg-gray-400 rounded w-full h-15'></div>
            <div className='bg-gray-400 rounded w-full h-20'></div>
            <div className='bg-gray-400 rounded w-full h-10'></div>
            <div className='bg-gray-400 rounded w-full h-15'></div>
            <div className='bg-gray-400 rounded w-full h-5'></div>
        </div>
    )
}

export default SkeletonCard
