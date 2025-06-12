import { create } from 'zustand';

export const useFavoritesStore = create((set, get) => ({
  favorites: [],

  addToFavorites: (product) => {
    const { favorites } = get();
    const exists = favorites.find((item) => item.id === product.id);

    if (!exists) {
      set({ favorites: [...favorites, product] });
    }
  },

  removeFromFavorites: (productId) => {
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== productId),
    }));
  },

  clearFavorites: () => {
    set({ favorites: [] });
  },
}));
