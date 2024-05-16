import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    count:0,
    watchlist:[]
}

let watchSlice =createSlice({
    name:"watch",
    initialState,
    reducers:{
     addToWatchList:(state,action)=>{
       state.watchlist.push(action.payload)
       state.count =state.watchlist.length
     },
     removeFromWatchList :(state,action)=>{
state.watchlist =state.watchlist.filter(
    (movie)=>movie.id!== action.payload
)
state.count = state.watchlist.length;
     }



    }
})

export const {addToWatchList,removeFromWatchList}=watchSlice.actions
export default watchSlice.reducer