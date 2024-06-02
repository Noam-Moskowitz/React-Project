import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import { useSelector } from 'react-redux';
import Card from './Card';
import SkeletonLoader from '../loaders/SkeletonLoader';

const Favorites = () => {

    const { data, callApi, isLoading, apiErrors, METHOD } = useApi();
    const [cards, setCards] = useState()
    const myId = useSelector(store => store.userInfo._id)

    useEffect(() => {
        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`,
            METHOD.GET_ALL,
        )

        callApi(newRequest)
    }, [])

    useEffect(() => {
        if (data) {
            console.log(data);
            const filteredArray = data.filter(obj => obj.likes.some(like => like === myId));
            setCards(filteredArray)
        }
    }, [data])

    if (isLoading) return <SkeletonLoader />

    return (
        <div>
            <div className='grid grid-cols-3  gap-8 p-10'>
                {cards && cards.map(card => (<Card content={card} />))}
            </div>
        </div>
    )
}

export default Favorites
