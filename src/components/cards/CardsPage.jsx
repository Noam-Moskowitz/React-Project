import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import { RequestObject } from '../../models/RequestObject';
import SkeletonLoader from '../loaders/SkeletonLoader';
import useThemeColor from '../../hooks/useThemeColor';
import { useNavigate, useParams } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import Card2 from './Card2';
import { Button} from '@mui/material';
import Notify from '../Notify';


const CardsPage = () => {
    //hooks
    const { data, callApi, isLoading, apiErrors, errorFlag, METHOD } = useApi();
    const userAuthKeys = useSelector(store => store.userInfo);
    const searchValue = useSelector(store => store.search);
    const { token } = useToken();
    const { primaryColor } = useThemeColor()
    const { type } = useParams();
    const navigate = useNavigate();

    //states
    const [cards, setCards] = useState()

    //useEffects
    useEffect(() => {
        if (searchValue) {
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
    if (cards && cards.length==0) return (
        <h1 
            style={{color:primaryColor}}
            className='h-screen text-center uppercase font-bold pt-20 text-3xl'
            >No cards were found!</h1>
    )

    return (
        <div className={cards && cards.length < 6 ? `md:h-screen` : ``}>
            {userAuthKeys.isBusiness && type === `myCards` &&
                <div  className='flex px-6 pt-6' >
                    <Button
                        variant='contained'
                        endIcon={<AddIcon />}
                        onClick={() => navigate(`/card/create`)}
                    >Add Card</Button>
                </div>
            }

            {searchValue &&
                <div className='flex justify-center pt-2 w-full text-lg' style={{color:primaryColor}}>
                    {cards.length} Results Found!
                </div>
            }

            <div
                className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6 md:p-10  gap-8'
            >
                {cards && cards.map(card => (<Card2 key={card._id} content={card} />))}
            </div>
            {errorFlag&&
                <Notify severity='error' message={`${apiErrors.response.status}: ${apiErrors.response.data}`}  />
            }
        </div>
    )
}

export default CardsPage

