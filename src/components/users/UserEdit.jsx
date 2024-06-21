import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import useToken from '../../hooks/useToken';
import { RequestObject } from '../../models/RequestObject';
import { Button, TextField } from '@mui/material';
import useValidation from '../../hooks/useValidation';

const UserEdit = ({user, setOpenModal}) => {


    const {data, callApi, METHOD}=useApi();
    const {token}=useToken();
    const {validate, formErrors, ACTION_TYPES}=useValidation()

    const [newUser,setNewUser]=useState(user);
    const [title,setTitle]=useState(`Edit User`)

    const handleSubmit=()=>{

        if (!validate({type:ACTION_TYPES.USER, payload:newUser})) return


    const cleanedObject={
        ...newUser.name,
        ...newUser.phone,
        ...newUser.address,
    }
    console.log(cleanedObject);

    delete cleanedObject.name._id
    delete cleanedObject.address._id
    delete cleanedObject.image._id
    delete cleanedObject._id

    const newRequest= new RequestObject(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`,
        METHOD.UPDATE,
        cleanedObject,
        token
    )

        callApi(newRequest)

    }

    useEffect(()=>{
        if (data) {
            setNewUser(data)
            setTitle(`Update Succesful`)
        }
    },[data])

    
    return (
        <div className='flex flex-col gap-4 p-10'>
            <h1>{title}</h1>
            <div className='flex flex-col md:flex-row'>
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='First Name'
                    required
                    value={newUser.name.first}
                    onChange={(e)=>setNewUser({...user, name:{ ...newUser.name, first:e.target.value}})}
                />
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='Middle Name'
                    value={newUser.name.middle}
                    onChange={(e)=>setNewUser({...user, name:{ ...newUser.name, middle:e.target.value}})}
                />
            </div>
            <div className='flex flex-col md:flex-row'>
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='Last Name'
                    required
                    value={newUser.name.last}
                    onChange={(e)=>setNewUser({...user, name:{ ...newUser.name, last:e.target.value}})}
                />
                <TextField
                    id="outlined-error-helper-text"
                    type='tel'
                    label='Phone Number'
                    required
                    value={newUser.phone}
                    onChange={(e)=>setNewUser({...user, phone:e.target.value})}
                />
            </div>
            <div className='flex flex-col md:flex-row'>
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='Street'
                    required
                    value={newUser.address.street}
                    onChange={(e)=>setNewUser({...user, address:{ ...newUser.address, street:e.target.value}})}
                />
                <TextField
                    id="outlined-error-helper-text"
                    type='number'
                    label='House Number'
                    required
                    value={newUser.address.houseNumber}
                    onChange={(e)=>setNewUser({...user, address:{ ...newUser.address, houseNumber:e.target.value}})}
                />
            </div>
            <div className='flex flex-col md:flex-row'>
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='City'
                    required
                    value={newUser.address.city}
                    onChange={(e)=>setNewUser({...user, address:{ ...newUser.address, city:e.target.value}})}
                />
                <TextField
                    id="outlined-error-helper-text"
                    type='number'
                    label='Zip'
                    required
                    value={newUser.address.zip}
                    onChange={(e)=>setNewUser({...user, address:{ ...newUser.address, zip:e.target.value}})}
                />
            </div>
            <div className='flex flex-col md:flex-row'>
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='State'
                    value={newUser.address.state}
                    onChange={(e)=>setNewUser({...user, address:{ ...newUser.address, state:e.target.value}})}
                />
                <TextField
                    id="outlined-error-helper-text"
                    type='text'
                    label='Country'
                    required
                    value={newUser.address.country}
                    onChange={(e)=>setNewUser({...user, address:{ ...newUser.address, country:e.target.value}})}
                />
            </div>
            <div className='flex justify-around'>
                <Button
                    variant='contained'
                    onClick={()=> setOpenModal(false)}
                >Back</Button>
                <Button
                    variant='contained'
                    disabled={newUser==user?true:false}
                    onClick={handleSubmit}
                >Update</Button>
            </div>
        </div>
    )
}

export default UserEdit
