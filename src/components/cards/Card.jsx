import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import { useSelector } from 'react-redux';
import Alert  from '@mui/material/Alert';

const Card = ({ content }) => {

    const { data, callApi, apiErrors, successFlag, errorFlag, METHOD } = useApi()
    const userInfo = useSelector((state) => state.userInfo)

    const [isLiked, setIsLiked] = useState(false);
    const [likeAmount, setLikeAmount] = useState(content.likes.length)


    const handleLike = () => {
        setIsLiked(!isLiked)

        const token = localStorage.getItem(`token`);

        if (!token) {
            console.log(`no token`)
            return
        };



        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/`,
            METHOD.LIKE,
            content._id,
            token
        )

        callApi(newRequest)
    }

    useEffect(() => {
        for (let like of content.likes) {

            if (like === userInfo._id) {
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
        <div className='border-2 rounded-lg bg-slate-200 p-2 flex flex-col justify-between'>
            <div className='h-[50%]'>
                <img className='w-full h-full rounded' src={content.image.url} alt={content.image.alt} />
            </div>
            <div className='border-b-2 border-gray-400 '>
                <h2 className='text-3xl font-bold'>{content.title}</h2>
                <h3 className='text-xl'>{content.subtitle}</h3>
            </div>
            <div className='border-b-2 border-gray-400'>
                {content.description}
            </div>
            <div className='border-b-2 border-gray-400 flex flex-col  items-start md:flex-row md:justify-center      md:gap-8'>
                <div className='flex justify-center  p-1'>
                    <AlternateEmailIcon color='primary' />
                    <p className='px-1'>{content.email}</p>
                </div>
                <div className='flex justify-center  p-1'>
                    <PhoneInTalkIcon color='primary' />
                    <p className='px-1'>{content.phone}</p>
                </div>
            </div>
            <div className='border-b-2 border-gray-400 '>
                <p>{`${content.address.street} ${content.address.houseNumber}, ${content.address.city}, ${content.address.zip}`}</p>
                <p>{` ${content.address.country}`}</p>
            </div>
            <div className='flex items-end justify-center'>
                <div
                    className='hover:cursor-pointer active:animate-ping'
                    onClick={handleLike}
                >
                    {isLiked ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon />}
                </div>
                <div>
                    {likeAmount}
                </div>

            </div>

            {errorFlag && <div className='flex items-center absolute top-12'>
                <Alert className='animate-bounce' severity='error'>{`${apiErrors.response.status}: ${apiErrors.response.data}`}</Alert>
            </div>}

            {successFlag &&
                <div className='flex items-center fixed top-12 left-[40vw]'>
                    { isLiked ?
                        <Alert className='animate-bounce' severity='success'>Succesfully added card to favorites!</Alert>
                            :
                        <Alert className='animate-bounce' severity='success'>Succesfully removed card from favorites!</Alert>
                    }
                </div> 
            }
        </div>
    )
}

export default Card
