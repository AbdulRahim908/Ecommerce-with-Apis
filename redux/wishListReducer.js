import { createSlice } from "@reduxjs/toolkit";
export const WishSlice=createSlice({
    name:'wishlist',
    initialState:{
        wishlist:[],
    },
    reducers:{
        addToWishlist:(state,action)=>{
            const itemInWish = state.wishlist.find((item) => item.id == action.payload.id);
            if (!itemInWish) {
                state.wishlist.push(action.payload);
            }

        },
        removeFromWishlist:(state,action)=>{
            const removeFromWish = state.wishlist.filter((item) => item.id !== action.payload.id);
            state.wishlist = removeFromWish;

        }
    }
})
export const { addToWishlist, removeFromWishlist } = WishSlice.actions;
export default WishSlice.reducer;