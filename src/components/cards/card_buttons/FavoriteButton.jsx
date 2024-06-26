import React, { useEffect, useState } from 'react'
import useApi from '../../../hooks/useApi';
import { RequestObject } from '../../../models/RequestObject';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Badge, Tooltip } from '@mui/material';
import Notify from '../../Notify';
import useToken from '../../../hooks/useToken'

const FavoriteButton = ({ likesArr, likesCount, id, userId }) => {
    //hooks
    const { data, callApi, apiErrors, successFlag, errorFlag, METHOD } = useApi();
    const {token}=useToken()

    //states
    const [isLiked, setIsLiked] = useState(false)
    const [likeAmount, setLikeAmount] = useState(likesCount);

    //functions
    const handleLike = () => {
        setIsLiked(!isLiked)

        if (!token) {
            console.log(`no token`)
            return
        };

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
            METHOD.LIKE,
            null,
            token
        )

        callApi(newRequest)
    }

    //useEffects
    useEffect(() => {
        for (let like of likesArr) {

            if (like === userId) {
                setIsLiked(true)
            }
        }
    }, [])

    useEffect(() => {
        if (isLiked) {
            setLikeAmount(likeAmount + 1)
        } else {
            setLikeAmount(likeAmount - 1)
        }
    }, [data])

    return (
        <div>
            <Tooltip title='Favorite'>
                <div
                    className='hover:cursor-pointer active:animate-ping'
                    onClick={handleLike}
                >
                    <Badge color='primary' invisible={likeAmount > 0 ? false : true} badgeContent={likeAmount}>
                        {isLiked ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon />}
                    </Badge>
                </div>
            </Tooltip>
            {
                successFlag &&
                <div>
                    {isLiked ?
                        <Notify severity='success' message='Card added to favorites!' />
                        :
                        <Notify severity='success' message='Card removed from favorites!' />
                    }
                </div>
            }
            {errorFlag &&
                <Notify severity='error' message={`${apiErrors.response.status}: ${apiErrors.response.data}`}/>
            }
        </div>
    )
}

export default FavoriteButton
