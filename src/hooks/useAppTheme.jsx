import React from 'react'
import { useSelector } from 'react-redux'
import { getTheme } from '../theme/theme.js'


const useAppTheme = () => {
    const globalTheme = useSelector((state) => state.theme)
    const currentTheme = getTheme(globalTheme);

    return currentTheme
}

export default useAppTheme
