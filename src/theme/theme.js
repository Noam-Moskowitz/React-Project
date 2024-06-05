import { createTheme } from '@mui/material';



const darkTheme = createTheme({
    palette: {

    }
})

const lightTheme = createTheme({
    palette: {

    }
})

export const getTheme = (theme) => theme == `light` ? lightTheme : darkTheme;