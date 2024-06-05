import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfoSlice";
import themeSlice from "./themeSlice";


export default configureStore({
    reducer: {
        userInfo: userInfoSlice,
        theme: themeSlice
    }
})