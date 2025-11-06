// src/store/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isBlurred: boolean;
  userDropdownOpen: boolean;
  cartOpen: boolean,
  sidebarOpen: boolean,
  confirmModalOpen: boolean,
  editLoacationModalOpen: boolean,
}

const initialState: UIState = {
  isBlurred: false,
  userDropdownOpen: false,
  cartOpen: false,
  sidebarOpen: false,
  confirmModalOpen: false,
  editLoacationModalOpen: false,
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

    //  DashboardSidebar

    openSidebar(state) {
      state.sidebarOpen = true;
      state.isBlurred = true;
    },

    closeSidebar(state) {
      state.sidebarOpen = false;
      state.isBlurred = false
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
      state.isBlurred = state.sidebarOpen; // وقتی dropdown باز شد، بلور هم فعال شود
    },

    // Delete and logOut Modal
    openConfirmModal(state) {
      state.confirmModalOpen = true;
      state.isBlurred = true;
    },

    closeConfirmModal(state) {
      state.confirmModalOpen = false;
      state.isBlurred = false
    },

    /// Edit Location Modal
    openLocationModal(state) {
      state.editLoacationModalOpen = true;
      state.isBlurred = true;
    },

    closeLocationModal(state) {
      state.editLoacationModalOpen = false;
      state.isBlurred = false
    },

  },
});

export const {
  setBlur,
  toggleUserDropdown,
  openUserDropdown,
  closeUserDropdown,
  openCart,
  closeCart,
  openSidebar,
  closeSidebar,
  toggleSidebar,
  openConfirmModal,
  closeConfirmModal,
  openLocationModal,
  closeLocationModal,
} = uiSlice.actions;
export default uiSlice.reducer;
