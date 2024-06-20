import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: `search`,
    initialState: null,
    reducers: {
        startSearch: (state, action) => {
            return action.payload
        },
        stopSearch: (state, action) => {
            return null;
        }
    }
})

export const { startSearch, stopSearch } = searchSlice.actions;
export default searchSlice.reducer;