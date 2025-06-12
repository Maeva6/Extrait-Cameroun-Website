import React from 'react';
import { useFavoritesStore } from './store/FavoriteStore'; // selon ton chemin
import { useCartStore } from './store/CartStore'; // idem
import Header from './Header';
import Footer from './Footer';


export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavoritesStore();
  const { addToCart } = useCartStore();

  return (
    <div className="pt-28 flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Mes Favoris</h1>

        {favorites.length === 0 ? (
          <p className="text-gray-600">Vous n'avez aucun produit en favori.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <div key={product.id} className="border rounded-xl shadow p-4 bg-white">
                <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-md mb-4" />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-yellow-700 font-bold mt-2">{product.price} €</p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-2 rounded"
                  >
                    Ajouter au panier
                  </button>
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
