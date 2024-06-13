import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useThemeColor from '../../hooks/useThemeColor';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import CustomLoader from '../loaders/CustomLoader';
import useValidation from '../../hooks/useValidation';

const EditCard = () => {
    const { id } = useParams();
    const { primaryColor, backgroundColor } = useThemeColor();
    const { data, callApi, isLoading, apiErrors, errorFlag, successFlag, METHOD } = useApi();
    const { validate, ACTION_TYPES, formErrors } = useValidation();

    const [content, setContent] = useState()

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

    const cleanObject = (obj) => {
        const keysToRemove = ["bizNumber", "createdAt", "image._id", "likes", "user_id", "__v", "_id"];

        return Object.entries(obj).reduce((acc, [key, value]) => {
            if (!keysToRemove.includes(key) && !(key === "image" && value && typeof value === 'object' && keysToRemove.includes(`${key}._id`))) {
                acc[key] = value;
            } else if (key === "image" && value && typeof value === 'object') {
                acc[key] = { ...value };
                delete acc[key]._id;
            }
            return acc;
        }, {});
    }

    const handleSubmit = () => {
        if (!validate({ type: ACTION_TYPES.CARD, payload: content })) return


        const updateContent = cleanObject(content);
        const token = localStorage.getItem(`token`)

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${content._id}`,
            METHOD.UPDATE_CARD,
            updateContent,
            token
        )

        callApi(newRequest);


    }


    if (isLoading) return <CustomLoader />

    return (
        <div className='px-80 py-20'>
            <form
                className='border-4 px-20 rounded  py-10 flex-col'
                style={{ backgroundColor: backgroundColor, borderColor: primaryColor }}
            >
                <h1 className='font-bold text-center text-3xl pb-6 underline' >Edit Card</h1>
                <div className='flex flex-col   my-6 justify-center gap-6'>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Title'
                        error={formErrors && formErrors.title ? true : false}
                        helperText={formErrors && formErrors.title}
                        value={content && content.title}
                        onChange={(e) => setContent({ ...content, title: e.target.value })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Subtitle'
                        error={formErrors && formErrors.subtitle ? true : false}
                        helperText={formErrors && formErrors.subtitle}
                        value={content && content.subtitle}
                        onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Description'
                        multiline
                        rows={4}
                        error={formErrors && formErrors.description ? true : false}
                        helperText={formErrors && formErrors.description}
                        value={content && content.description}
                        onChange={(e) => setContent({ ...content, description: e.target.value })}
                        required
                    />
                    <div className='flex justify-around'>
                        <TextField
                            id="outlined-error-helper-text"
                            type="tel"
                            label='Phone Number'
                            error={formErrors && formErrors.phone ? true : false}
                            helperText={formErrors && formErrors.phone}
                            required
                            value={content && content.phone}
                            onChange={(e) => setContent({ ...content, phone: e.target.value })}
                        />

                        <TextField
                            id="outlined-error-helper-text"
                            type="email"
                            label='Email'
                            error={formErrors && formErrors.email ? true : false}
                            helperText={formErrors && formErrors.email}
                            required
                            value={content && content.email}
                            onChange={(e) => setContent({ ...content, email: e.target.value })}
                        />
                    </div>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Website URL'
                        error={formErrors && formErrors.web ? true : false}
                        helperText={formErrors && formErrors.web}
                        value={content && content.web}
                        onChange={(e) => setContent({ ...content, web: e.target.value })}
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Image URL'
                        error={formErrors && formErrors.imageUrl ? true : false}
                        helperText={formErrors && formErrors.imageUrl}
                        value={content && content.image.url}
                        onChange={(e) => setContent({ ...content, image: { ...content.image, url: e.target.value } })}
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Image Description'
                        error={formErrors && formErrors.imageDescription ? true : false}
                        helperText={formErrors && formErrors.imageDescription}
                        value={content && content.image.alt}
                        onChange={(e) => setContent({ ...content, image: { ...content.image, alt: e.target.value } })}
                        required
                    />

                    <div className='flex justify-around'>
                        <TextField
                            id="outlined-error-helper-text"
                            type="text"
                            label='Street'
                            error={formErrors && formErrors.street ? true : false}
                            helperText={formErrors && formErrors.street}
                            value={content && content.address.street}
                            onChange={(e) => setContent(
                                { ...content, address: { ...content.address, street: e.target.value } }
                            )}
                            required
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            type="number"
                            label='House Number'
                            error={formErrors && formErrors.houseNumber ? true : false}
                            helperText={formErrors && formErrors.houseNumber}
                            value={content && content.address.houseNumber}
                            required
                            onChange={(e) => setContent(
                                { ...content, address: { ...content.address, houseNumber: e.target.value } }
                            )}
                        />
                    </div>
                    <div className='flex justify-around'>
                        <TextField
                            id="outlined-error-helper-text"
                            type="text"
                            label='City'
                            error={formErrors && formErrors.city ? true : false}
                            helperText={formErrors && formErrors.city}
                            required
                            value={content && content.address.city}
                            onChange={(e) => setContent(
                                { ...content, address: { ...content.address, city: e.target.value } }
                            )}
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            type="number"
                            label='Zip'
                            value={content && content.address.zip}
                            onChange={(e) => setContent(
                                { ...content, zip: { ...content.address, street: e.target.value } }
                            )}
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
                            onChange={(e) => setContent(
                                { ...content, address: { ...content.address, country: e.target.value } }
                            )}
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            type="text"
                            label='State'
                            error={formErrors && formErrors.zip ? true : false}
                            helperText={formErrors && formErrors.zip}
                            value={content && content.address.state}
                            onChange={(e) => setContent(
                                { ...content, state: { ...content.address, street: e.target.value } }
                            )}
                        />
                    </div>
                </div>
                <div>
                    <Button style={{ width: '100%' }} variant='contained' onClick={handleSubmit}>Submit</Button>
                </div>
            </form >
        </div >
    )
}

export default EditCard