import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({ selectedNav, setSelectedNav, themeColors, label, linkTo, fontSize, setIsSearching }) => {

    const [localSelected, setLocalSelected] = useState(selectedNav);

    const handleSelecting = (e) => {
        setSelectedNav(e.target.textContent);
        setIsSearching(false)
    }

    useEffect(() => {
        setLocalSelected(selectedNav)
    }, [selectedNav])


    return (
        <div>
            <li
                className={`text-white ${fontSize} border-b-4  hover:opacity-70`}
                onClick={handleSelecting}
                style={localSelected == `${label}` ?
                    { color: themeColors.contrastTextColor, borderBottomColor: themeColors.contrastTextColor } :
                    { color: themeColors.contrastTextColor, borderBottomColor: themeColors.primaryColor }}
            ><Link to={`${linkTo}`}>{label}</Link></li>
        </div>
    )
}

export default NavItem
