import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import { RequestObject } from '../../models/RequestObject';
import Card from './Card';
import SkeletonLoader from '../loaders/SkeletonLoader';
import useThemeColor from '../../hooks/useThemeColor';

const CardsPage = () => {
    const { data, callApi, isLoading, apiErrors, METHOD } = useApi();
    const { backgroundColor } = useThemeColor();
    const [cards, setCards] = useState()

    useEffect(() => {
        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`,
            METHOD.GET_ALL,
        )

        callApi(newRequest)
    }, [])

    useEffect(() => {
        if (data) {
            setCards(data)
        }
    }, [data])

    if (isLoading) return <SkeletonLoader />

    return (
        <div
            className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 p-6 md:p-10  gap-8 '
            style={{ backgroundColor: backgroundColor }}
        >
            {cards && cards.map(card => (<Card content={card} />))}
        </div>
    )
}

export default CardsPage

