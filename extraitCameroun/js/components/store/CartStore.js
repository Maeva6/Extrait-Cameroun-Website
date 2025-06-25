// 📁 src/store/cartStore.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  closeCart: () => set({ isCartOpen: false }),
}));
