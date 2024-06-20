import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useApi from '../hooks/useApi';
import { RequestObject } from '../models/RequestObject';
import useToken from '../hooks/useToken';

const Sandbox = () => {

    const { data, callApi, METHOD } = useApi()
    const { token } = useToken()

    const [users, setUsers] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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





    return (
        <div>
            <Paper>
                <TableContainer>
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
                                    <TableRow hover key={u.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{`${u.name.first} ${u.name.middle} ${u.name.last}`}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>{u.phone}</TableCell>
                                        <TableCell>{u.isAdmin ? `Admin` : `Standard`}</TableCell>
                                        <TableCell>{u.isBusiness ? `Business` : `Standard`}</TableCell>
                                        <TableCell>
                                            <Button>Delete</Button>
                                            <Button>Edit</Button>
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
        </div>
    )
}

export default Sandbox
