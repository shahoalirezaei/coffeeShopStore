// src/components/layout/UIOverlayClient.tsx
"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeUserDropdown, closeCart, closeSidebar, closeLocationModal, closeConfirmModal } from "@/store/uiSlice";


export default function UIOverlayClient() {
  const { isBlurred, userDropdownOpen, cartOpen, sidebarOpen, confirmModalOpen, editLoacationModalOpen } = useAppSelector((s) => s.ui);
  const dispatch = useAppDispatch();
  

  if (!isBlurred) return null;

  return (
    // کلیک روی اوِرلِی باعث بستن می‌شود
    <div
      className="fixed inset-0 z-41 bg-black/20 backdrop-blur-sm transition-opacity"
      onClick={() =>{

        if(userDropdownOpen)dispatch(closeUserDropdown())
        if(cartOpen) dispatch(closeCart())
          if(sidebarOpen) dispatch(closeSidebar())
          if(confirmModalOpen) dispatch(closeConfirmModal())
          if(editLoacationModalOpen) dispatch(closeLocationModal())
      }} 
      aria-hidden
    />
  );
}
