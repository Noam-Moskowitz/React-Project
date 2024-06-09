import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { changeTheme } from '../../store/themeSlice';
import useThemeColor from '../../hooks/useThemeColor';
import NavItem from './NavItem';

const TopNav = () => {

    const userInfo = useSelector((state) => state.userInfo)
    const theme = useSelector((state) => state.theme)

    const dispatch = useDispatch()
    const { primaryColor, contrastTextColor, backgroundColor, textColor } = useThemeColor();

    const [authKeys, setAuthKeys] = useState()
    const [selectedNav, setSelectedNav] = useState()

    useEffect(() => {
        setAuthKeys(userInfo)
    }, [userInfo])




    return (
        <nav
            className='w-screen flex  p-5 shadow-md font-bold '
            style={{ backgroundColor: primaryColor }}
        >
            <ul className='flex w-screen justify-between '>
                <div className='flex gap-4 items-end'>
                    <NavItem
                        selectedNav={selectedNav}
                        setSelectedNav={setSelectedNav}
                        themeColors={{ contrastTextColor, primaryColor }}
                        label='Bcard'
                        linkTo='/'
                        fontSize='text-3xl'
                    />
                    <NavItem
                        selectedNav={selectedNav}
                        setSelectedNav={setSelectedNav}
                        themeColors={{ contrastTextColor, primaryColor }}
                        label='About'
                        linkTo='/about'
                    />

                    {authKeys && authKeys._id &&
                        <NavItem
                            selectedNav={selectedNav}
                            setSelectedNav={setSelectedNav}
                            themeColors={{ contrastTextColor, primaryColor }}
                            label='My Favorites'
                            linkTo='/abmyFavoritesout'
                        />
                    }
                    {authKeys && authKeys.isBusiness &&
                        <NavItem
                            selectedNav={selectedNav}
                            setSelectedNav={setSelectedNav}
                            themeColors={{ contrastTextColor, primaryColor }}
                            label='My Cards'
                            linkTo='/myCards'
                        />
                    }
                    {authKeys && authKeys.isAdmin &&
                        <NavItem
                            selectedNav={selectedNav}
                            setSelectedNav={setSelectedNav}
                            themeColors={{ contrastTextColor, primaryColor }}
                            label='Sandbox'
                            linkTo='/sandbox'
                        />
                    }
                </div>
                <div className='flex items-end'>
                    <button
                        className=' border-4 rounded-full px-2 '
                        style={{ color: textColor, backgroundColor: backgroundColor, borderColor: textColor }}
                        onClick={() => { dispatch(changeTheme()) }}
                    >{theme == `dark` ? <LightModeIcon /> : <DarkModeIcon />}</button>
                </div>
                {authKeys && authKeys._id == null ?
                    <div className='flex gap-4 p-1 items-end'>
                        <NavItem
                            selectedNav={selectedNav}
                            setSelectedNav={setSelectedNav}
                            themeColors={{ contrastTextColor, primaryColor }}
                            label='LOG IN'
                            linkTo='/login'
                        />

                        <NavItem
                            selectedNav={selectedNav}
                            setSelectedNav={setSelectedNav}
                            themeColors={{ contrastTextColor, primaryColor }}
                            label='REGISTER'
                            linkTo='/register'
                        />

                    </div> :
                    <div>
                        <Avatar
                            color='primary'
                        >NM</Avatar>
                    </div>
                }
            </ul>
        </nav>
    )
}

export default TopNav
