import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Box, Button, Typography, Tooltip, } from '@mui/material';
import { RequestObject } from '../../../models/RequestObject';
import useApi from '../../../hooks/useApi';
import Notify from '../../Notify';
import useThemeColor from '../../../hooks/useThemeColor';

const DeleteButton = ({ bizNumber, id }) => {
    //hooks
    const {  callApi, apiErrors, successFlag, errorFlag, METHOD } = useApi()
    const {textColor}=useThemeColor()

    //states
    const [open, setOpen] = useState(false);

    //functions
    const handleDelete = () => {
        const token = localStorage.getItem(`token`);

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
            METHOD.DELETE,
            bizNumber,
            token
        )

        callApi(newRequest);
        setOpen(false);
    }

    return (
        <div>
            <Tooltip title="Delete">
                <div
                    className='hover:bg-red-200 rounded-md p-2 hover:cursor-pointer'
                    onClick={() => setOpen(!open)}
                >
                    <DeleteIcon color='error' />

                </div>
            </Tooltip>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="delete-confirmation-modal"
                aria-describedby="confirm-or-cancel-deletion"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        color: textColor
                    }}
                >
                    <Typography id="delete-confirmation-modal" variant="h6" component="h2">
                        Confirm Delete
                    </Typography>
                    <Typography id="confirm-or-cancel-deletion" sx={{ mt: 2 }}>
                        Are you sure you want to delete this item?
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {errorFlag &&
                <Notify severity='error' message={`${apiErrors.response.status}: ${apiErrors.response.data}`} />
            }
            {successFlag && 
                <Notify severity='success' message='Card Deleted' />
            }
        </div>
    )
}

export default DeleteButton
