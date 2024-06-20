import { Avatar, ClickAwayListener, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Popper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import useApi from '../../hooks/useApi.jsx'
import { RequestObject } from '../../models/RequestObject.js'
import { useDispatch } from 'react-redux';
import { saveInfo } from '../../store/userInfoSlice.js'
import { useNavigate } from 'react-router-dom';

const UserIcon = ({ id, token }) => {
    const { data, callApi, METHOD } = useApi();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [initials, setInitials] = useState();

    const handleClick = (e) => {
        setOpen(!open)
        setAnchorEl(e.currentTarget)
    }

    const handleLogOut = () => {
        dispatch(saveInfo(
            {
                _id: null,
                isBusiness: null,
                isAdmin: null,
                iat: null
            }
        ));

        navigate(`/`)
    }

    useEffect(() => {

        const newRequest = new RequestObject(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
            METHOD.GET_ONE,
            null,
            token
        )

        callApi(newRequest)


    }, [])

    useEffect(() => {
        if (data) {
            const { name } = data
            const combinedInitials = name.first[0].toUpperCase() + name.last[0].toUpperCase()
            setInitials(combinedInitials);

        }
    }, [data])

    return (
        <div>
            <div
                className='hover:cursor-pointer'
                onClick={handleClick}
            >
                <Avatar
                    color='primary'

                >{initials && initials}</Avatar>
            </div>
            <Popper
                open={open}
                placement="bottom"
                anchorEl={anchorEl}
                className='z-50'
            >
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <Paper className='p-2'>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate(`/edit/${id}`)}>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Edit Profile" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleLogOut}>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Log Out" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </div>
    )
}

export default UserIcon
