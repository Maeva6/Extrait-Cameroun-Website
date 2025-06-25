// 📁 src/store/cartStore.js
import { create } from 'zustand';

// export const useCartStore = create((set) => ({
//   isCartOpen: false,
//   toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
//   closeCart: () => set({ isCartOpen: false }),
// }));
// 📁 store/CartStore.js


export const useCartStore = create((set, get) => ({
  cartItems: [],
  isCartOpen: false,

  addToCart: (item) => {
    const existingItem = get().cartItems.find(i => i.id === item.id);
    if (existingItem) {
      set({
        cartItems: get().cartItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
    }
  },

  removeFromCart: (id) => {
    set({ cartItems: get().cartItems.filter(item => item.id !== id) });
  },

  increaseQuantity: (id) => {
    set({
      cartItems: get().cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  },

  decreaseQuantity: (id) => {
    set({
      cartItems: get().cartItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    });
  },

  toggleCart: () => set({ isCartOpen: !get().isCartOpen }),

  clearCart: () => set({ cartItems: [] }),
}));

