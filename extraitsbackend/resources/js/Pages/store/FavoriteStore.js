// import { create } from 'zustand';

// export const useFavoritesStore = create((set, get) => ({
//   favorites: [],

//   addToFavorites: (product) => {
//     console.log("🧡 Favoris - produit reçu :", product);

//     const exists = get().favorites.some((item) => item.id === product.id);
//     if (!exists) {
//       set((state) => ({
//         favorites: [...state.favorites, product],
//       }));
//     }
//   },

//   removeFromFavorites: (productId) => {
//     set((state) => ({
//       favorites: state.favorites.filter((item) => item.id !== productId),
//     }));
//   },

//   clearFavorites: () => set({ favorites: [] }),
// }));

import { create } from 'zustand';

export const useFavoritesStore = create((set, get) => ({
  favorites: [],

  addToFavorites: (item) => {
    console.log("🧡 Favoris - reçu :", item);

    const exists = get().favorites.some(
      (fav) => fav.id === item.id && fav.type === item.type
    );

    if (!exists) {
      set((state) => ({
        favorites: [...state.favorites, item],
      }));
    }
  },

  removeFromFavorites: (id, type) => {
    set((state) => ({
      favorites: state.favorites.filter(
        (item) => !(item.id === id && item.type === type)
      ),
    }));
  },

  clearFavorites: () => set({ favorites: [] }),
}));
