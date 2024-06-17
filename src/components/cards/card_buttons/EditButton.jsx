import { Tooltip } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';


const EditButton = ({ id }) => {
    const navigate = useNavigate()

    return (
        <Tooltip title='Edit'>
            <div
                className='hover:bg-blue-200 rounded-md p-2 hover:cursor-pointer'
                onClick={() => navigate(`/card/edit/${id}`)}
            >
                <EditIcon color='primary' />
            </div>
        </Tooltip>
    )
}

export default EditButton
