// 📁 src/FragranceQuizStep1.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function FragranceQuizStep1() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Barre de progression */}
      <div className="h-2 bg-gray-300 padding-top pt-24">
        <div className="h-2 bg-yellow-500 w-1/3"></div> {/* 33% progress */}
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-100">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-center">Commencer le Quiz ?</h1>
        <p className="text-sm md:text-base text-center mb-8">Choisissez la méthode de sélection préférée pour découvrir votre parfum idéal</p>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <button
            onClick={() => navigate('/quiz/parfum')}
            className="border rounded-lg p-6 w-64 bg-white hover:shadow-lg border-yellow-400 text-center"
          >
            <div className="text-yellow-600 text-2xl mb-2">🧴</div>
            <h2 className="font-bold mb-2">Choix par parfum</h2>
            <p className="text-sm text-gray-600">Vous sélectionnez des parfums que vous aimez déjà pour que nous analysions vos préférences olfactives.</p>
          </button>

          <button
            onClick={() => navigate('/quiz/ingredients')}
            className="border rounded-lg p-6 w-64 bg-white hover:shadow-lg border-yellow-400 text-center"
          >
            <div className="text-yellow-600 text-2xl mb-2">🍃</div>
            <h2 className="font-bold mb-2">Choix par ingrédients</h2>
            <p className="text-sm text-gray-600">Vous choisissez les notes que vous appréciez (jasmin, vanille, etc.) pour une recommandation sur mesure.</p>
          </button>
        </div>

        <button onClick={() => navigate('/')} className="border rounded px-4 py-2 bg-white hover:bg-gray-200">
          Retour
        </button>
      </div>

      <Footer />
    </div>
  );
}
