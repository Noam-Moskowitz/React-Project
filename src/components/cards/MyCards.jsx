import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import SkeletonLoader from '../loaders/SkeletonLoader';
import useThemeColor from '../../hooks/useThemeColor';


const MyCards = () => {

    const { data, callApi, isLoading, apiErrors, METHOD } = useApi();
    const { primaryColor, contrastTextColor, backgroundColor } = useThemeColor()
    const [cards, setCards] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem(`token`);
        if (!token) {
            //notify no log in
            navigate(`/`)
            return
        }

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards`,
            METHOD.GET_MY_CARDS,
            null,
            token
        )

        callApi(newRequest)
    }, [])

    useEffect(() => {
        if (data) {
            setCards(data)
            console.log(data);
        }
    }, [data])

    if (isLoading) return <SkeletonLoader />

    return (
        <div className='h-screen' style={{ backgroundColor: backgroundColor }}>

            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 p-6 md:p-10  gap-8 '>
                {cards && cards.map(card => (<Card content={card} />))}
            </div>
        </div>
    )
}

export default MyCards
