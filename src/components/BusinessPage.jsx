import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../hooks/useApi';
import { RequestObject } from '../models/RequestObject';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RateMyBusiness from './RateMyBusiness';
import CustomLoader from './loaders/CustomLoader';
import useThemeColor from '../hooks/useThemeColor';

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
        overflowY: 'scroll',
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
                    style={{ color: textColor }}
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
                            <Typography >
                                <RateMyBusiness />
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button variant="contained" color="primary" onClick={() => alert('Get Directions')}>
                                Get Directions
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => alert('Call')}>
                                Call
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => alert('Call')}>
                                Call
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => alert('Call')}>
                                Call
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            }
        </div>
    )
}

export default BusinessPage
