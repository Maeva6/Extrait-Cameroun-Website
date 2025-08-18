import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';

const personalities = [
  {
    id: 1,
    name: "Douce et apaisante 🌸",
    description: "Des notes sucrées et enveloppantes aux accents de vanille, de musc blanc ou de fleurs tendres, idéales pour une sensation de bien-être et de confort.",
    image: "/images/douces-apaisantes.jpg"
  },
  {
    id: 2,
    name: "Joyeuse et pétillante ☀️",
    description: "Un cocktail d’agrumes, de fruits juteux et de fleurs lumineuses pour une sensation fraîche et vive, pleine d’énergie et de vitalité.",
    image: "/images/joyeuses-pétillantes.jpg"
  },
  {
    id: 3,
    name: "Élégante et sophistiquée 💎",
    description: "Des accords floraux nobles, boisés et parfois poudrés, qui traduisent une allure raffinée et intemporelle.",
    image: "/images/élégantes-sophistiqués.jpg"
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

export default function FragranceQuizPersonalityWoman() {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const handleNext = () => {
  if (selectedId) {
    const selected = personalities.find(p => p.id === selectedId);
    if (selected) {
      const sex = localStorage.getItem("selectedSex");
      const scentType = localStorage.getItem("scentType");
      const mood = localStorage.getItem("mood");
      const vibe = localStorage.getItem("vibe");

      // facultatif : stocker la personnalité en localStorage aussi
      localStorage.setItem("personality", selected.name);
      localStorage.setItem("personalityId", selected.id);
      console.log("🧪 Données envoyées à la dernière étape :", {
  sex,
  scentType,
  mood,
  vibe,
  personality: selected.name,
  personalityId: selected.id,
});

      // router.visit('/quiz/fragrance-result', {
      router.visit(`/quiz/fragrance-result?sex=${sex}&scentType=${scentType}&mood=${mood}&vibe=${vibe}&personality=${selected.name}&personalityId=${selected.id}`,{
        method: 'get',
        params: {
          sex,
          scentType,
          mood,
          vibe,
          personality: selected.name,
          personalityId: selected.id,
        },
        preserveState: true,
      });
    }
  }
};


  return (
    <div className="font-montserrat font-bold min-h-screen flex flex-col">
      <Header />

      {/* Barre de progression */}
      <div className="w-full max-w-4xl mb-6 pt-20 mx-auto">
        <div className="h-2 w-full bg-gray-200 rounded-full relative">
          <div className="h-2 bg-yellow-400 rounded-full absolute top-0 left-0" style={{ width: '100%' }}></div>
        </div>
      </div>

      <div className="flex-grow px-4 py-8 bg-gray-100 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 text-center">
          Quelle personnalité vous inspire le plus ?
        </h2>
        <p className="text-sm text-gray-600 mb-8 text-center max-w-lg">
          Cela nous aidera à personnaliser votre parfum idéal 🌸
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 w-full max-w-6xl">
          {personalities.map((p) => (
            <div
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={`cursor-pointer border rounded-2xl p-4 text-center bg-white shadow transition-transform hover:shadow-lg hover:scale-105 ${
                selectedId === p.id
                  ? 'border-yellow-500 bg-yellow-300'
                  : 'border-gray-300'
              }`}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-80 object-cover rounded-md mb-3 transition-transform duration-300"
              />
              <h3 className="font-bold mb-1">{p.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{p.description}</p>
              <button className="text-yellow-600 text-sm border border-yellow-500 px-3 py-1 rounded hover:bg-yellow-100">
                {selectedId === p.id ? 'Sélectionné' : 'Sélectionner'}
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.visit("/quiz/step4")}
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
            Voir mon parfum
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
