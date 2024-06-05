import { createSlice } from "@reduxjs/toolkit";


export const themeSlice = createSlice({
    name: 'theme',
    initialState: `light`,
    reducers: {
        changeTheme: (state, action) => {
            if (state == `light`) {
                return `dark`
            } else {
                return `light`
            }
        }
    }
})

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;