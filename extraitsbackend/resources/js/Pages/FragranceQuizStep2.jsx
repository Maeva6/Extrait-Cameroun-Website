import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';

const ingredients = [
  {
    id: 1,
    name: "Douce et apaisante 🌸",
    description: "Des notes sucrées et enveloppantes aux accents de vanille, de musc blanc ou de fleurs tendres, idéales pour une sensation de bien-être et de confort.",
    image: "/images/douces-apaisantes.jpg"
  },
  {
    id: 3,
    name: "Élégante et sophistiquée 💎",
    description: "Des accords floraux nobles, boisés et parfois poudrés, qui traduisent une allure raffinée et intemporelle.",
    image: "/images/élégantes-sophistiqués.jpg"
  },
  {
    id: 2,
    name: "Joyeuse et pétillante ☀️",
    description: "Un cocktail d’agrumes, de fruits juteux et de fleurs lumineuses pour une sensation fraîche et vive, pleine d’énergie et de vitalité.",
    image: "/images/joyeuses-pétillantes.jpg"
  },
  {
    id: 4,
    name: "Sensuelle et mystérieuse 🌙",
    description: "Un parfum chaud et envoûtant, mêlant des notes orientales, ambrées ou gourmandes pour une aura magnétique et séduisante.",
    image: "/images/sensuelle-mystérieuse.jpg"
  },
  {
    id: 5,
    name: "Léger et frais",
    description: "Des senteurs aériennes aux accents aquatiques, verts ou citronnés, parfaites pour un parfum discret et quotidien.",
    image: "/images/léger-frais.jpg"
  },
  {
    id: 6,
    name: "Moyen et équilibré",
    description: "Un bon équilibre entre floral, sucré et boisé, qui offre une signature olfactive présente mais jamais envahissante.",
    image: "/images/moyen-équilibré.jpg"
  },
  {
    id: 7,
    name: "Intense et envoûtant",
    description: "Des parfums profonds et puissants aux notes orientales, épicées ou boisées, parfaits pour laisser une empreinte marquante.",
    image: "/images/intense-envoutant.jpg"
  },
  {
    id: 8,
    name: "Active et dynamique 🏃‍♀️",
    description: "Des notes fraîches et propres aux accents de musc blanc, de fleurs vertes ou de fruits légers, idéales pour un style de vie actif.",
    image: "/images/active-dynamique.jpg"
  },
  {
    id: 9,
    name: "Classique et raffinée 👗",
    description: "Des accords intemporels, souvent chyprés ou poudrés, qui rappellent les grands parfums de maison. Élégance assurée.",
    image: "/images/classiques-raffinée.jpg"
  }
];

export default function FragranceQuizStep2() {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const handleNext = () => {
    if (selectedId) {
      const selected = ingredients.find(i => i.id === selectedId);
      if (selected) {
        localStorage.setItem('selectedPersonnaliteId', selected.name); // 🟡 On stocke le nom
        router.visit('/quiz/senteurs');
      }
    }
  };

  return (
    <div className="font-montserrat font-bold min-h-screen flex flex-col">
      <Header />

      <div className="pt-20 bg-red-300">
        <div className="h-4 bg-yellow-500 w-2/3"></div>
      </div>

      <div className="flex-grow px-4 py-8 bg-gray-100 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          Choisissez une personnalité
        </h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Ce choix nous aidera à déterminer vos préférences olfactives
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
            onClick={() => router.back()}
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
