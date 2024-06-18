import React, { useEffect, useState } from 'react'

import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LanguageIcon from '@mui/icons-material/Language';

import useThemeColor from '../../hooks/useThemeColor';
import { useNavigate } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';

import FavoriteButton from './card_buttons/FavoriteButton';
import EditButton from './card_buttons/EditButton';
import DeleteButton from './card_buttons/DeleteButton';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';

const Card2 = ({ content }) => {

    const { data, callApi, apiErrors, successFlag, errorFlag, METHOD } = useApi()
    const userInfo = useSelector((state) => state.userInfo)
    const { primaryColor, backgroundColor, textColor } = useThemeColor()
    const navigate = useNavigate();

    const [hovering, setHovering] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Card>
                <CardHeader
                    style={{position:`relative`}}
                    title={content.title}
                    subheader={content.subtitle}
                    action={
                        hovering && (
                            <Button
                                style={{position:'absolute' }}
                                className='slide-in'
                                color='primary'
                                variant='contained'
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => navigate(`/business/${content._id}`)}
                            >
                                See More
                            </Button>
                        )
                    }
                />
                <CardMedia
                    component='img'
                    sx={{ height: 240 }}
                    image={content.image.url}
                    alt={content.image.alt}
                />
                <CardContent>
                    <Typography>
                        <div>
                            {content.description}
                        </div>
                        <div className='flex flex-col  justify-around gap-2 py-2'>
                            <a href={`mailto:${content.email}`}>
                                <div
                                    className='flex items-center gap-2'
                                >
                                    <AlternateEmailIcon
                                        color='primary'
                                        fontSize='small'
                                    />
                                    <div>
                                        {content.email}
                                    </div>
                                </div>
                            </a>
                            <a href={`tel:${content.phone}`}>
                                <div
                                    className='flex items-center gap-2'
                                >
                                    <PhoneInTalkIcon
                                        color='primary'
                                        fontSize='small'
                                    />
                                    <div>{content.phone}</div>
                                </div>
                            </a>
                            <a
                                href={content.web}
                                target='blank'
                                noopener
                                noreferer
                            >
                                <div
                                    className='flex items-center gap-2'
                                >
                                    <LanguageIcon
                                        color='primary'
                                        fontSize='small'
                                    />
                                    <div>Visit Website</div>
                                </div>
                            </a>
                        </div>
                        <div className='flex gap-2'>
                            <ApartmentIcon color='primary' />
                            <div>
                                {`${content.address.street} ${content.address.houseNumber} ${content.address.city}, ${content.address.zip}`}
                            </div>
                            <div>{`${content.address.country}`}</div>
                        </div>
                    </Typography>
                </CardContent>
                <CardActions>
                    {userInfo._id &&
                        <div className='flex items-center gap-4'>
                            <FavoriteButton
                                likesArr={content.likes}
                                likesCount={content.likes.length}
                                id={content._id}
                                userId={userInfo._id}
                            />
                            {userInfo._id === content.user_id &&
                                <div className='flex items-center gap-4'>
                                    <EditButton
                                        id={content._id}
                                    />
                                    <DeleteButton
                                        id={content._id}
                                        bizNumber={content.bizNumber}
                                    />
                                </div>
                            }
                        </div>
                    }
                </CardActions>
                {/* <div className='border-2 rounded-lg bg-slate-200 p-2 flex flex-col justify-between h-full w-full'>
            <div
                className='h-[50%]  relative  overflow-hidden'
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                {hovering &&
                    <div
                        className='w-full h-full slide-in z-10 rounded  flex items-center justify-center'
                        style={{ backgroundColor: primaryColor }}
                    >
                        <div
                            style={{ backgroundColor: backgroundColor, color: textColor }}
                            className='rounded-full hover:cursor-pointer font-bold text-xl p-4 hover:opacity-75'
                            onClick={() => navigate(`/business/${content._id}`)}
                        >
                            View Business
                        </div>
                    </div>
                }
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
            {userInfo._id &&
                <div className='flex items-center justify-center gap-8'>
                    {userInfo._id === content.user_id &&
                        <div className='flex gap-8'>
                            <EditButton id={content._id} />
                            <DeleteButton
                                id={content._id}
                                bizNumber={content.bizNumber}
                            />

                        </div>
                    }
                    <FavoriteButton
                        likesArr={content.likes}
                        likesCount={content.likes.length}
                        id={content._id}
                        userId={userInfo._id}
                    />
                </div>
            }

            {
                errorFlag && <div className='flex items-center absolute top-12'>
                    <Alert className='animate-bounce' severity='error'>{`${apiErrors.response.status}: ${apiErrors.response.data}`}</Alert>
                </div>
            }


        </div > */}
            </Card>
        </div>

    )
}

export default Card2
