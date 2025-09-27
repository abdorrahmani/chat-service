"use client";

import { create } from "zustand";

interface SignupStoreState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
}

export const useSignupStore = create<SignupStoreState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setOpen: (open: boolean) => set({ isOpen: open }),
}));
