import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi';
import { RequestObject } from '../../models/RequestObject';
import useToken from '../../hooks/useToken';
import CustomLoader from '../loaders/CustomLoader'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import UserModal from './UserModal';

const Sandbox = () => {

    const { data, callApi, METHOD, isLoading } = useApi()
    const { token } = useToken()
    const searchValue = useSelector(store => store.search);

    const [users, setUsers] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal]=useState(false);
    const [selectedUser, setSelectedUser]=useState();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users`,
            METHOD.GET_ALL,
            null,
            token
        )

        callApi(newRequest)
    }, [])

    useEffect(() => {
        if (data) {
            setUsers(data)
        }
    }, [data])

    useEffect(() => {
        if (searchValue) {
            const filteredUsers = users.filter(user =>
                Object.values(user).some(value =>
                    String(value).toLowerCase().includes(searchValue.toLowerCase())
                )
            );
            setUsers(filteredUsers)
        } else {
            setUsers(data)
        }
    }, [searchValue])



    if (isLoading) return <CustomLoader />

    return (
        <div className='p-5'>
            <Paper>
                <TableContainer sx={{ maxHeight: `90vh` }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    #
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Phone Number
                                </TableCell>
                                <TableCell>
                                    Admin Status
                                </TableCell>
                                <TableCell>
                                    Business Status
                                </TableCell>
                                <TableCell>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((u, i) => (
                                    <TableRow className='hover:cursor-pointer' hover key={u.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{`${u.name.first} ${u.name.middle} ${u.name.last}`}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>{u.phone}</TableCell>
                                        <TableCell>{u.isAdmin ? `Admin` : `Standard`}</TableCell>
                                        <TableCell>{u.isBusiness ? `Business` : `Standard`}</TableCell>
                                        <TableCell>
                                            <div className='flex gap-1'>
                                                <div
                                                    className='hover:cursor-pointer p-1 rounded hover:bg-blue-100'
                                                    onClick={()=>{
                                                        setOpenModal(true)
                                                        setSelectedUser({
                                                            action:`edit`,
                                                            user:u
                                                        })
                                                    }}
                                                >
                                                    <EditIcon color='primary' />
                                                </div>
                                                <div
                                                    className='hover:cursor-pointer p-1 rounded hover:bg-red-200'
                                                    onClick={()=>{
                                                        setOpenModal(true)
                                                        setSelectedUser({
                                                            action:`delete`,
                                                            user:u
                                                        });
                                                    }}
                                                >
                                                    <DeleteIcon color='error' />
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={users && users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Paper>
            <UserModal openModal={openModal} setOpenModal={setOpenModal} selectedUser={selectedUser} />
        </div>
    )
}

export default Sandbox
