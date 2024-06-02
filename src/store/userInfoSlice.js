import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        _id: null,
        isBusiness: null,
        isAdmin: null
    },
    reducers: {
        saveInfo: (state, action) => {
            return action.payload;

        }
    }
})

export const { saveInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;