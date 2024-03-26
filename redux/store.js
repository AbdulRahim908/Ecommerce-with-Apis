import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import wishListReducer from "./wishListReducer";

export default configureStore({
    reducer:{
        cart: cartReducer,
        wishlist: wishListReducer
    }
})