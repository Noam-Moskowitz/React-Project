import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const TopNav = () => {

    const userInfo = useSelector((state) => state.userInfo)

    const [authKeys, setAuthKeys] = useState()

    useEffect(() => {
        setAuthKeys(userInfo)
    }, [userInfo])


    return (
        <nav className='w-screen flex bg-blue-300 p-5 shadow-md'>
            <ul className='flex w-screen justify-between '>
                <div className='flex gap-4 items-end'>
                    <li className='text-white font-bold text-3xl'><Link to='/'>Bcard</Link></li>
                    <li className='hover:text-white border-r-2 px-2'><Link to='/about'>About</Link></li>
                    {authKeys && authKeys._id &&
                        <li className='hover:text-white border-r-2 px-2'><Link to='/myFavorites'>My Favorites</Link></li>}
                    {authKeys && authKeys.isBusiness &&
                        <li><Link to='/myCards'>My Cards</Link></li>}
                    {authKeys && authKeys.isAdmin &&
                        <li><Link to='/sandbox'>Sandbox</Link></li>}
                </div>
                {authKeys && authKeys._id == null &&
                    <div className='flex gap-4 items-end'>
                        <li className='hover:text-white'><Link to='/login'>Login</Link></li>
                        <li className='hover:text-white'><Link to='/register'>Register</Link></li>
                    </div>
                }
            </ul>
        </nav>
    )
}

export default TopNav
