import { createSlice } from "@reduxjs/toolkit";


const initialState={
    products:[],
    loading:false,
}

const productSilce=createSlice({
    name:"product",
    initialState,
    reducers:{
        setProduct:(state,action)=>{
            state.products=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    }

})

export const {
    setProduct,
    setLoading
}=productSilce.actions

export default productSilce.reducer