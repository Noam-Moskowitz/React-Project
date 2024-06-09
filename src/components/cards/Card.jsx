import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';

const Card = ({ content }) => {

    const { data, callApi, isLoading, apiErrors, errorFlag, METHOD } = useApi()

    const [isLiked, setIsLiked] = useState(false);


    const handleLike = () => {
        setIsLiked(!isLiked)

        const token = localStorage.getItem(`token`);

        if (!token) {
            console.log(`no token`)
            return
        };

        console.log(token);
        console.log(content._id);

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/`,
            METHOD.LIKE,
            content._id,
            token
        )

        callApi(newRequest)
    }

    useEffect(() => {
        if (data) {
            console.log(data);
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
                    {content.likes.length}
                </div>

            </div>
        </div>
    )
}

export default Card
