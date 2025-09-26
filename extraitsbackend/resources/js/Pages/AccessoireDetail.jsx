import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useCartStore } from "./store/CartStore";
import { useFavoritesStore } from "./store/FavoriteStore";
import { ShoppingCart, Heart } from "lucide-react";
import { router } from "@inertiajs/react";


export default function AccessoireDetail({ accessoire }) {
     const images = [accessoire.imageUrl, accessoire.image2Url, accessoire.image3Url].filter(Boolean);
     const [currentIndex, setCurrentIndex] = useState(0);
     const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const addToCart = useCartStore((state) => state.addToCart);
const addToFavorites = useFavoritesStore((state) => state.addToFavorites);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
     <div className="min-h-screen flex flex-col">
        <Header />
    <div className="pt-28 px-6 font-montserrat">
      <h1 className="text-2xl font-bold text-yellow-700 mb-6">
        {accessoire.nomAccessoire}
      </h1>

      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[accessoire.imageUrl, accessoire.image2Url, accessoire.image3Url]
          .filter(Boolean)
          .map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              className="w-full h-[300px] object-cover rounded-lg shadow-md"
            /> */}
             <div className="relative w-full max-w-3xl mx-auto h-[400px] sm:h-[500px] overflow-hidden rounded-lg shadow-lg mb-8">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
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
        <p><strong>Nom :</strong> {accessoire.nomAccessoire}</p>
        <p><strong>Description :</strong> {accessoire.description}</p>
        <p><strong>Contenance :</strong> {accessoire.capacite || "—"}</p>
        <p><strong>Guide d'utilisation :</strong> {accessoire.guideUtilisation}</p>
        <p><strong>Guide des produits :</strong> {accessoire.guideProduits}</p>
        <p><strong>Prix :</strong> <span className="text-yellow-600 font-bold">{accessoire.prixAccessoire}</span></p>

        <div className="flex gap-4 flex-wrap mt-6">
  <button
    onClick={() =>{
        console.log("Nom envoyé au panier :", accessoire.nomAccessoire);
      addToCart({
        id: accessoire.id,
        accessoire_id: accessoire.id,
        name: accessoire.nomAccessoire,
        price: accessoire.prixAccessoire?.toString() ?? "0",
        imageUrl: accessoire.imageUrl,
        size: accessoire.capacite,
        quantity: 1,
        type: "accessoire",
      })
    }}
    className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 shadow flex items-center gap-2"
  >
    <ShoppingCart size={20} />
    Ajouter au panier
  </button>

  <button
    onClick={() => {
      router.post("/favorites", { accessoire_id: accessoire.id }, {
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
