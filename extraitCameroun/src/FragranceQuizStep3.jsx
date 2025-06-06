// 📁 src/pages/FragranceAnalysis.jsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import {products} from './data/Products'; // ton fichier
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        {!showResult ? (
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
            <p className="col-span-3 text-center text-gray-600 mt-4">Analyse de vos préférences...</p>
          </div>
        ) : (
          <div className="max-w-md w-full text-center mt-6">
            <img src={recommendedProduct.imageUrl} alt={recommendedProduct.name} className="w-full rounded-xl shadow-lg" />
            <h2 className="text-2xl font-bold mt-4">{recommendedProduct.name}</h2>
            <p className="text-yellow-600 font-semibold mb-2">{recommendedProduct.olfactiveFamily}</p>
            <p className="text-gray-700">{recommendedProduct.description}</p>
            <p className="mt-2 font-medium text-gray-600">Ingrédients clés : {recommendedProduct.keyIngredients.join(', ')}</p>
            <p className="mt-2 text-lg font-bold">{recommendedProduct.price}</p>

            {/* <div className="flex items-center justify-center mt-2">
              {/* <span className="text-yellow-500 text-xl">⭐ {recommendedProduct.rating}</span> 
              <span className="ml-2 text-sm text-gray-600">Avis des clients</span>
            </div> */}

            <div className="mt-4 flex justify-center gap-4"> 
              <button className="bg-black text-white px-4 py-2 rounded">Ajouter au panier</button>
              <button className="border border-black px-4 py-2 rounded">Ajouter aux favoris</button>
            </div>

            <button
              onClick={() => navigate('/famille/parfums-de-corps')}
              className="mt-6 text-yellow-600 underline"
            >
              Découvrir d'autres parfums →
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
