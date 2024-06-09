import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfoSlice";
import themeSlice from "./themeSlice";
import searchSlice from "./searchSlice";


export default configureStore({
    reducer: {
        userInfo: userInfoSlice,
        theme: themeSlice,
        search: searchSlice
    }
})