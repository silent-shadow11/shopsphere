import { createSlice } from "@reduxjs/toolkit";

const initialState={
    profile:null,
    cart:null,
    login:false,
    order:{},
}

const authSilce=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setProfile:(state,action)=>{
            state.profile=action.payload
        },
        setLogin:(state,action)=>{
            state.login=action.payload
        },
        setCart:(state,action)=>{
            state.cart=action.payload
        },
        setOrder:(state,action)=>{
            state.order=action.payload
        }
    }

})

export const {
    setProfile,
    setLogin,
    setCart,
    setOrder
}=authSilce.actions

export default authSilce.reducer