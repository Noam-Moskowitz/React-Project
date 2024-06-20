import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../hooks/useApi';
import { RequestObject } from '../models/RequestObject';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RateMyBusiness from './RateMyBusiness';
import CustomLoader from './loaders/CustomLoader';
import useThemeColor from '../hooks/useThemeColor';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LanguageIcon from '@mui/icons-material/Language';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Height } from '@mui/icons-material';

const BusinessPage = ({ open, setOpen, setHovering, id }) => {

    const { data, callApi, isLoading, apiErrors, errorFlag, successFlag, METHOD } = useApi();
    const { textColor } = useThemeColor()

    const [content, setContent] = useState();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleClose = () => {
        setOpen(false);
        setHovering(false)
    }

    useEffect(() => {
        if (open) {
            const newRequest = new RequestObject(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                METHOD.GET_ONE,
            )

            callApi(newRequest);
        }

    }, [open])



    useEffect(() => {
        if (data) {
            console.log(data);
            setContent(data)
        }
    }, [data])


    return (
        <div>
            {content &&
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    style={{ color: textColor, overflowY: `scroll` }}
                >
                    <Box sx={style}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography id="modal-title" variant="h6" component="h2">
                                Business Information
                            </Typography>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <img src={content && content.image.url} alt={content && content.image.alt} style={{ width: '100%', marginBottom: '16px' }} />
                        <Box className='text-center'>
                            <Typography>
                                <h1
                                    className='text-3xl uppercase underline font-bold'
                                >
                                    {content.title}
                                </h1>
                            </Typography>
                            <Typography >
                                <p className='text-lg pb-3'>
                                    {content.subtitle}
                                </p>
                            </Typography>
                            <Typography >
                                <p className='text-left pb-4'>
                                    {content.description}
                                </p>
                            </Typography>
                            <Typography className='flex gap-2 border-y-2'>
                                <div>
                                    {`${content.address.street} ${content.address.houseNumber} ${content.address.city}, ${content.address.zip}`}
                                </div>
                                <div>{`${content.address.country}`}</div>
                            </Typography>
                            <Typography >
                                <RateMyBusiness />
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={2}>

                            <a href={`tel:${content.phone}`}>
                                <Button variant="contained" startIcon={<PhoneInTalkIcon />} color="primary" >
                                    Call us
                                </Button>
                            </a>
                            <a href={content.web} target='_blank'>
                                <Button variant="contained" startIcon={<LanguageIcon />} color="primary">
                                    Visit Website
                                </Button>
                            </a>
                            <a href={`mailto:${content.email}`}>
                                <Button variant="contained" color="primary" startIcon={<AlternateEmailIcon />}>
                                    Email Us
                                </Button>
                            </a>
                        </Box>
                    </Box>
                </Modal>
            }
        </div>
    )
}

export default BusinessPage
