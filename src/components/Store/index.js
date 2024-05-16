import { configureStore } from "@reduxjs/toolkit";
import watchListReducer from "../Store/slices/wishlistSlice";



export default configureStore({
reducer:{
watch:watchListReducer
}

})