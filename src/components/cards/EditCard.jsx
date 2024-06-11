import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import useThemeColor from '../../hooks/useThemeColor';

const EditCard = () => {

    const { primaryColor, backgroundColor } = useThemeColor();

    const [formErrors, setFromErrors] = useState()



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
                        required
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Subtitle'
                        error={formErrors && formErrors.last ? true : false}
                        helperText={formErrors && formErrors.last}
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
                        />

                        <TextField
                            id="outlined-error-helper-text"
                            type="email"
                            label='Email'
                            error={formErrors && formErrors.street ? true : false}
                            helperText={formErrors && formErrors.street}
                            required
                        />
                    </div>
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Website URL'
                        error={formErrors && formErrors.houseNumber ? true : false}
                        helperText={formErrors && formErrors.houseNumber}
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Image URL'
                        error={formErrors && formErrors.city ? true : false}
                        helperText={formErrors && formErrors.city}
                    />
                    <TextField
                        id="outlined-error-helper-text"
                        type="text"
                        label='Image Description'
                    />

                    <div className='flex justify-around'>
                        <TextField
                            id="outlined-error-helper-text"
                            type="text"
                            label='Street'
                            error={formErrors && formErrors.country ? true : false}
                            helperText={formErrors && formErrors.country}
                            required
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            type="number"
                            label='House Number'
                            error={formErrors && formErrors.zip ? true : false}
                            helperText={formErrors && formErrors.zip}
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
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            type="number"
                            label='Zip'
                            error={formErrors && formErrors.zip ? true : false}
                            helperText={formErrors && formErrors.zip}
                            required
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
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            type="text"
                            label='State'
                            error={formErrors && formErrors.zip ? true : false}
                            helperText={formErrors && formErrors.zip}
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
