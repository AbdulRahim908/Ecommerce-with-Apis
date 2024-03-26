import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[],
    },
    reducers:{
        addToCart : (state,action) => {
            const productInCart = state.cart.find((product) => product.id == action.payload.id);
            if(productInCart){
                productInCart.quantity++;
            }else{
                state.cart.push({...action.payload,quantity:1})
            }
        },
        removeFromCart : (state,action) => {
            const removeFromCart = state.cart.filter((product) => product.id !== action.payload.id);
            state.cart = removeFromCart;
        },
        incrementQuantity : (state,action) => {
            const productInCart = state.cart.find((product) => product.id == action.payload.id);
            productInCart.quantity++;
        },
        decrementQuantity : (state,action) => {
            const productInCart = state.cart.find((product) => product.id == action.payload.id);
            if(productInCart.quantity == 1){
                const removeFromCart = state.cart.filter((product) => product.id !== action.payload.id);
                state.cart = removeFromCart;
            }else{
                productInCart.quantity--;
            }

        }
    }
});
export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity}=cartSlice.actions;
export default cartSlice.reducer;