// 📁 src/FragranceQuizStep2.jsx
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const ingredients = [
  { id: 1, name: "Cire d'abeille", description: 'Sucrée, douce et réconfortante' },
  { id: 2, name: "Cire de soja", description: 'Naturelle, légère et végétale' },
  { id: 3, name: "Ambre", description: 'Chaud, résineux et sensuel' },
  { id: 4, name: "Vanille", description: 'Douce, gourmande et chaleureuse' },
  { id: 5, name: "Bois de santal", description: 'Crémeux, boisé et apaisant' },
  { id: 6, name: "Fleur d’oranger", description: 'Florale, sucrée et éclatante' },
  { id: 7, name: "Lavande", description: 'Aromatique, fraîche et apaisante' },
  { id: 8, name: "Musc blanc", description: 'Propre, doux et poudré' },
  { id: 9, name: "Patchouli", description: 'Terreux, profond et mystérieux' },
];

export default function FragranceQuizStep2() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleSelection = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const handleNext = () => {
    if (selected.length > 0) {
      // Tu peux stocker la sélection dans un contexte ou localStorage ici
      navigate('/quiz/resultat');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Progression */}
      <div className="h-2 bg-gray-300">
        <div className="h-2 bg-yellow-500 w-2/3"></div> {/* 66% */}
      </div>

      <div className="flex-grow px-4 py-8 bg-gray-100 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Sélectionnez 1 à 3 parfums préférés</h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Vos choix nous aideront à déterminer vos préférences olfactives
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {ingredients.map(({ id, name, description }) => (
            <div
              key={id}
              onClick={() => toggleSelection(id)}
              className={`cursor-pointer border rounded-xl p-4 text-center bg-white shadow-md transition ${
                selected.includes(id)
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-300'
              }`}
            >
              <div className="text-yellow-600 text-3xl mb-2">🌿</div>
              <h3 className="font-bold mb-1">{name}</h3>
              <p className="text-sm text-gray-600 mb-2">{description}</p>
              <button className="text-yellow-600 text-sm border border-yellow-500 px-3 py-1 rounded hover:bg-yellow-100">
                {selected.includes(id) ? 'Sélectionné' : 'Sélectionner'}
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="border px-4 py-2 rounded bg-white hover:bg-gray-200"
          >
            Retour
          </button>
          <button
            onClick={handleNext}
            disabled={selected.length === 0}
            className={`px-4 py-2 rounded text-white ${
              selected.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            suivant ({selected.length}/3 selectionnées)
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
