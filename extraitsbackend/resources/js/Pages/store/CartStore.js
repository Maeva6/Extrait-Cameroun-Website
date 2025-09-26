// import axios from "axios";
// import { create } from "zustand";

// export const useCartStore = create((set, get) => ({
//   cartItems: [],
//   isCartOpen: false,

//   toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

//   setCartItems: (items) => set({ cartItems: items }),

//   addToCart: async (item) => {
//     const { cartItems } = get();

//     const existing = cartItems.find((i) => i.id === item.id);
//     const updatedItems = existing
//       ? cartItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         )
//       : [...cartItems, { ...item, quantity: 1 }];

//     set({ cartItems: updatedItems });

//     const quantityToSend = existing ? existing.quantity + 1 : 1;

//     console.log("✅ Envoi au backend depuis addToCart:", {
//       produit_id: item.id,
//       quantite: quantityToSend,
//     });

//     try {
//       await axios.post("/panier/ajouter", {
//         produit_id: item.id,
//         quantite: quantityToSend,
//       });
//     } catch (error) {
//       console.error("❌ Erreur lors de l'ajout au panier :", error);
//     }
//   },

//   increaseQuantity: async (id) => {
//     const { cartItems } = get();
//     const updated = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     set({ cartItems: updated });

//     const item = updated.find((i) => i.id === id);

//     console.log("✅ Envoi au backend depuis increaseQuantity:", {
//       produit_id: id,
//       quantite: item.quantity,
//     });

//     try {
//       await axios.post("/panier/ajouter", {
//         produit_id: id,
//         quantite: item.quantity,
//       });
//     } catch (error) {
//       console.error("❌ Erreur lors de l'augmentation :", error);
//     }
//   },

//   decreaseQuantity: async (id) => {
//     const { cartItems } = get();
//     const item = cartItems.find((i) => i.id === id);
//     if (!item) return;

//     if (item.quantity === 1) {
//       await get().removeFromCart(id);
//       return;
//     }

//     const updated = cartItems.map((i) =>
//       i.id === id ? { ...i, quantity: i.quantity - 1 } : i
//     );
//     set({ cartItems: updated });

//     console.log("✅ Envoi au backend depuis decreaseQuantity:", {
//       produit_id: id,
//       quantite: item.quantity - 1,
//     });

//     try {
//       await axios.post("/panier/ajouter", {
//         produit_id: id,
//         quantite: item.quantity - 1,
//       });
//     } catch (error) {
//       console.error("❌ Erreur lors de la diminution :", error);
//     }
//   },

//   removeFromCart: async (id) => {
//     const { cartItems } = get();
//     const updated = cartItems.filter((item) => item.id !== id);
//     set({ cartItems: updated });

//     console.log("🗑️ Suppression du produit :", id);

//     try {
//       await axios.delete(`/panier/${id}`);
//     } catch (error) {
//       console.error("❌ Erreur lors de la suppression :", error);
//     }
//   },

//   clearCart: async () => {
//     set({ cartItems: [] });

//     console.log("🧹 Panier vidé");

//     try {
//       await axios.delete("/panier");
//     } catch (error) {
//       console.error("❌ Erreur lors du vidage du panier :", error);
//     }
//   },

//   loadCartFromServer: async () => {
//     try {
//       const response = await axios.get("/panier");
//       const items = response.data.map((p) => ({
//         id: p.produit_id,
//         name: p.produit.nomProduit,
//         price: p.produit.prixProduit,
//         imageUrl: p.produit.imagePrincipale,
//         quantity: p.quantite,
//       }));
//       set({ cartItems: items });
//       console.log("📦 Panier chargé depuis le serveur :", items);
//     } catch (error) {
//       console.error("❌ Erreur lors du chargement du panier :", error);
//     }
//   },
// }));
// import axios from "axios";
// import { create } from "zustand";

// export const useCartStore = create((set, get) => ({
//   cartItems: [],
//   isCartOpen: false,

//   toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

//   setCartItems: (items) => set({ cartItems: items }),

//   addToCart: async (item) => {
//     const { cartItems } = get();

//     const existing = cartItems.find((i) => i.id === item.id);
//     const updatedItems = existing
//       ? cartItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         )
//       : [...cartItems, { ...item, quantity: 1 }];

//     set({ cartItems: updatedItems });

//     const quantityToSend = existing ? existing.quantity + 1 : 1;

//     const payload = item.accessoire_id
//       ? { accessoire_id: item.accessoire_id, quantite: quantityToSend }
//       : { produit_id: item.id, quantite: quantityToSend };

//     console.log("✅ Envoi au backend depuis addToCart:", payload);

//     try {
//       await axios.post("/panier/ajouter", payload);
//     } catch (error) {
//       console.error("❌ Erreur lors de l'ajout au panier :", error);
//     }
//   },

//   increaseQuantity: async (id) => {
//     const { cartItems } = get();
//     const updated = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     set({ cartItems: updated });

//     const item = updated.find((i) => i.id === id);

//     const payload = item.accessoire_id
//       ? { accessoire_id: item.accessoire_id, quantite: item.quantity }
//       : { produit_id: item.id, quantite: item.quantity };

//     console.log("✅ Envoi au backend depuis increaseQuantity:", payload);

//     try {
//       await axios.post("/panier/ajouter", payload);
//     } catch (error) {
//       console.error("❌ Erreur lors de l'augmentation :", error);
//     }
//   },

//   decreaseQuantity: async (id) => {
//     const { cartItems } = get();
//     const item = cartItems.find((i) => i.id === id);
//     if (!item) return;

//     if (item.quantity === 1) {
//       await get().removeFromCart(id);
//       return;
//     }

//     const updated = cartItems.map((i) =>
//       i.id === id ? { ...i, quantity: i.quantity - 1 } : i
//     );
//     set({ cartItems: updated });

//     // const payload = item.accessoire_id
//     //   ? { accessoire_id: item.accessoire_id, quantite: item.quantity - 1 }
//     //   : { produit_id: item.id, quantite: item.quantity - 1 };
// const isAccessoire = item.type === "accessoire" || item.accessoire_id;

// const payload = isAccessoire
//   ? { accessoire_id: item.id, quantite: quantityToSend }
//   : { produit_id: item.id, quantite: quantityToSend };

//     console.log("✅ Envoi au backend depuis decreaseQuantity:", payload);

//     try {
//       await axios.post("/panier/ajouter", payload);
//     } catch (error) {
//       console.error("❌ Erreur lors de la diminution :", error);
//     }
//   },

//   removeFromCart: async (id) => {
//     const { cartItems } = get();
//     const updated = cartItems.filter((item) => item.id !== id);
//     set({ cartItems: updated });

//     console.log("🗑️ Suppression du produit :", id);

//     try {
//       await axios.delete(`/panier/${id}`);
//     } catch (error) {
//       console.error("❌ Erreur lors de la suppression :", error);
//     }
//   },

//   clearCart: async () => {
//     set({ cartItems: [] });

//     console.log("🧹 Panier vidé");

//     try {
//       await axios.delete("/panier");
//     } catch (error) {
//       console.error("❌ Erreur lors du vidage du panier :", error);
//     }
//   },

//   loadCartFromServer: async () => {
//     try {
//       const response = await axios.get("/panier");
//       const items = response.data.map((p) => {
//         if (p.produit) {
//           return {
//             id: p.produit_id,
//             name: p.produit.nomProduit,
//             price: p.produit.prixProduit,
//             imageUrl: p.produit.imagePrincipale,
//             quantity: p.quantite,
//           };
//         } else if (p.accessoire) {
//           return {
//             id: p.accessoire_id,
//             accessoire_id: p.accessoire_id,
//             name: p.accessoire.nomAccessoire,
//             price: p.accessoire.prixAccessoire,
//             imageUrl: p.accessoire.imageUrl,
//             quantity: p.quantite,
//           };
//         }
//       }).filter(Boolean); // retire les entrées nulles
//       set({ cartItems: items });
//       console.log("📦 Panier chargé depuis le serveur :", items);
//     } catch (error) {
//       console.error("❌ Erreur lors du chargement du panier :", error);
//     }
//   },
// }));
import axios from "axios";
import { create } from "zustand";

// Fonction utilitaire pour construire le bon payload
function buildPayload(item, quantity) {
  if (item.type === "service" || item.service_id) {
    return { service_id: item.service_id || item.id, quantite: quantity };
  }
  if (item.type === "accessoire" || item.accessoire_id) {
    return { accessoire_id: item.accessoire_id || item.id, quantite: quantity };
  }
  return { produit_id: item.produit_id || item.id, quantite: quantity };
}

export const useCartStore = create((set, get) => ({
  cartItems: [],
  isCartOpen: false,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  setCartItems: (items) => set({ cartItems: items }),

  addToCart: async (item) => {
    const { cartItems } = get();
    const existing = cartItems.find((i) => i.id === item.id && i.type === item.type);

    const updatedItems = existing
      ? cartItems.map((i) =>
          i.id === item.id && i.type === item.type
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      : [...cartItems, { ...item, quantity: 1 }];

    set({ cartItems: updatedItems });

    const quantityToSend = existing ? existing.quantity + 1 : 1;
    const payload = buildPayload(item, quantityToSend);

    console.log("✅ Envoi au backend depuis addToCart:", payload);

    try {
      await axios.post("/panier/ajouter", payload);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout au panier :", error);
    }
  },

  increaseQuantity: async (id, type) => {
    const { cartItems } = get();
    const updated = cartItems.map((item) =>
      item.id === id && item.type === type
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    set({ cartItems: updated });

    const item = updated.find((i) => i.id === id && i.type === type);
    const payload = buildPayload(item, item.quantity);

    console.log("✅ Envoi au backend depuis increaseQuantity:", payload);

    try {
      await axios.post("/panier/ajouter", payload);
    } catch (error) {
      console.error("❌ Erreur lors de l'augmentation :", error);
    }
  },

  decreaseQuantity: async (id, type) => {
    const { cartItems } = get();
    const item = cartItems.find((i) => i.id === id && i.type === type);
    if (!item) return;

    if (item.quantity === 1) {
      await get().removeFromCart(id, type);
      return;
    }

    const updated = cartItems.map((i) =>
      i.id === id && i.type === type
        ? { ...i, quantity: i.quantity - 1 }
        : i
    );
    set({ cartItems: updated });

    const payload = buildPayload(item, item.quantity - 1);

    console.log("✅ Envoi au backend depuis decreaseQuantity:", payload);

    try {
      await axios.post("/panier/ajouter", payload);
    } catch (error) {
      console.error("❌ Erreur lors de la diminution :", error);
    }
  },

  removeFromCart: async (id, type) => {
    const { cartItems } = get();
    const updated = cartItems.filter((item) => !(item.id === id && item.type === type));
    set({ cartItems: updated });

    console.log("🗑️ Suppression du produit :", id, type);

    try {
      await axios.delete(`/panier/${id}?type=${type}`);
    } catch (error) {
      console.error("❌ Erreur lors de la suppression :", error);
    }
  },

  clearCart: async () => {
    set({ cartItems: [] });

    console.log("🧹 Panier vidé");

    try {
      await axios.delete("/panier");
    } catch (error) {
      console.error("❌ Erreur lors du vidage du panier :", error);
    }
  },

  loadCartFromServer: async () => {
    try {
      const response = await axios.get("/panier");
      const items = response.data.map((p) => {
        if (p.produit) {
          return {
            id: p.produit_id,
            produit_id: p.produit_id,
            type: "produit",
            name: p.produit.nomProduit,
            price: p.produit.prixProduit,
            imageUrl: p.produit.imagePrincipale,
            quantity: p.quantite,
          };
        } else if (p.accessoire) {
          return {
            id: p.accessoire_id,
            accessoire_id: p.accessoire_id,
            type: "accessoire",
            name: p.accessoire.nomAccessoire,
            price: p.accessoire.prixAccessoire,
            imageUrl: p.accessoire.imageUrl,
            quantity: p.quantite,
          };
        } else if (p.service) {
          return {
            id: p.service_id,
            service_id: p.service_id,
            type: "service",
            name: p.service.nom,
            price: p.service.prix,
            imageUrl: p.service.image,
            quantity: p.quantite,
          };
        }
      }).filter(Boolean);

      set({ cartItems: items });
      console.log("📦 Panier chargé depuis le serveur :", items);
    } catch (error) {
      console.error("❌ Erreur lors du chargement du panier :", error);
    }
  },
}));
