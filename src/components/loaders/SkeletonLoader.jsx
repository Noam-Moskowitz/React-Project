import React from 'react'
import SkeletonCard from './SkeletonCard'

const SkeletonLoader = () => {
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3  gap-8 p-10 animate-pulse'>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    )
}

export default SkeletonLoader
