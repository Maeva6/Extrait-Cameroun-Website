import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import font from './assets/icons/font.svg';
import { FaShoppingCart, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCarousel from './ProductCarousel';
import CollectionCarousel from './CollectionCarousel';

// Images locales
import fragrance1 from './assets/images/fragrance1.png';
import fragrance2 from './assets/images/fragrance2.jpg';
import fragrance3 from './assets/images/fragrance3.jpg';

export default function Home() {
  const promoImages = [
    "https://i.imgur.com/NViKext.png",
    //"https://i.imgur.com/hwpuORW.jpeg",
    //"https://i.imgur.com/BEvklW6.jpeg",
  ];
  const [promoIndex, setPromoIndex] = useState(0);

  const fragranceImages = [fragrance1, fragrance2, fragrance3];
  const [fragranceIndex, setFragranceIndex] = useState(0);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setPromoIndex((prev) => (prev + 1) % promoImages.length);
  //   }, 3000);
  //   return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    const fragranceTimer = setInterval(() => {
      setFragranceIndex((prev) => (prev + 1) % fragranceImages.length);
    }, 5000);
    return () => clearInterval(fragranceTimer);
  }, []);

  return (
    <div className="relative font-montserrat min-h-screen pt-24 flex flex-col justify-between">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <img src={font} alt="Hero" className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-3xl md:text-5xl font-bold">Sentez la différence, Vivez l'élégance.</h1>
          <p className="text-lg mt-2">Nous sélectionnons nos fragrances avec délicatesse...</p>
        </div>
      </section>

      {/* Find My Fragrance avec carrousel à gauche */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          {/* Carrousel Image */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-full h-[450px] overflow-hidden rounded-2xl shadow-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={fragranceIndex}
                  src={fragranceImages[fragranceIndex]}
                  alt={`fragrance ${fragranceIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1}}
                  // exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex mt-4 space-x-2">
              {fragranceImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    idx === fragranceIndex ? 'bg-yellow-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setFragranceIndex(idx)}
                  aria-label={`Image ${idx + 1}`}
                ></button>
              ))}
            </div>
          </div>

          {/* Texte et bouton quiz */}
          <motion.div
            className="text-center md:text-left md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-yellow-700">Trouvez votre parfum parfait</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Répondez à quelques questions pour découvrir une fragrance qui vous correspond vraiment.
            </p>
            <p className="text-xs text-gray-400 mb-6">
              En continuant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.
            </p>
            <button
              onClick={() => navigate('/find-my-fragrance')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 text-lg rounded-xl"
            >
              Commencer le quiz
            </button>
          </motion.div>
        </div>
      </section>

      {/* Carousels */}
      <ProductCarousel />
      <CollectionCarousel />

      {/* Accessories */}
      <section className="px-4 my-8">
        <h3 className="text-lg font-semibold mb-4">Discover Our Accessories</h3>
        <p className="mb-4 text-sm">Des équipements adaptés à chaque surface pour que vos espaces diffusent en continu une fragrance raffinée.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://i.imgur.com/8jhVPRq.jpeg",
            "https://i.imgur.com/kSE89tv.jpeg",
            "https://i.imgur.com/tnmTNYP.jpeg",
            "https://i.imgur.com/fNSaMux.jpeg",
            "https://i.imgur.com/20XE1Ru.jpeg",
            "https://i.imgur.com/kChcH2Y.jpeg",
            "https://i.imgur.com/vPXzphk.jpeg",
            "https://i.imgur.com/0rYkVce.jpeg",
          ].map((src, idx) => (
            <img key={idx} src={src} alt="Accessoire" className="w-full h-full object-cover rounded-lg shadow-sm" />
          ))}
        </div>
      </section>

      {/* Livraison */}
      <section className="font-bold font-montserrat bg-yellow-100 py-6 px-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <FaShoppingCart className="text-yellow-600 text-6xl mb-8" />
          <h1 className="w-xl text-[2rem] font-bold mb-2">
            Où que vous soyez, notre fragrance vous rejoint.
          </h1>
          <p className="text-sm mb-8">
            Vous êtes indisponible ? Nos parfums viennent à vous.<br />
            Faites-vous livrer dès aujourd’hui.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            Commander maintenant
          </button>
        </div>
      </section>

       <section className="relative w-full h-[500px] overflow-hidden my-12">
      <img
        src={promoImages[0]}
        alt="Promo"
        className="w-full h-full object-cover"
      />

      {/* Contenu superposé */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
        <FaUsers className="text-yellow-400 text-6xl mb-4" />
        <p className="text-xl md:text-2xl font-semibold mb-4">
          Rejoignez notre univers parfumé dès maintenant.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded text-lg"
        >
          S'inscrire
        </button>
      </div>
    </section>

      <Footer />
    </div>
  );
}
