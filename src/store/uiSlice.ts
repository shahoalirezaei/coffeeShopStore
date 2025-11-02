// src/store/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isBlurred: boolean;
  userDropdownOpen: boolean;
  cartOpen: boolean,
}

const initialState: UIState = {
  isBlurred: false,
  userDropdownOpen: false,
  cartOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setBlur(state, action: PayloadAction<boolean>) {
      state.isBlurred = action.payload;
    },

    // 🔸 User dropdown 
    toggleUserDropdown(state) {
      state.userDropdownOpen = !state.userDropdownOpen;
      state.isBlurred = state.userDropdownOpen; // وقتی dropdown باز شد، بلور هم فعال شود
    },
    openUserDropdown(state) {
      state.userDropdownOpen = true;
      state.isBlurred = true;
    },
    closeUserDropdown(state) {
      state.userDropdownOpen = false;
      state.isBlurred = false;
    },

     // 🔹 Cart box
    openCart(state) {
      state.cartOpen = true;
      state.isBlurred = true;
    },
    closeCart(state) {
      state.cartOpen = false;
      state.isBlurred = false;
    },
  },
});

export const { setBlur, toggleUserDropdown, openUserDropdown, closeUserDropdown, openCart, closeCart } = uiSlice.actions;
export default uiSlice.reducer;
