// 📁 src/FragranceQuizStep2.jsx
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';

const ingredients = [
  {
    id: 1,
    name: "Sûr de lui et charismatique",
    description: "Des notes boisées profondes, de cuir ou d'épices chaudes qui évoquent la puissance, la confiance et le leadership naturel.",
    image: "/images/charismatique-sur.jpg"
  },
  {
    id: 2,
    name: "Sportif et énergique 🏋️‍♂️",
    description: "Des accords frais et vivifiants à base d'agrumes, de menthe ou de notes marines pour un parfum dynamique et plein d’entrain.",
    image: "/images/sportif-energique.jpg"
  },
  {
    id: 3,
    name: "Élégant et sophistiqué 🎩",
    description: "Des senteurs raffinées mariant lavande, ambre ou bois nobles pour un style classique et irréprochable.",
    image: "/images/élégant-sophistiqué.jpg"
  },
  {
    id: 4,
    name: "Mystérieux et intense 🌌",
    description: "Un sillage sombre et captivant avec des notes orientales, résineuses ou fumées, pour un homme insaisissable et séduisant.",
    image: "/images/mystérieux-intense.jpg"
  },
  {
    id: 5,
    name: "Libre et aventurier 🌍",
    description: "Un parfum inspiré par la nature et les grands espaces : accords boisés, aromatiques et verts pour l'homme en quête de liberté.",
    image: "/images/libre-aventurier.jpg"
  },
  {
    id: 6,
    name: "Décontracté et naturel 👕",
    description: "Des fragrances légères et aériennes à base de musc blanc, de thé vert ou de notes aquatiques, parfaites au quotidien.",
    image: "/images/décontracté-naturel.jpg"
  },
  {
    id: 7,
    name: "Romantique et attentionné 💌",
    description: "Un mélange subtil de notes florales masculines, poudrées ou sucrées pour une aura douce, tendre et touchante.",
    image: "/images/romantique-attentionné.jpg"
  },
  {
    id: 8,
    name: "Urbain et moderne 🏙️",
    description: "Des accords innovants, métalliques ou ozoniques, qui capturent le rythme et l’élégance de la vie contemporaine.",
    image: "/images/urbain-moderne.jpg"
  },
  {
    id: 9,
    name: "Traditionnel et discret 👔",
    description: "Des notes classiques de fougère, lavande ou bois de santal qui rassurent, tout en restant élégantes et sobres.",
    image: "/images/traditionnel-discret.jpg"
  }
];


export default function FragranceQuizStep5homme() {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  // const handleNext = () => {
  //   if (selectedId) {
  //     // stocke la personnalité dans localStorage ou Inertia visit
  //     localStorage.setItem('selectedPersonnaliteId', selectedId);
  //     router.visit('/quiz/senteurs');
  //   }
  // };
  const handleNext = () => {
  if (selectedId) {
    const selected = ingredients.find(i => i.id === selectedId);
    if (selected) {
      // localStorage.setItem('selectedPersonnaliteId', selected.name); // 🔁 le nom, pas l'id
      // localStorage.setItem('selectedPersonnaliteId', selected.id); // 🟡 On stocke l'ID
      router.visit('/quiz/fragrance-result', {
  method: 'get',
  data: {
    personality: selected.name,
    personalityId: selected.id,
    // tu peux aussi transmettre les autres valeurs ici si besoin
  },
  preserveState: true,
});

    }
  }
};


  return (
    <div className="font-montserrat font-bold min-h-screen flex flex-col">
      <Header />
       {/* progression */}
      {/* <div className="pt-20 bg-red-300"> // fond rouge*/}
      <div className="pt-20 ">
        <div className="h-4 bg-yellow-500 w-4/4"></div>
      </div>
      {/* <div className="pt-20 bg-red-300">
        <div className="h-4 bg-yellow-500 w-1/3"></div>
      </div> */}

      <div className="flex-grow px-4 py-8 bg-gray-100 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          Choisissez une personnalité
        </h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Ce choix nous aidera à comprendre votre univers parfumé 🌿
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              onClick={() => handleSelect(ingredient.id)}
              className={`cursor-pointer border rounded-xl p-4 text-center bg-white shadow-md transition ${
                selectedId === ingredient.id
                  ? 'border-yellow-500 bg-yellow-300'
                  : 'border-gray-300'
              }`}
            >
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="w-full h-80 object-cover rounded-md mb-3"
              />
              <h3 className="font-bold mb-1">{ingredient.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{ingredient.description}</p>
              <button className="text-yellow-600 text-sm border border-yellow-500 px-3 py-1 rounded hover:bg-yellow-100">
                {selectedId === ingredient.id ? 'Sélectionné' : 'Sélectionner'}
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.visit("/quiz/step4/homme")}
            className="border px-4 py-2 rounded bg-white hover:bg-gray-200"
          >
            Retour
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedId}
            className={`px-4 py-2 rounded text-white ${
              !selectedId ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            Suivant
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}