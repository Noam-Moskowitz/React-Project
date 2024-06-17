import React, { useEffect, useState } from 'react'
import useApi from '../../../hooks/useApi';
import { RequestObject } from '../../../models/RequestObject';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Alert, Badge, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

const FavoriteButton = ({ likesArr, likesCount, id, userId }) => {
    const { data, callApi, apiErrors, successFlag, errorFlag, METHOD } = useApi();

    const [isLiked, setIsLiked] = useState(false)
    const [likeAmount, setLikeAmount] = useState(likesCount);

    const handleLike = () => {
        setIsLiked(!isLiked)

        const token = localStorage.getItem(`token`);

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

    useEffect(() => {
        for (let like of likesArr) {

            if (like === userId) {
                setIsLiked(true)
            }
        }
    }, [])

    useEffect(() => {
        if (id) {
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
                <div className='flex items-center justify-center w-screen  fixed top-12 left-0  '>
                    {isLiked ?
                        <Alert className='animate-bounce' severity='success'>Succesfully added card to favorites!</Alert>
                        :
                        <Alert className='animate-bounce' severity='success'>Succesfully removed card from favorites!</Alert>
                    }
                </div>
            }
        </div>
    )
}

export default FavoriteButton
