// 📁 src/Home.jsx
import Header from './Header'
import Footer from './Footer';
import React, { useEffect, useState } from 'react';
import font from './assets/icons/font.svg';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import ProductCarousel from './ProductCarousel';
import CollectionCarousel from './CollectionCarousel';

export default function Home() {
  //images pour le signup 
  const promoImages = [
  "https://i.imgur.com/uFW2x7U.jpeg",
  "https://i.imgur.com/JziUFQX.jpeg",
  "https://i.imgur.com/BEvklW6.jpeg",
];
const [promoIndex, setPromoIndex] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setPromoIndex((prev) => (prev + 1) % promoImages.length);
  }, 3000); // changement toutes les 3 secondes
  return () => clearInterval(timer);
}, []);

  return (
    <div className="font-sans min-h-screen flex flex-col justify-between">
      <Header/>

      {/* Hero Section */}
      <section className="relative">
        <img src={font} alt="Hero" className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-2xl md:text-4xl font-bold">Sentez la différence, Vivez l'élégance.</h1>
          <p className="text-lg mt-2">Nous sélectionnons nos fragrances avec délicatesse...</p>
        </div>
      </section>

      {/* Find Scent */}
      <section className="text-center my-8 px-4">
        <h2 className="text-xl font-semibold mb-2">Find Your Perfect Scent</h2>
        <p className="mb-4 text-sm">Answer a few simple questions to discover your fragrance...</p>
        <p className="mb-4 text-[10px]">By proceeding, you agree to our Terms and Conditions and Privacy Policy.</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Find My Fragrance</button>
      </section>

      <ProductCarousel />

      {/* Product Carousel */}
      {/* <section className="px-4 my-8">
         <h3 className="text-lg font-semibold mb-4">Explore Our Collections</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <img src="https://i.imgur.com/xhoO5xY.jpeg" />
            <p className="text-sm font-medium">Eau de parfum Jasmin Dream</p>
            <p className="text-xs text-gray-600">Référence</p>
          </div> */}
          {/* Autres produits ici */}
        {/* </div>
      </section> */}
      <CollectionCarousel/>

      {/* Accessories */}
      <section className="px-4 my-8">
        <h3 className="text-lg font-semibold mb-4">Discover Our Accessories</h3>
        <p className="mb-4 text-sm">Des équipements adaptés à chaque surface pour que vos espaces diffusent en continu une fragrance raffinée.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="https://i.imgur.com/8jhVPRq.jpeg" alt="Accessoire" className="w-full h-full object-cover" />
          <img src="https://i.imgur.com/kSE89tv.jpeg" alt="Accessoire" className="w-full h-full object-cover" />
          <img src="https://i.imgur.com/tnmTNYP.jpeg" alt="Accessoire" className="w-full h-full object-cover" />
          <img src="https://i.imgur.com/fNSaMux.jpeg" alt="Accessoire" className="w-full h-full object-cover" />
          <img src="https://i.imgur.com/20XE1Ru.jpeg" alt="Accessoire" className="w-full h-full object-cover" />
          <img src="https://i.imgur.com/kChcH2Y.jpeg" alt="Accessoire" className="w-full h-full object-cover" />
          <img src="https://i.imgur.com/vPXzphk.jpeg" alt="Accessoire" className="w-full h-full object-cover" />
          <img src="https://i.imgur.com/0rYkVce.jpeg" alt="Accessoire" className="w-full h-full object-cover" />
          {/* Autres accessoires ici */}
        </div>
      </section>

      {/* Delivery Banner */}
      {/* Delivery Banner */}
<section className="bg-yellow-100 py-6 px-4 text-center">
  <div className="flex flex-col items-center justify-center">
    <FaShoppingCart className="text-yellow-600 text-3xl mb-2" /> {/* 🛒 Icône */}
    <h4 className="text-md font-bold mb-2">
      Où que vous soyez, notre fragrance vous rejoint.
    </h4>
    <p className="text-sm mb-4">
      Vous êtes indisponible en ce moment ? Pas de souci... <br />
      Nos parfums viennent à vous. Dès aujourd’hui faites vous livrer où que vous soyez.
    </p>
    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
      Commander maintenant
    </button>
  </div>
</section>


      {/* Promotion Banner */}
<section className="text-center my-8">
  <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl">
    <img
      src={promoImages[promoIndex]}
      alt={`Promo ${promoIndex + 1}`}
      className="w-full h-auto transition-opacity duration-700 ease-in-out"
    />
  </div>
  
  {/* Icône équipe */}
  <div className="flex justify-center mt-4">
    <FaUsers className="text-yellow-600 text-3xl" />
  </div>

  <p className="font-semibold my-4">Rejoignez notre univers parfumé dès maintenant.</p>
  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
    S'inscrire
  </button>
</section>


     <Footer/>
    </div>
  );
}
