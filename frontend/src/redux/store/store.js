import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slice/AuthSilce.js"
import CategoryReducer from "../slice/CategorySilce.js"
import ProductReducer from "../slice/ProductSilce.js"

export const store=configureStore({
    reducer:{
        auth:AuthReducer,
        category:CategoryReducer,
        product:ProductReducer
    }
})