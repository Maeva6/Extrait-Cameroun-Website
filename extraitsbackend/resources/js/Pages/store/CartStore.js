// // 📁 src/store/cartStore.js
// import { create } from 'zustand';

// // export const useCartStore = create((set) => ({
// //   isCartOpen: false,
// //   toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
// //   closeCart: () => set({ isCartOpen: false }),
// // }));
// // 📁 store/CartStore.js


// export const useCartStore = create((set, get) => ({
//   cartItems: [],
//   isCartOpen: false,

//   addToCart: (item) => {
//     const existingItem = get().cartItems.find(i => i.id === item.id);
//     if (existingItem) {
//       set({
//         cartItems: get().cartItems.map(i =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         ),
//       });
//     } else {
//       set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
//     }
//   },

//   removeFromCart: (id) => {
//     set({ cartItems: get().cartItems.filter(item => item.id !== id) });
//   },

//   increaseQuantity: (id) => {
//     set({
//       cartItems: get().cartItems.map(item =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       ),
//     });
//   },

//   decreaseQuantity: (id) => {
//     set({
//       cartItems: get().cartItems.map(item =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       ),
//     });
//   },

//   toggleCart: () => set({ isCartOpen: !get().isCartOpen }),

//   clearCart: () => set({ cartItems: [] }),
// }));

import axios from "axios";
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  isCartOpen: false,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  setCartItems: (items) => set({ cartItems: items }),

  addToCart: async (item) => {
    const { cartItems } = get();

    const existing = cartItems.find((i) => i.id === item.id);
    const updatedItems = existing
      ? cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      : [...cartItems, { ...item, quantity: 1 }];

    set({ cartItems: updatedItems });

    // 🔁 Envoie au backend
    await axios.post("/panier/ajouter", {
      produit_id: item.id,
      quantite: existing ? existing.quantity + 1 : 1,
    });
  },

  increaseQuantity: async (id) => {
    const { cartItems } = get();
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    set({ cartItems: updated });

    const item = updated.find((i) => i.id === id);
    await axios.post("/panier/ajouter", {
      produit_id: id,
      quantite: item.quantity,
    });
  },

  decreaseQuantity: async (id) => {
    const { cartItems } = get();
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      get().removeFromCart(id);
      return;
    }

    const updated = cartItems.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity - 1 } : i
    );
    set({ cartItems: updated });

    await axios.post("/panier/ajouter", {
      produit_id: id,
      quantite: item.quantity - 1,
    });
  },

  // removeFromCart: async (id) => {
  //   const { cartItems } = get();
  //   const updated = cartItems.filter((item) => item.id !== id);
  //   set({ cartItems: updated });

  //   await axios.delete(`/panier/${id}`);
  // },


  loadCartFromServer: async () => {
    const response = await axios.get("/panier");
    const items = response.data.map((p) => ({
      id: p.produit_id,
      name: p.produit.nomProduit,
      price: p.produit.prixProduit,
      imageUrl: p.produit.imagePrincipale,
      quantity: p.quantite,
    }));
    set({ cartItems: items });
  },
  clearCart: async () => {
  set({ cartItems: [] });

  try {
    await axios.delete("/panier"); // 👈 appelle Laravel pour vider le panier
  } catch (error) {
    console.error("Erreur lors de la suppression du panier :", error);
  }
} ,

    removeFromCart: async (id) => {
  const { cartItems } = get();
  const updated = cartItems.filter((item) => item.id !== id);
  set({ cartItems: updated });

  try {
    await axios.delete(`/panier/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression du panier :", error);
  }
}
}));
