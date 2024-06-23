import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import useApi from '../../hooks/useApi'
import useToken from '../../hooks/useToken'
import { RequestObject } from '../../models/RequestObject'
import Notify from '../Notify'
import useThemeColor from '../../hooks/useThemeColor'

const UserDelete = ({ userId, setOpenModal, updateTableDelete, handleSuccess }) => {

    const { data, callApi, METHOD, errorFlag, apiErrors } = useApi()
    const { token } = useToken();
    const { errorColor } = useThemeColor()

    const handleDelete = () => {
        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
            METHOD.DELETE,
            null,
            token
        )

        callApi(newRequest)
    }

    useEffect(() => {
        if (data) {
            handleSuccess(`delete`)
            updateTableDelete(data)
        }
    }, [data])


    return (
        <div className='w-[80vw] md:w-auto p-5' style={{ color: errorColor }}>
            <h1
                className='text-2xl md:text-3xl font-bold uppercase pb-12'
            >
                delete this user?
            </h1>
            <div className='flex justify-end gap-4'>
                <Button onClick={() => setOpenModal(false)} variant='text'>No, Thank You</Button>
                <Button onClick={handleDelete} variant='contained' color='error'>Yes, I'm Sure</Button>
            </div>
            {errorFlag &&
                <Notify severity='error' message={`${apiErrors.response.status}: ${apiErrors.response.data}`} />
            }
        </div>
    )
}

export default UserDelete
