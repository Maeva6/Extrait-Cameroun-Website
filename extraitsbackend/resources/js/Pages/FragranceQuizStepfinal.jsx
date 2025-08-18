// 📁 src/pages/FragranceQuizStepfinal.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { router, usePage } from '@inertiajs/react';
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

export default function FragranceQuizStepfinal() {
  const { props } = usePage();
  const product = props.product;
const { sex, scentType, mood, vibe, personality, personalityId } = props;
 
  const [recommendedProducts, setRecommendedProducts] = useState([]);
const [produitInitial, setProduitInitial] = useState(null);
const [ingredientPrincipal, setIngredientPrincipal] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [animateHeart, setAnimateHeart] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const addToFavorites = useFavoritesStore((state) => state.addToFavorites);

//   const handleAddToCart = async (product) => {
const addToCartAndSync = async (product) => {
  
  addToCart(product); // local

  try {
    await axios.post('/panier/ajouter', {
      id: product.idProduit ?? product.id,
      quantite: 1,
      imagePrincipale: product.imagePrincipale,
      nomProduit: product.nomProduit,
      prixProduit: product.prixProduit
    });
    console.log('✅ Produit ajouté au panier côté backend');
  } catch (error) {
    console.error('❌ Erreur ajout au panier backend :', error?.response?.data);
  }
};



useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  const finalSex = params.get("sex") || localStorage.getItem("selectedSex");
  const finalScentType = params.get("scentType") || localStorage.getItem("scentType");
  const finalMood = params.get("mood") || localStorage.getItem("selectedMood");
  const finalVibe = params.get("vibe") || localStorage.getItem("selectedVibe");
  const finalPersonality = params.get("personality") || localStorage.getItem("personality");
  const finalPersonalityId = params.get("personalityId") || localStorage.getItem("personalityId");
  

  console.log("🎯 Données quiz finales :", {
    finalSex,
    finalScentType,
    finalMood,
    finalVibe,
    finalPersonality,
    finalPersonalityId,
  });

  axios
    .get('/quiz/resultat', {
      params: {
        sex: finalSex,
        scentType: finalScentType,
        mood: finalMood,
        vibe: finalVibe,
        personality: finalPersonality,
        personalityId: finalPersonalityId,
      },
      headers: { Accept: 'application/json' },
    })
    .then((res) => {
      const { produitInitial, ingredientPrincipal, produitsRecommandes } = res.data || {};
      setProduitInitial(produitInitial);
      setIngredientPrincipal(ingredientPrincipal);
      setRecommendedProducts(produitsRecommandes || []);
      setTimeout(() => setShowResult(true), 3000);
    })
    .catch((err) => {
      console.error('❌ Erreur récupération recommandation', err);
      setShowResult(true);
    });
}, []);



  const handleFavorite = async (product) => {
  // console.log("🧡 Favoris - produit reçu :", product);
  addToFavorites(product); // local

  try {
    await axios.post('/favorites', {
      produit_id: product.id,
    });
    // console.log('✅ Favori enregistré côté backend');
  } catch (error) {
    console.error('❌ Erreur ajout favori backend :', error?.response?.data);
  }

  setAnimateHeart(true);
  setTimeout(() => setAnimateHeart(false), 600);
};

  return (
    <div className="font-montserrat">
      <Header />
      <div className="pt-20 ">
        <div className="h-4 bg-yellow-500 w-full"></div>
      </div>

      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 pt-6">
  {!showResult ? (
    <div className="grid grid-cols-3 gap-4 animate-pulse">
      {loadingImages.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt="Chargement..."
          className="w-24 h-24 object-cover rounded-full shadow"
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
        />
      ))}
      <p className="col-span-3 text-center text-gray-600 mt-4 text-lg font-medium">
        Analyse de vos préférences en cours...
      </p>
    </div>
  ) : recommendedProducts.length > 0 ? (
    <div className="w-full max-w-6xl">
      <h2 className="text-2xl text-yellow-700 mb-6">
        Voici tous les produits associés à la senteur "{ingredientPrincipal}" ✨
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendedProducts.map((product, index) => (
          <div key={index} className="border rounded-xl p-4 shadow hover:shadow-md transition">
            <img src={product.imagePrincipale} alt={product.nomProduit} className="w-full h-60 object-cover rounded" />
            <h3 className="text-lg text-yellow-800 mt-2 font-bold">{product.nomProduit}</h3>
            <p className="text-yellow-600">{product.prixProduit} Fcfa</p>
            <p className="text-sm text-gray-700">{product.contenanceProduit}</p>

            <p className="mt-2 text-sm text-gray-600">{product.descriptionProduit}</p>
            <p className="text-sm mt-1 text-gray-700 font-bold">
              Ingrédients clés : {(product.ingredients || []).map(i => i.nomIngredient).join(', ')}
            </p>

            <div className="flex gap-2 mt-3">
              {/* <button
                onClick={() =>
                  addToCartAndSync(product)
                }
                className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 shadow cursor-pointer"
              >
                <ShoppingCart size={16} className="inline mr-1" /> Ajouter au panier
              </button> */}
              <button
  onClick={() =>
    
    addToCart({
      id: product.idProduit ?? product.id,
      name: product.nomProduit,
      price: product.prixProduit,
      imageUrl: product.imagePrincipale,
      size: product.contenanceProduit,
      quantity: 1
    })
  }
  className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 shadow cursor-pointer"
>
  <ShoppingCart size={16} className="inline mr-1" /> Ajouter au panier
</button>


              <button
                onClick={() => handleFavorite({ id: product.id,
  name: product.nomProduit,
  price: product.prixProduit,
  imageUrl: product.imagePrincipale,
  })}
                className={`border border-red-400 text-red-500 px-3 py-1 rounded-full shadow cursor-pointer transition-transform duration-100 ${
    animateHeart ? 'scale-110 bg-red-100' : ''
  }`}
              >
                ❤️ Ajouter aux favoris
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.visit('/body-perfume')}
        className="mt-8 text-yellow-600 underline hover:text-yellow-800 block"
      >
        Explorer d'autres senteurs →
      </button>
    </div>
  ) : (
    <p className="text-gray-600">Aucune recommandation trouvée.</p>
  )}
</div>


      <Footer />
    </div>
  );
}
