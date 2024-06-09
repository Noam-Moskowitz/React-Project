import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: `search`,
    initialState: null,
    reducers: {
        startSearch: (state, action) => {
            return action.payload
        }
    }
})

export const { startSearch } = searchSlice.actions;
export default searchSlice.reducer;