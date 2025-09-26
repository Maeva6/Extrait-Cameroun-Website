import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useCartStore } from "./store/CartStore";
import { useFavoritesStore } from "./store/FavoriteStore";
import { ShoppingCart, Heart } from "lucide-react";
import { router, usePage } from "@inertiajs/react";


export default function ServiceDetail() {
  const { service } = usePage().props;
  const images = [service.image, service.image2, service.image3].filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToCart = useCartStore((state) => state.addToCart);
  const addToFavorites = useFavoritesStore((state) => state.addToFavorites);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-28 px-6 font-montserrat">
        <h1 className="text-2xl font-bold text-yellow-700 mb-6">
          {service.nom}
        </h1>

        {/* <div className="relative w-full max-w-3xl mx-auto h-[400px] sm:h-[500px] overflow-hidden rounded-lg shadow-lg mb-8"> */}
        <div className="pt-8 px-6 font-montserrat max-w-3xl mx-auto">
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            // className="w-full h-full object-cover"
             className="w-full h-64 object-cover rounded-lg mb-4"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white px-3 py-2 rounded-full shadow-md hover:bg-yellow-700"
              >
                ◀
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white px-3 py-2 rounded-full shadow-md hover:bg-yellow-700"
              >
                ▶
              </button>
            </>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <p><strong>Description :</strong> {service.description}</p>
          <p><strong>Prix :</strong> <span className="text-yellow-600 font-bold">{service.prix} FCFA</span></p>

          <div className="flex gap-4 flex-wrap mt-6">
            <button
              onClick={() => {
                console.log("Nom envoyé au panier :", service.nom);
                addToCart({
                  id: service.id,
                  service_id: service.id,
                  name: service.nom,
                  price: service.prix?.toString() ?? "0",
                  imageUrl: service.image,
                  quantity: 1,
                  type: "service",
                });
              }}
              className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 shadow flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Ajouter au panier
            </button>

            <button
              onClick={() => {
                router.post("/favorites", { service_id: service.id }, {
                  onSuccess: () => router.visit("/mes-favoris"),
                  onError: () => alert("Erreur lors de l'ajout aux favoris"),
                });
              }}
              className="border border-red-400 text-red-500 px-4 py-2 rounded-full hover:bg-red-50 shadow flex items-center gap-2"
            >
              <Heart size={20} fill="currentColor" />
              Ajouter aux favoris
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
