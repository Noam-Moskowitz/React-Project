import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { changeTheme } from '../../store/themeSlice';
import useThemeColor from '../../hooks/useThemeColor';
import NavItem from './NavItem';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './SearchBar';
import useToken from '../../hooks/useToken';

const TopNav = () => {

    const userInfo = useSelector((state) => state.userInfo)
    const theme = useSelector((state) => state.theme)

    const dispatch = useDispatch()
    const { primaryColor, contrastTextColor, backgroundColor, textColor } = useThemeColor();
    const { checkToken } = useToken();

    const [authKeys, setAuthKeys] = useState()
    const [selectedNav, setSelectedNav] = useState()
    const [expanded, setExpanded] = useState(false);
    const [display, setDisplay] = useState();

    useEffect(() => {
        setAuthKeys(userInfo)
    }, [userInfo])

    useEffect(() => {
        if (expanded) {
            setDisplay(`block`)
        } else {
            setDisplay(`hidden`)
        }
    }, [expanded])

    useEffect(() => {
        checkToken()
    }, [])



    return (
        <nav
            className={`w-screen flex-col md:flex-row  p-5 shadow-md font-bold `}
            style={{ backgroundColor: primaryColor }}
        >

            {/* mobile only */}
            <div className='flex md:hidden justify-between w-full'>
                <div
                    className='border-2 rounded p-1 '
                    onClick={() => setExpanded(!expanded)}
                >
                    <MenuIcon />
                </div>
                <div className='flex items-center gap-2'>
                    <div>
                        <SearchBar
                            bgColor={contrastTextColor}
                        />
                    </div>
                    <div className='flex items-end '>
                        <button
                            className=' border-4 rounded-full px-2 '
                            style={{ color: textColor, backgroundColor: backgroundColor, borderColor: textColor }}
                            onClick={() => { dispatch(changeTheme()) }}
                        >{theme == `dark` ? <LightModeIcon /> : <DarkModeIcon />}</button>
                    </div>
                    <div>
                        {authKeys && authKeys._id &&
                            <Avatar
                                color='primary'
                            >NM</Avatar>
                        }
                    </div>
                </div>
            </div>


            <ul className={`flex flex-col ${display}   md:flex md:flex-row w-full justify-between `}>
                <div className='flex flex-col md:flex-row gap-4 md:items-end'>
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
                            linkTo='/myFavorites'
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

                <div className='flex gap-4'>
                    <div className='flex items-center gap-2  hidden md:flex'>
                        <div>
                            <SearchBar
                                bgColor={contrastTextColor}
                            />
                        </div>
                        <div className='flex items-end'>
                            <button
                                className=' border-4 rounded-full px-2 '
                                style={{ color: textColor, backgroundColor: backgroundColor, borderColor: textColor }}
                                onClick={() => { dispatch(changeTheme()) }}
                            >{theme == `dark` ? <LightModeIcon /> : <DarkModeIcon />}</button>
                        </div>
                    </div>
                    {authKeys && authKeys._id == null ?
                        <div className='flex flex-row  gap-4 pt-2 p-1 justify-center md:justify-end'>
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
                        <div className='hidden md:block'>
                            <Avatar
                                color='primary'
                            >NM</Avatar>
                        </div>
                    }
                </div>
            </ul>
        </nav>
    )
}

export default TopNav
