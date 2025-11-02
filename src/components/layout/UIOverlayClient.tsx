// src/components/layout/UIOverlayClient.tsx
"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeUserDropdown, closeCart } from "@/store/uiSlice";


export default function UIOverlayClient() {
  const { isBlurred, userDropdownOpen, cartOpen } = useAppSelector((s) => s.ui);
  const dispatch = useAppDispatch();
  

  if (!isBlurred) return null;

  return (
    // کلیک روی اوِرلِی باعث بستن می‌شود
    <div
      className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
      onClick={() =>{

        if(userDropdownOpen)dispatch(closeUserDropdown())
        if(cartOpen) dispatch(closeCart())
      }} 
      aria-hidden
    />
  );
}
