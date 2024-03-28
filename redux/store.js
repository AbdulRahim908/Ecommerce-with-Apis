import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import wishListReducer from "./wishListReducer";
import { combineReducers, } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
// import storage from "redux-persist/lib/storage";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";
let persistConfig={
    key:'root',
    storage:AsyncStorage,
}
let rootReducer=combineReducers({
    cart: cartReducer,
    wishlist: wishListReducer
});
let persistedReducer=persistReducer(persistConfig,rootReducer);
export const mystore= configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,],
      },
    }),
});