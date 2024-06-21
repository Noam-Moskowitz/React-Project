import React, { useEffect, useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import UserDelete from './UserDelete';
import UserEdit from './UserEdit';

const UserModal = ({openModal, setOpenModal, selectedUser}) => {

    




    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return (
        <div>
            <Modal open={openModal} onClose={handleClose}>
                <Box 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {selectedUser && selectedUser.action===`delete`&&
                        <UserDelete userId={selectedUser.user._id} setOpenModal={setOpenModal} />
                    }
                    {selectedUser && selectedUser.action===`edit`&&
                        <UserEdit user={selectedUser.user} setOpenModal={setOpenModal} />
                    }

                </Box>
            </Modal>
        </div>
    )
}

export default UserModal
