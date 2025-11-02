import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface CartItem {
    _id: string;
    price: number | null;
    title: string;
    image: string;
    quantity: number;
    discount?:number;
}
export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
}

const findIndex = (items: CartItem[], id: string) =>
    items.findIndex(item => item._id === id)


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const idx = findIndex(state.items, action.payload._id)
            if (idx > -1) {
                state.items[idx].quantity += action.payload.quantity
            } else {
                state.items.push(action.payload)
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
        setQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            const idx = findIndex(state.items, action.payload.id);
            if (idx > -1) {
                state.items[idx].quantity = Math.max(1, action.payload.quantity)
            }
        },
        increment: (state, action: PayloadAction<string>) => {
            const idx = findIndex(state.items, action.payload)
            if (idx > -1) state.items[idx].quantity += 1
        },
        decrement: (state, action: PayloadAction<string>) => {
            const idx = findIndex(state.items, action.payload)
            if (idx > -1) state.items[idx].quantity = Math.max(1, state.items[idx].quantity - 1)
        },
        clearCart: (state) => {
            state.items = []
        },
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload
        }
    }

})

export const {
    addItem,
    removeItem,
    setQuantity,
    increment,
    decrement,
    clearCart,
    setCart
} = cartSlice.actions

export default cartSlice.reducer