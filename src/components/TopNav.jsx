import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { changeTheme } from '../store/themeSlice';

const TopNav = () => {

    const userInfo = useSelector((state) => state.userInfo)
    const theme = useSelector((state) => state.theme)

    const dispatch = useDispatch()

    const [authKeys, setAuthKeys] = useState()
    const [darkTheme, setDarkTheme] = useState(false)

    useEffect(() => {
        setAuthKeys(userInfo)
    }, [userInfo])




    return (
        <nav className='w-screen flex bg-blue-300 p-5 shadow-md font-bold text-white'>
            <ul className='flex w-screen justify-between '>
                <div className='flex gap-4 items-end'>
                    <li className='text-white  text-3xl border-b-4 border-b-blue-300 hover:border-b-blue-200'><Link to='/'>Bcard</Link></li>
                    <li className=' hover:border-b-blue-200 border-b-4 border-b-blue-300  px-2'><Link to='/about'>About</Link></li>
                    {authKeys && authKeys._id &&
                        <li className='hover:border-b-blue-200 border-b-4 border-b-blue-300 px-2'><Link to='/myFavorites'>My Favorites</Link></li>}
                    {authKeys && authKeys.isBusiness &&
                        <li className='hover:border-b-blue-200 border-b-4 border-b-blue-300 px-2'><Link to='/myCards'>My Cards</Link></li>}
                    {authKeys && authKeys.isAdmin &&
                        <li className='hover:border-b-blue-200 border-b-4 border-b-blue-300 px-2'><Link to='/sandbox'>Sandbox</Link></li>}
                </div>
                <div>
                    <button
                        className='border-4 rounded-full px-2 bg-blue-200 border-blue-200 hover:bg-blue-300'
                        onClick={() => { dispatch(changeTheme()) }}
                    >{theme == `dark` ? <LightModeIcon /> : <DarkModeIcon />}</button>
                </div>
                {authKeys && authKeys._id == null ?
                    <div className='flex gap-4 items-end'>
                        <li className=' hover:border-b-blue-200 border-b-4 border-b-blue-300 p-1 px-2 uppercase'><Link to='/login'>Log in</Link></li>
                        <li className=' hover:border-b-blue-200 border-b-4 border-b-blue-300 p-1 px-2 uppercase'><Link to='/register'>Register</Link></li>
                    </div> :
                    <div>
                        <Avatar style={{ backgroundColor: 'primary' }} >NM</Avatar>
                    </div>
                }
            </ul>
        </nav>
    )
}

export default TopNav
