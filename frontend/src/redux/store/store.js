import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slice/AuthSilce.js"

export const store=configureStore({
    reducer:{
        auth:AuthReducer
    }
})