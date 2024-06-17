import { Avatar, ClickAwayListener, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Popper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import useApi from '../../hooks/useApi.jsx'
import { RequestObject } from '../../models/RequestObject.js'

const UserIcon = ({ id, token }) => {
    const { data, callApi, METHOD } = useApi();

    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [initials, setInitials] = useState();

    const handleClick = (e) => {
        setOpen(!open)
        setAnchorEl(e.currentTarget)
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
            >
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <Paper className='p-2'>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
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
