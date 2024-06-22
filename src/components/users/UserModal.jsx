import React from 'react';
import { Modal, Box } from '@mui/material';
import UserDelete from './UserDelete';
import UserEdit from './UserEdit';

const UserModal = ({openModal, setOpenModal, selectedUser, updateTableDelete, updateTableEdit}) => {

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
                        width: `auto`,
                        maxHeight:`80vh`,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        overflowY:`scroll`
                    }}
                >
                    {selectedUser && selectedUser.action===`delete`&&
                        <UserDelete userId={selectedUser.user._id} setOpenModal={setOpenModal} updateTableDelete={updateTableDelete}/>
                    }
                    {selectedUser && selectedUser.action===`edit`&&
                        <UserEdit user={selectedUser.user} setOpenModal={setOpenModal} updateTableEdit={updateTableEdit} />
                    }

                </Box>
            </Modal>
        </div>
    )
}

export default UserModal
