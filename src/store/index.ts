import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartItem } from "./cartSlice";
import uiReducer from "./uiSlice"
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});;

if (typeof window !== "undefined") {
    const saved = localStorage.getItem("rtk_cart")
    if(saved){
        try{

            const items: CartItem[] = JSON.parse(saved)
            store.dispatch({ type: "cart/setCart", payload: items })
        }catch{}
    }
}

store.subscribe(() => {
    try{
        const state = store.getState();
        localStorage.setItem("rtk_cart", JSON.stringify(state.cart.items))
    }catch{}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store