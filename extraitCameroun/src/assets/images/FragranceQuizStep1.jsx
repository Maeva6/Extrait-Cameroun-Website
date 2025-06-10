// 📁 src/FragranceQuizStep1.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import hommeImg from './assets/images/homme.jpg';
import femmeImg from './assets/images/femme.jpg';


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
        <p className="text-xs font-montserrat font-bold md:text-base text-center mb-8">À qui ce parfum est-il destiné ?</p>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <button
            onClick={() => navigate('/fragrance-step2-homme')}
            className="border rounded-lg p-6 w-64 bg-white hover:shadow-lg border-yellow-400 text-center"
          >
            <img src={hommeImg} alt="Parfum Homme" className="w-40 h-40 object-cover rounded-full mx-auto mb-4" />
            <h2 className="font-bold mb-2">Homme</h2>
            <p className="text-sm text-gray-600">Élégance, caractère, intensité. Une fragrance qui vous révèle.</p>
          </button>

          <button
            onClick={() => navigate('/quiz/ingredients')}
            className="border rounded-lg p-6 w-64 bg-white hover:shadow-lg border-yellow-400 text-center"
          >
            <img src={femmeImg} alt="Parfum Femme" className="w-40 h-40 object-cover rounded-full mx-auto mb-4" />
            <h2 className="font-bold mb-2">Femme</h2>
            <p className="text-sm text-gray-600">Douceur, mystère, éclat. Un parfum à votre image.</p>
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
