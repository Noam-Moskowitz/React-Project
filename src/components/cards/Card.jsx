import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useThemeColor from '../../hooks/useThemeColor';
import { useNavigate } from 'react-router-dom';
import { Badge, Modal, Box, Button, Typography } from '@mui/material';

const Card = ({ content }) => {

    const { data, callApi, apiErrors, successFlag, errorFlag, METHOD } = useApi()
    const userInfo = useSelector((state) => state.userInfo)
    const { primaryColor, backgroundColor, textColor } = useThemeColor()
    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(false);
    const [likeAmount, setLikeAmount] = useState(content.likes.length);
    const [hovering, setHovering] = useState(false);
    const [open, setOpen] = useState(false);


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

    const handleDelete = () => {
        const token = localStorage.getItem(`token`);

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${content._id}`,
            METHOD.DELETE,
            content.bizNumber,
            token
        )

        callApi(newRequest);
        setOpen(false);
    }

    useEffect(() => {
        console.log(content);
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
        <div className='border-2 rounded-lg bg-slate-200 p-2 flex flex-col justify-between h-full w-full'>
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
                            <div
                                className='hover:bg-blue-200 rounded-md p-2 hover:cursor-pointer'
                                onClick={() => navigate(`/card/edit/${content._id}`)}
                            >
                                <EditIcon color='primary' />
                            </div>
                            <div
                                className='hover:bg-red-200 rounded-md p-2 hover:cursor-pointer'
                                onClick={() => setOpen(!open)}
                            >
                                <DeleteIcon color='error' />

                            </div>
                            <Modal
                                open={open}
                                onClose={() => setOpen(false)}
                                aria-labelledby="delete-confirmation-modal"
                                aria-describedby="confirm-or-cancel-deletion"
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: 300,
                                        bgcolor: 'background.paper',
                                        border: '2px solid #000',
                                        boxShadow: 24,
                                        p: 4,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography id="delete-confirmation-modal" variant="h6" component="h2">
                                        Confirm Deletion
                                    </Typography>
                                    <Typography id="confirm-or-cancel-deletion" sx={{ mt: 2 }}>
                                        Are you sure you want to delete this item?
                                    </Typography>
                                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                                        <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button variant="contained" color="error" onClick={handleDelete}>
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </Modal>
                        </div>
                    }
                    <div>
                        <div
                            className='hover:cursor-pointer active:animate-ping'
                            onClick={handleLike}
                        >
                            <Badge color='primary' invisible={likeAmount > 0 ? false : true} badgeContent={likeAmount}>
                                {isLiked ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon />}
                            </Badge>
                        </div>
                    </div>
                </div>
            }

            {
                errorFlag && <div className='flex items-center absolute top-12'>
                    <Alert className='animate-bounce' severity='error'>{`${apiErrors.response.status}: ${apiErrors.response.data}`}</Alert>
                </div>
            }

            {
                successFlag &&
                <div className='flex items-center fixed top-12 left-[40vw]'>
                    {isLiked ?
                        <Alert className='animate-bounce' severity='success'>Succesfully added card to favorites!</Alert>
                        :
                        <Alert className='animate-bounce' severity='success'>Succesfully removed card from favorites!</Alert>
                    }
                </div>
            }
        </div >
    )
}

export default Card
