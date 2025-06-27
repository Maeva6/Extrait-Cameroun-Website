// 📁 src/pages/FragranceAnalysis.jsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { router } from '@inertiajs/react';
import { useCartStore } from './store/CartStore';
import { useFavoritesStore } from './store/FavoriteStore';
import { ShoppingCart } from 'lucide-react';

const loadingImages = [
  'https://i.imgur.com/PK1tBj3.jpeg',
  'https://i.imgur.com/mpiJ8gA.jpeg',
  'https://i.imgur.com/xnR3iuP.jpeg',
  'https://i.imgur.com/iRdkexs.jpeg',
  'https://i.imgur.com/mIC9CDR.jpeg',
  'https://i.imgur.com/PpJHzTY.jpeg',
];

export default function FragranceQuizStep3() {
  const [showResult, setShowResult] = useState(false);
   const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [animateHeart, setAnimateHeart] = useState(false);

 
  const addToCart = useCartStore((state) => state.addToCart);
  const addToFavorites = useFavoritesStore((state) => state.addToFavorites);

  useEffect(() => {
    const personnaliteId = localStorage.getItem('selectedPersonnaliteId');
    const senteurs = JSON.parse(localStorage.getItem('senteurs')) || [];
    


    // Appel à Laravel pour obtenir le produit recommandé
    axios
      .get('/quiz/resultat', {
        params: {
          personnalite: personnaliteId,
          senteurs: senteurs
        },
         headers: {
    Accept: 'application/json'
  }
      })
      // .then((res) => {
      //   setRecommendedProduct(res.data);
      //   setTimeout(() => setShowResult(true), 3000);
      // })
      .then((res) => {
        console.log("🧪 Données reçues :", res.data);
  if (res.data && typeof res.data === 'object') {
    setRecommendedProduct(res.data);
  } else {
    setRecommendedProduct(null);
  }
  setTimeout(() => setShowResult(true), 3000);
})
      .catch((err) => {
        console.error('Erreur récupération recommandation', err);
        setShowResult(true); // même si erreur, on sort du chargement
      });
      // console.log("🧪 Produit recommandé reçu :", res.data);

  }, []);

  const handleFavorite = (product) => {
    addToFavorites(product);
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 600);
  };

 return (
    <div className="font-montserrat">
      <Header />
      <div className="pt-20 bg-red-300"><div className="h-4 bg-yellow-500 w-full"></div></div>

      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 pt-24">
        {showResult ? (
          recommendedProduct && recommendedProduct.nomProduit ? (
    // ✅ Ton affichage stylé ? (
            <div className="pt-10 w-full max-w-5xl px-4 md:px-16">
              <div className="flex flex-col md:flex-row gap-10">
                {/* Image produit */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="bg-amber-800 p-4 rounded-lg">
                    <img src={recommendedProduct.imagePrincipale} alt={recommendedProduct.nomProduit}
                      className="w-full max-w-sm rounded shadow hover:scale-105 transition" />
                  </div>
                </div>

                {/* Infos produit */}
                <div className="w-full md:w-1/2 space-y-4">
                  <h2 className="text-yellow-700 text-2xl">
                    {recommendedProduct.categorie?.name} : {recommendedProduct.nomProduit}
                  </h2>
                  <p className="text-yellow-600 text-lg">{recommendedProduct.prixProduit} Fcfa</p>
                  <p className="text-yellow-600">{recommendedProduct.contenanceProduit}</p>
                  <p className="text-gray-700 text-sm">{recommendedProduct.descriptionProduit}</p>
                  <p className="text-yellow-600">{recommendedProduct.modeUtilisation}</p>
                  <p className="text-sm text-gray-700">{recommendedProduct.particularite}</p>
                  {recommendedProduct.matchScore === 0 && (
  <p className="text-sm text-yellow-800 bg-yellow-100 px-3 py-2 rounded mt-2">
    Nous n'avons pas trouvé exactement ce que vous cherchez, mais ce parfum pourrait vous plaire…
  </p>
)}

                  <p className="mt-2 text-gray-700 text-sm font-medium">
                    Ingrédients clés : {(recommendedProduct.ingredients || []).map(i => i.nomIngredient).join(', ')}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-4 flex-wrap mt-4">
                    <button onClick={() => addToCart({
  id: recommendedProduct.id || Date.now(),
  name: recommendedProduct.nomProduit,
  price: recommendedProduct.prixProduit?.toString() ?? "0",
  imageUrl: recommendedProduct.imagePrincipale,
  size: recommendedProduct.contenanceProduit,
  quantity: 1,
})} className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 shadow flex items-center gap-2">
                      <ShoppingCart size={20} /> Ajouter au panier
                    </button>
                    <button onClick={() => handleFavorite(recommendedProduct)}
                      className="border border-red-400 text-red-500 px-4 py-2 rounded-full hover:bg-red-50 shadow relative overflow-hidden">
                      ❤️ Ajouter aux favoris
                      {animateHeart && (
                        <motion.span
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{ scale: [1.3, 1], opacity: [0.8, 0] }}
                          transition={{ duration: 0.6 }}
                          className="absolute top-[-10px] right-[-10px] text-2xl">
                          ❤️
                        </motion.span>
                      )}
                    </button>
                  </div>

                  <button onClick={() => router.visit('/famille/parfums-de-corps')}
                    className="mt-4 text-yellow-600 underline">
                    Découvrir d'autres parfums →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Aucune recommandation trouvée pour cette combinaison.</p>
          )
        ) : (
          <div className="grid grid-cols-3 gap-4 animate-pulse">
            {loadingImages.map((src, index) => (
              <motion.img key={index} src={src} alt="Chargement..."
                className="w-24 h-24 object-cover rounded-full shadow"
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
              />
            ))}
            <p className="col-span-3 text-center text-gray-600 mt-4 text-lg font-medium">
              Analyse de vos préférences en cours...
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}