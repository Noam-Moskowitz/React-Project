import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import SkeletonLoader from '../loaders/SkeletonLoader';
import AddIcon from '@mui/icons-material/Add';
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
            <div className='flex px-6 pt-6' >
                <div
                    className='py-2 flex px-4  font-bold  rounded-lg shadow-xl hover:cursor-pointer'
                    style={{ backgroundColor: primaryColor, color: contrastTextColor }}
                    onClick={() => navigate(`/card/create`)}
                >
                    <AddIcon />
                    <p>Add Card</p>
                </div>
            </div>
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 p-6 md:p-10  gap-8 '>
                {cards && cards.map(card => (<Card content={card} />))}
            </div>
        </div>
    )
}

export default MyCards
