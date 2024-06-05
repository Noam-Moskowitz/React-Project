import { useTheme } from '@mui/material'
import React from 'react'

const useThemeColor = () => {

    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.secondary.main;
    const errorColor = theme.palette.error.main;
    const warningColor = theme.palette.warning.main;
    const infoColor = theme.palette.info.main;
    const successColor = theme.palette.success.main;
    const textColor = theme.palette.text.primary;
    const backgroundColor = theme.palette.background.default;
    const contrastTextColor = theme.palette.primary.contrastText;

    return {
        primaryColor,
        secondaryColor,
        errorColor,
        warningColor,
        infoColor,
        successColor,
        textColor,
        backgroundColor,
        contrastTextColor
    };
}

export default useThemeColor
