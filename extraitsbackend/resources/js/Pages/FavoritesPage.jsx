import React from "react";
import { usePage, Link, router } from "@inertiajs/react";
import { useCartStore } from "./store/CartStore";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

export default function FavoritesPage() {
  const { favorites = [] } = usePage().props;
  const addToCart = useCartStore((state) => state.addToCart);

  const [localFavorites, setLocalFavorites] = React.useState(favorites);
  const [showModal, setShowModal] = React.useState(false);
  const [itemToRemove, setItemToRemove] = React.useState(null);
  const [toastMessage, setToastMessage] = React.useState("");

  const confirmRemove = (item) => {
    setItemToRemove(item);
    setShowModal(true);
  };

  // const handleConfirm = () => {
  //   if (!itemToRemove) return;

  //   const { id, type } = itemToRemove;

  //   router.delete(`/favorites/${id}?type=${type}`, {
  //     preserveScroll: true,
  //     preserveState: true,
  //     onSuccess: () => {
  //       // Mise à jour du state local
  //       setLocalFavorites((prev) =>
  //         prev.filter((fav) => {
  //           const favItem = fav.produit || fav.accessoire || fav.service;
  //           const favType = fav.produit
  //             ? "produit"
  //             : fav.accessoire
  //             ? "accessoire"
  //             : "service";
  //           return !(favItem.id === id && favType === type);
  //         })
  //       );

  //       // ✅ Toast visible
  //       setToastMessage("Favori supprimé avec succès ✅");
  //       setTimeout(() => setToastMessage(""), 2500);
  //     },
  //     onError: () => {
  //       setToastMessage("Erreur lors de la suppression ❌");
  //       setTimeout(() => setToastMessage(""), 2500);
  //     },
  //     onFinish: () => {
  //       // Fermer le modal après la requête (succès ou échec)
  //       setShowModal(false);
  //       setItemToRemove(null);
  //     },
  //   });
  // };
const handleConfirm = async () => {
  if (!itemToRemove) return;

  const { id, type } = itemToRemove;

  try {
    await axios.delete(`/favorites/${id}?type=${type}`);

    // Mise à jour du state local
    setLocalFavorites((prev) =>
      prev.filter((fav) => {
        const favItem = fav.produit || fav.accessoire || fav.service;
        const favType = fav.produit
          ? "produit"
          : fav.accessoire
          ? "accessoire"
          : "service";
        return !(favItem.id === id && favType === type);
      })
    );

    setToastMessage("Favori supprimé avec succès ✅");
    setTimeout(() => setToastMessage(""), 2500);
  } catch (error) {
    setToastMessage("Erreur lors de la suppression ❌");
    setTimeout(() => setToastMessage(""), 2500);
  } finally {
    setShowModal(false);
    setItemToRemove(null);
  }
};

  const handleCancel = () => {
    setShowModal(false);
    setItemToRemove(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="pt-24 max-w-5xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">❤️ Mes favoris</h2>

        {localFavorites.length === 0 ? (
          <p>Aucun favori enregistré.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {localFavorites.map((fav) => {
                const item = fav.produit || fav.accessoire || fav.service;
                const type = fav.produit
                  ? "produit"
                  : fav.accessoire
                  ? "accessoire"
                  : "service";
                if (!item) return null;

                return (
                  <motion.div
                    key={`${type}-${item.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.3 }}
                    layout
                    className="border p-4 rounded shadow text-center"
                  >
                    <Link href={`/${type}/${item.id}`}>
                      <img
                        src={
                          item.imagePrincipale ||
                          item.imageUrl ||
                          item.image
                        }
                        alt={
                          item.nomProduit ||
                          item.nomAccessoire ||
                          item.nom
                        }
                        className="w-full h-48 object-cover mb-2 rounded"
                      />
                      <h3 className="text-lg font-semibold text-yellow-700">
                        {item.nomProduit ||
                          item.nomAccessoire ||
                          item.nom}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {(item.prixProduit ||
                          item.prixAccessoire ||
                          item.prix)}{" "}
                        FCFA
                      </p>
                    </Link>

                    <div className="flex justify-center gap-2 mt-3">
                      <button
                        onClick={() =>
                          addToCart({
                            id: item.id,
                            type,
                            name:
                              item.nomProduit ||
                              item.nomAccessoire ||
                              item.nom,
                            price:
                              (
                                item.prixProduit ||
                                item.prixAccessoire ||
                                item.prix
                              )?.toString() ?? "0",
                            imageUrl:
                              item.imagePrincipale ||
                              item.imageUrl ||
                              item.image,
                            quantity: 1,
                          })
                        }
                        className="text-sm bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Ajouter au panier
                      </button>
                      <button
                        onClick={() =>
                          confirmRemove({ id: item.id, type })
                        }
                        className="text-sm text-red-600 underline cursor-pointer"
                      >
                        Retirer
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ✅ Toast animé */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup de confirmation */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-4">
                Voulez-vous vraiment retirer ce favori ?
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
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
