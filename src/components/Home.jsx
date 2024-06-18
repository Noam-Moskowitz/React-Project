import React from 'react'
import CardsPage from './cards/CardsPage.jsx'
import useThemeColor from '../hooks/useThemeColor.jsx';


const Home = () => {
    const { backgroundColor } = useThemeColor();


    return (
        <div
            style={{ backgroundColor: backgroundColor }}
        >
            <CardsPage />
        </div>
    )
}

export default Home
