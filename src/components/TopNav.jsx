import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { changeTheme } from '../store/themeSlice';
import useThemeColor from '../hooks/useThemeColor';

const TopNav = () => {

    const userInfo = useSelector((state) => state.userInfo)
    const theme = useSelector((state) => state.theme)

    const dispatch = useDispatch()
    const { primaryColor, contrastTextColor, backgroundColor, textColor } = useThemeColor();

    const [authKeys, setAuthKeys] = useState()

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
                    <li className='text-white  text-3xl border-b-4 border-b-blue-300 hover:border-b-blue-200'><Link to='/'>Bcard</Link></li>
                    <li
                        className=' hover:border-b-blue-200 border-b-4 border-b-blue-300  px-2'
                        style={{ color: contrastTextColor }}
                    ><Link to='/about'>About</Link></li>
                    {authKeys && authKeys._id &&
                        <li
                            className=' hover:border-b-blue-200 border-b-4 border-b-blue-300  px-2'
                            style={{ color: contrastTextColor }}
                        ><Link to='/myFavorites'>My Favorites</Link></li>}
                    {authKeys && authKeys.isBusiness &&
                        <li
                            className=' hover:border-b-blue-200 border-b-4 border-b-blue-300  px-2'
                            style={{ color: contrastTextColor }}
                        ><Link to='/myCards'>My Cards</Link></li>}
                    {authKeys && authKeys.isAdmin &&
                        <li
                            className=' hover:border-b-blue-200 border-b-4 border-b-blue-300  px-2'
                            style={{ color: contrastTextColor }}
                        ><Link to='/sandbox'>Sandbox</Link></li>}
                </div>
                <div className='flex items-end'>
                    <button
                        className=' border-4 rounded-full px-2 '
                        style={{ color: textColor, backgroundColor: backgroundColor, borderColor: textColor }}
                        onClick={() => { dispatch(changeTheme()) }}
                    >{theme == `dark` ? <LightModeIcon /> : <DarkModeIcon />}</button>
                </div>
                {authKeys && authKeys._id == null ?
                    <div className='flex gap-4 items-end'>
                        <li
                            className=' hover:border-b-blue-200 border-b-4 border-b-blue-300 p-1 px-2 uppercase'
                            style={{ color: contrastTextColor }}
                        ><Link to='/login'>Log in</Link></li>
                        <li
                            className=' hover:border-b-blue-200 border-b-4 border-b-blue-300 p-1 px-2 uppercase'
                            style={{ color: contrastTextColor }}
                        ><Link to='/register'>Register</Link></li>
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
