import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import { RequestObject } from '../../models/RequestObject';
import Card from './Card';
import SkeletonLoader from '../loaders/SkeletonLoader';
import useThemeColor from '../../hooks/useThemeColor';
import { useNavigate, useParams } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import Card2 from './Card2';
import { Button } from '@mui/material';


const CardsPage = () => {
    const { data, callApi, isLoading, apiErrors, METHOD } = useApi();
    const userAuthKeys = useSelector(store => store.userInfo);
    const searchValue = useSelector(store => store.search);
    const { token, checkToken } = useToken();
    const { backgroundColor } = useThemeColor();
    const { type } = useParams();
    const navigate = useNavigate();


    const [cards, setCards] = useState()

    useEffect(() => {
        if (searchValue) {
            console.log(searchValue);
            const filteredCards = cards.filter(card =>
                Object.values(card).some(value =>
                    String(value).toLowerCase().includes(searchValue.toLowerCase())
                )
            );
            setCards(filteredCards)
        } else {
            setCards(data)
        }
    }, [searchValue])

    useEffect(() => {
        if (type === `myCards`) {
            const newRequest = new RequestObject(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards`,
                METHOD.GET_MY_CARDS,
                null,
                token
            )

            callApi(newRequest);
            return
        }

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`,
            METHOD.GET_ALL,
        )

        callApi(newRequest)

    }, [type])

    useEffect(() => {
        if (data) {
            if (type === `myFavorites`) {
                const filteredArray = data.filter(obj => obj.likes.some(like => like === userAuthKeys._id));
                setCards(filteredArray)
            } else {
                setCards(data)
            }
        }
    }, [data])

    if (isLoading) return <SkeletonLoader />

    return (
        <div>
            {userAuthKeys.isBusiness && type === `myCards` &&
                <div div className='flex px-6 pt-6' >
                    <Button
                        variant='contained'
                        endIcon={<AddIcon />}
                        onClick={() => navigate(`/card/create`)}
                    >Add Card</Button>
                </div>
            }
            <div
                className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-flow-cols-4 p-6 md:p-10  gap-8 '
                style={{ backgroundColor: backgroundColor }}
            >
                {cards && cards.map(card => (<Card2 content={card} />))}
            </div>
        </div >
    )
}

export default CardsPage

