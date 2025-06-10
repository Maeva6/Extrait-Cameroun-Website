// 📁 src/pages/FragranceAnalysis.jsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import {products} from './data/Products'; // ton fichier
import { useNavigate } from 'react-router-dom';
import { useCart } from "./contexts/CartContext";
import { useFavorites } from "./contexts/FavoritesContext";
import { ShoppingCart } from "lucide-react";


const ingredientImages = [
  'https://i.imgur.com/PK1tBj3.jpeg',
  'https://i.imgur.com/mpiJ8gA.jpeg',
  'https://i.imgur.com/xnR3iuP.jpeg',
  'https://i.imgur.com/iRdkexs.jpeg',
  'https://i.imgur.com/mIC9CDR.jpeg',
  'https://i.imgur.com/PpJHzTY.jpeg',
  // ajoute d'autres images réalistes
];

export default function FragranceQuizStep3() {
  const [showResult, setShowResult] = useState(false);
  const recommendedProduct = products[0]; // remplacer par celui issu du quiz
  const navigate = useNavigate();
  const { addToCart } = useCart();
const { addToFavorites } = useFavorites();


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 pt-24">
        
        {showResult ? (
  <div className="pt-10 px-4 md:px-16 lg:px-24 font-montserrat font-bold bg-white w-full">
    <div className="flex flex-col md:flex-row gap-10 items-start">
      {/* Colonne image */}
      <div className="flex w-full md:w-1/2 justify-center">
        <img
          src={recommendedProduct.imageUrl}
          alt={recommendedProduct.name}
          className="w-full max-w-sm mx-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-105 will-change-transform"
        />
      </div>

      {/* Colonne texte */}
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-yellow-700 text-2xl">{recommendedProduct.category} : {recommendedProduct.name}</h2>
        <p className="text-yellow-600 text-lg">{recommendedProduct.price}</p>
        <p className="text-yellow-600">{recommendedProduct.size}</p>

        <p className="text-gray-800 text-sm leading-relaxed">
          {recommendedProduct.description}
        </p>

        <p className="text-yellow-600">{recommendedProduct.utilisation}</p>

        <p className="text-gray-800 text-sm leading-relaxed">
          {recommendedProduct.particularité}
        </p>

        <p className="mt-2 font-medium text-gray-600">Ingrédients clés : {recommendedProduct.keyIngredients?.join(', ')}</p>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => addToCart(recommendedProduct)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 shadow flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Ajouter au panier
          </button>
          <button
            onClick={() => addToFavorites(recommendedProduct)}
            className="border border-red-400 text-red-500 px-4 py-2 rounded-full hover:bg-red-50 shadow"
          >
            ❤️ Ajouter au favoris
          </button>
        </div>

        <button
          onClick={() => navigate('/famille/parfums-de-corps')}
          className="mt-4 text-yellow-600 underline"
        >
          Découvrir d'autres parfums →
        </button>
      </div>
    </div>
  </div>
) : (
  // animation loading
   <div className="grid grid-cols-3 gap-4 animate-pulse">
    {ingredientImages.map((src, index) => (
      <motion.img
        key={index}
        src={src}
        alt="Ingrédient"
        className="w-24 h-24 object-cover rounded-full shadow-lg"
        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: index * 0.2,
        }}
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
