import { createTheme } from '@mui/material';



const darkTheme = createTheme({
    palette: {
        mode: `dark`,
    }
})

const lightTheme = createTheme({
    palette: {
        palette: {
            mode: `light`,
        }
    }
})

export const getTheme = (theme) => theme == `light` ? lightTheme : darkTheme;