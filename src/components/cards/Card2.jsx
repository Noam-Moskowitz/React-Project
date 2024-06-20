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
import BusinessPage from '../BusinessPage';

const Card2 = ({ content }) => {

    const { data, callApi, apiErrors, successFlag, errorFlag, METHOD } = useApi()
    const userInfo = useSelector((state) => state.userInfo)
    const { primaryColor, backgroundColor, textColor } = useThemeColor()
    const navigate = useNavigate();

    const [hovering, setHovering] = useState(false);
    const [open, setOpen] = useState(false)
    return (
        <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Card>
                <CardHeader
                    style={{ position: `relative` }}
                    title={content.title}
                    subheader={content.subtitle}
                    action={
                        hovering && (
                            <Button
                                style={{ position: 'absolute' }}
                                className='slide-in'
                                color='primary'
                                variant='contained'
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => { setOpen(true) }}
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
                                likesCount={content.likes.length + 1}
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
            </Card>
            <BusinessPage open={open} setOpen={setOpen} setHovering={setHovering} id={content._id} />
        </div>

    )
}

export default Card2
