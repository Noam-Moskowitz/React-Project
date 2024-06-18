import React from 'react'
import SkeletonCard from './SkeletonCard'
import useThemeColor from '../../hooks/useThemeColor';

const SkeletonLoader = () => {
    const { backgroundColor } = useThemeColor();
    return (
        <div
            className='grid md:grid-cols-2 lg:grid-cols-4  gap-8 p-10 animate-pulse'
            style={{ backgroundColor: backgroundColor }}
        >
            <SkeletonCard />
            <SkeletonCard />
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
