import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useThemeColor from '../../hooks/useThemeColor';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import CustomLoader from '../loaders/CustomLoader';

const EditCard = () => {
    const { id } = useParams();
    const { primaryColor, backgroundColor } = useThemeColor();
    const { data, callApi, isLoading, apiErrors, errorFlag, successFlag, METHOD } = useApi();

    const [content, setContent] = useState()
    const [formErrors, setFromErrors] = useState()

    useEffect(() => {
        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/`,
            METHOD.GET_ONE,
            id
        )

        callApi(newRequest);
    }, [])

    useEffect(() => {
        if (data) {
            setContent(data)
        }
    }, [data])


    if (isLoading) return <CustomLoader />

    return (
        <div className='px-80 py-20'>
            <form
                className='border-4 px-20 rounded  py-10 flex-col'
                style={{ backgroundColor: backgroundColor, borderColor: primaryColor }}
            >
                <div className='flex flex-col   my-6 justify-center gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Title'
                        error={formErrors && formErrors.first ? true : false}
                        helperText={formErrors && formErrors.first}
                        value={content && content.title}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Subtitle'
                        error={formErrors && formErrors.last ? true : false}
                        helperText={formErrors && formErrors.last}
                        value={content && content.subtitle}
                        required
                    />
                    <TextField
                        id="outlined-multiline-static"
                        type="text"
                        label='Description'
                        multiline
                        rows={4}
                        error={formErrors && formErrors.phone ? true : false}
                        helperText={formErrors && formErrors.phone}
                        value={content && content.description}
                        required
                    />
                    <div className='flex justify-around'>
                        <TextField
                            id="outlined-error-helper-text"
                            type="tel"
                            label='Phone Number'
                            error={formErrors && formErrors.email ? true : false}
                            helperText={formErrors && formErrors.email}
                            required
                            value={content && content.phone}
                        />

                        <TextField
                            id="outlined-error-helper-text"
                            type="email"
                            label='Email'
                            error={formErrors && formErrors.street ? true : false}
                            helperText={formErrors && formErrors.street}
                            required
                            value={content && content.email}
                        />
                    </div>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Website URL'
                        error={formErrors && formErrors.houseNumber ? true : false}
                        helperText={formErrors && formErrors.houseNumber}
                        value={content && content.web}
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Image URL'
                        error={formErrors && formErrors.city ? true : false}
                        helperText={formErrors && formErrors.city}
                        value={content && content.image.url}
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Image Description'
                        value={content && content.image.alt}
                    />

                    <div className='flex justify-around'>
                        <TextField
                            id="outlined-error-helper-text"
                            type="text"
                            label='Street'
                            error={formErrors && formErrors.country ? true : false}
                            helperText={formErrors && formErrors.country}
                            value={content && content.address.street}
                            required
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            type="number"
                            label='House Number'
                            error={formErrors && formErrors.zip ? true : false}
                            helperText={formErrors && formErrors.zip}
                            value={content && content.address.houseNumber}
                            required
                        />
                    </div>
                    <div className='flex justify-around'>
                        <TextField
                            id="outlined-error-helper-text"
                            type="text"
                            label='City'
                            error={formErrors && formErrors.country ? true : false}
                            helperText={formErrors && formErrors.country}
                            required
                            value={content && content.address.city}
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            type="number"
                            label='Zip'
                            error={formErrors && formErrors.zip ? true : false}
                            helperText={formErrors && formErrors.zip}
                            required
                            value={content && content.address.zip}
                        />
                    </div>
                    <div className='flex justify-around'>
                        <TextField
                            id="outlined-error-helper-text"
                            type="text"
                            label='Country'
                            error={formErrors && formErrors.country ? true : false}
                            helperText={formErrors && formErrors.country}
                            required
                            value={content && content.address.country}
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            type="text"
                            label='State'
                            error={formErrors && formErrors.zip ? true : false}
                            helperText={formErrors && formErrors.zip}
                            value={content && content.address.state}
                        />
                    </div>
                </div>
                <div>
                    <Button style={{ width: '100%' }} variant='contained'>Submit</Button>
                </div>
            </form >
        </div >
    )
}

export default EditCard
