import { createSlice } from "@reduxjs/toolkit";

const initialState={
    profile:null,
    cart:null,
    login:false
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
        }
    }

})

export {
    
}