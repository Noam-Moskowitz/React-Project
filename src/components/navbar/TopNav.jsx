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
import UserIcon from './UserIcon';

const TopNav = () => {

    const userInfo = useSelector((state) => state.userInfo)
    const theme = useSelector((state) => state.theme)

    const dispatch = useDispatch()
    const { primaryColor, contrastTextColor, backgroundColor, textColor } = useThemeColor();
    const { token, checkToken } = useToken();

    const [authKeys, setAuthKeys] = useState();
    const [selectedNav, setSelectedNav] = useState();
    const [expanded, setExpanded] = useState(false);
    const [display, setDisplay] = useState();
    const [isSearching, setIsSearching] = useState();

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
                            setIsSearching={setIsSearching}
                            isSearching={isSearching}
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
                            <UserIcon />
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
                        setIsSearching={setIsSearching}
                    />
                    <NavItem
                        selectedNav={selectedNav}
                        setSelectedNav={setSelectedNav}
                        themeColors={{ contrastTextColor, primaryColor }}
                        label='About'
                        linkTo='/about'
                        setIsSearching={setIsSearching}
                    />

                    {authKeys && authKeys._id &&
                        <NavItem
                            selectedNav={selectedNav}
                            setSelectedNav={setSelectedNav}
                            themeColors={{ contrastTextColor, primaryColor }}
                            label='My Favorites'
                            linkTo='cards/myFavorites'
                            setIsSearching={setIsSearching}
                        />
                    }
                    {authKeys && authKeys.isBusiness &&
                        <NavItem
                            selectedNav={selectedNav}
                            setSelectedNav={setSelectedNav}
                            themeColors={{ contrastTextColor, primaryColor }}
                            label='My Cards'
                            linkTo='cards/myCards'
                            setIsSearching={setIsSearching}
                        />
                    }
                    {authKeys && authKeys.isAdmin &&
                        <NavItem
                            selectedNav={selectedNav}
                            setSelectedNav={setSelectedNav}
                            themeColors={{ contrastTextColor, primaryColor }}
                            label='Sandbox'
                            linkTo='/admin/users'
                            setIsSearching={setIsSearching}
                        />
                    }
                </div>

                <div className='flex gap-4'>
                    <div className='flex items-center gap-2  hidden md:flex'>
                        <div>
                            <SearchBar
                                bgColor={contrastTextColor}
                                setIsSearching={setIsSearching}
                                isSearching={isSearching}
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
                                setIsSearching={setIsSearching}
                            />

                            <NavItem
                                selectedNav={selectedNav}
                                setSelectedNav={setSelectedNav}
                                themeColors={{ contrastTextColor, primaryColor }}
                                label='REGISTER'
                                linkTo='/register'
                                setIsSearching={setIsSearching}
                            />

                        </div> :
                        <div className='hidden md:block'>
                            <UserIcon id={authKeys && authKeys._id} token={token} />
                        </div>
                    }
                </div>
            </ul>
        </nav>
    )
}

export default TopNav
