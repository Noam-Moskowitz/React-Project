import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import UserDelete from './UserDelete';
import UserEdit from './UserEdit';
import ModalSuccessScreen from '../loaders/ModalSuccessScreen';

const UserModal = ({ openModal, setOpenModal, selectedUser, setSelectedUser, updateTableDelete, updateTableEdit }) => {

    const [succesScreen, setSuccesScreen] = useState()

    const handleSuccess = (succesType) => {
        setSelectedUser(null);
        setSuccesScreen(succesType)
    }

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
                        maxHeight: `80vh`,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        overflowY: `scroll`
                    }}
                >
                    {selectedUser && selectedUser.action === `delete` &&
                        <UserDelete
                            userId={selectedUser.user._id}
                            setOpenModal={setOpenModal}
                            updateTableDelete={updateTableDelete}
                            handleSuccess={handleSuccess}
                        />
                    }
                    {selectedUser && selectedUser.action === `edit` &&
                        <UserEdit
                            user={selectedUser.user}
                            setOpenModal={setOpenModal}
                            updateTableEdit={updateTableEdit}
                            handleSuccess={handleSuccess}
                        />
                    }
                    {succesScreen &&
                        <ModalSuccessScreen
                            setOpenModal={setOpenModal}
                            title={succesScreen}
                            setSuccesScreen={setSuccesScreen}
                        />
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default UserModal
