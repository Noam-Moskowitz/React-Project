import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import useToken from '../../hooks/useToken';
import { RequestObject } from '../../models/RequestObject';
import { Button, TextField } from '@mui/material';
import useValidation from '../../hooks/useValidation';
import useThemeColor from '../../hooks/useThemeColor';
import Notify from '../Notify';

const UserEdit = ({ user, setOpenModal, updateTableEdit, handleSuccess }) => {


    const { data, callApi, METHOD, errorFlag, apiErrors } = useApi();
    const { token } = useToken();
    const { validate, formErrors, ACTION_TYPES } = useValidation()
    const { primaryColor } = useThemeColor()

    const [newUser, setNewUser] = useState(user);

    const handleSubmit = () => {

        delete newUser.password;

        if (!validate({ type: ACTION_TYPES.USER, payload: newUser })) return


        const cleanedObject = {
            name: { ...newUser.name },
            phone: newUser.phone,
            address: { ...newUser.address },
            image: { ...newUser.image }
        }

        delete cleanedObject.name._id
        delete cleanedObject.address._id
        delete cleanedObject.image._id
        delete cleanedObject._id

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`,
            METHOD.UPDATE,
            cleanedObject,
            token
        )

        callApi(newRequest)

    }

    useEffect(() => {
        if (data) {
            setNewUser(data)
            updateTableEdit(data)
            handleSuccess(`edit`)
        }
    }, [data])


    return (
        <div className='flex flex-col gap-4 p-10'>
            <h1
                className='text-3xl uppercase text-center font-bold pb-4'
                style={{ color: primaryColor }}
            >Edit User</h1>
            <div className='flex flex-col md:flex-row gap-2 '>
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='First Name'
                    required
                    error={formErrors && formErrors.firstName ? true : false}
                    helperText={formErrors && formErrors.firstName}
                    value={newUser.name.first}
                    onChange={(e) => setNewUser({ ...user, name: { ...newUser.name, first: e.target.value } })}
                />
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='Middle Name'
                    value={newUser.name.middle}
                    onChange={(e) => setNewUser({ ...user, name: { ...newUser.name, middle: e.target.value } })}
                />
            </div>
            <div className='flex flex-col md:flex-row gap-2'>
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='Last Name'
                    required
                    error={formErrors && formErrors.lastName ? true : false}
                    helperText={formErrors && formErrors.lastName}
                    value={newUser.name.last}
                    onChange={(e) => setNewUser({ ...user, name: { ...newUser.name, last: e.target.value } })}
                />
                <TextField
                    id="outlined-error-helper-text"
                    type='tel'
                    label='Phone Number'
                    required
                    error={formErrors && formErrors.phone ? true : false}
                    helperText={formErrors && formErrors.phone}
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...user, phone: e.target.value })}
                />
            </div>
            <div className='flex flex-col md:flex-row gap-2'>
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='Street'
                    required
                    error={formErrors && formErrors.street ? true : false}
                    helperText={formErrors && formErrors.street}
                    value={newUser.address.street}
                    onChange={(e) => setNewUser({ ...user, address: { ...newUser.address, street: e.target.value } })}
                />
                <TextField
                    id="outlined-error-helper-text"
                    type='number'
                    label='House Number'
                    required
                    error={formErrors && formErrors.houseNumber ? true : false}
                    helperText={formErrors && formErrors.houseNumber}
                    value={newUser.address.houseNumber}
                    onChange={(e) => setNewUser({ ...user, address: { ...newUser.address, houseNumber: e.target.value } })}
                />
            </div>
            <div className='flex flex-col md:flex-row gap-2'>
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='City'
                    required
                    error={formErrors && formErrors.city ? true : false}
                    helperText={formErrors && formErrors.city}
                    value={newUser.address.city}
                    onChange={(e) => setNewUser({ ...user, address: { ...newUser.address, city: e.target.value } })}
                />
                <TextField
                    id="outlined-error-helper-text"
                    type='number'
                    label='Zip'
                    required
                    error={formErrors && formErrors.zip ? true : false}
                    helperText={formErrors && formErrors.zip}
                    value={newUser.address.zip}
                    onChange={(e) => setNewUser({ ...user, address: { ...newUser.address, zip: e.target.value } })}
                />
            </div>
            <div className='flex flex-col md:flex-row gap-2'>
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='State'
                    value={newUser.address.state}
                    onChange={(e) => setNewUser({ ...user, address: { ...newUser.address, state: e.target.value } })}
                />
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='Country'
                    required
                    error={formErrors && formErrors.country ? true : false}
                    helperText={formErrors && formErrors.country}
                    value={newUser.address.country}
                    onChange={(e) => setNewUser({ ...user, address: { ...newUser.address, country: e.target.value } })}
                />
            </div>
            <div className='flex justify-end gap-4'>
                <Button
                    variant='contained'
                    onClick={() => setOpenModal(false)}
                >Back</Button>
                <Button
                    variant='contained'
                    disabled={newUser == user ? true : false}
                    onClick={handleSubmit}
                >Update</Button>
            </div>
            {errorFlag &&
                <Notify severity='error' message={`${apiErrors.response.status}: ${apiErrors.response.data}`} />
            }
        </div>
    )
}

export default UserEdit
