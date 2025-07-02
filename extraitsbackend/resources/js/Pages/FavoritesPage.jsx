// 📁 /Pages/User/FavoritesPage.jsx
import React from "react";
import { useFavoritesStore } from "./store/FavoriteStore";
import { useCartStore } from "./store/CartStore";
import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const remove = useFavoritesStore((state) => state.removeFromFavorites);
  const addToCart = useCartStore((state) => state.addToCart);
  const [showModal, setShowModal] = React.useState(false);
const [productToRemove, setProductToRemove] = React.useState(null);

const confirmRemove = (product) => {
  setProductToRemove(product);
  setShowModal(true);
};

const handleConfirm = () => {
  remove(productToRemove.id);
  setShowModal(false);
  setProductToRemove(null);
};

const handleCancel = () => {
  setShowModal(false);
  setProductToRemove(null);
};

  return (
  <div className="min-h-screen flex flex-col">
    <Header></Header>
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">❤️ Mes favoris</h2>
      {favorites.length === 0 ? (
        <p>Aucun produit en favoris.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow text-center">
              <Link href={`/product/${product.id}`}>
              <img src={product.imagePrincipale} alt={product.name} className="w-full h-48 object-cover mb-2" />
              <h3 className="text-lg font-semibold text-yellow-700">{product.nomProduit}</h3>
              <p className="text-sm text-gray-600">{product.prixProduit} FCFA</p>
              </Link>
              <div className="flex justify-center gap-2 mt-3">
                <button onClick={() => addToCart(product)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">Ajouter au panier</button>
                {/* <button onClick={() => remove(product.id)} className="text-sm text-red-600 underline">Retirer</button> */}
                <button onClick={() => confirmRemove(product)} className="text-sm text-red-600 underline">
  Retirer
</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
   <AnimatePresence>
  {showModal && (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center border border-gray-200"
      >
        <h2 className="text-lg font-semibold mb-4">
          Voulez-vous vraiment retirer ce produit ?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Oui
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Annuler
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

    <Footer></Footer>
    </div>
    
  );
}
