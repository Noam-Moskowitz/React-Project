import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import useApi from '../../hooks/useApi'
import useToken from '../../hooks/useToken'
import { RequestObject } from '../../models/RequestObject'
import CustomLoader from '../loaders/CustomLoader'

const UserDelete = ({userId, setOpenModal}) => {
    
    const {data, callApi, METHOD}=useApi()
    const {token}=useToken();

    const handleDelete=()=>{
        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
            METHOD.DELETE,
            null,
            token
        )

        callApi(newRequest)
    }

    useEffect(()=>{
        if (data) {
            setOpenModal(false)
        }
    },[data])


    return (
        <div >
            <h1
                className='text-3xl font-bold uppercase pb-12'
            >
                delete this user?
            </h1>
            <div className='flex justify-around '>
                <Button onClick={()=>setOpenModal(false)} variant='text'>No, Thank You</Button>
                <Button onClick={handleDelete} variant='contained' color='error'>Yes, I'm Sure</Button>
            </div>
        </div>
    )
}

export default UserDelete
