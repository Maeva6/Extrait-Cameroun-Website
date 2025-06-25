// 📁 /Pages/User/FavoritesPage.jsx
import React from "react";
import { useFavoritesStore } from "./store/FavoriteStore";
import { useCartStore } from "./store/CartStore";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const remove = useFavoritesStore((state) => state.removeFromFavorites);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">❤️ Mes favoris</h2>
      {favorites.length === 0 ? (
        <p>Aucun produit en favoris.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow text-center">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2" />
              <h3 className="text-lg font-semibold text-yellow-700">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.price}</p>
              <div className="flex justify-center gap-2 mt-3">
                <button onClick={() => addToCart(product)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Ajouter au panier</button>
                <button onClick={() => remove(product.id)} className="text-sm text-red-600 underline">Retirer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
