// 📁 src/FragranceQuizStep2.jsx
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';

const ingredients = [
  {
    id: 1,
    name: "Sûr de lui et charismatique 💼",
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
    image: "./Auth/assets/images/urbain-moderne.jpg"
  },
  {
    id: 9,
    name: "Traditionnel et discret 👔",
    description: "Des notes classiques de fougère, lavande ou bois de santal qui rassurent, tout en restant élégantes et sobres.",
    image: "/images/traditionnel-discret.jpg"
  }
];


export default function FragranceQuizStep2() {
  const [selected, setSelected] = useState([]);
  // const navigate = useNavigate();

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
      router.visit('/quiz/resultat');
    }
  };

  return (
    <div className="font-montserrat font-bold min-h-screen flex flex-col">
      <div>
      <Header />
     </div>
     
      {/* Progression */}
      {/* <div className="pt-24 h-2 bg-gray-300">
        <div className="h-2 bg-yellow-500 w-2/3"></div> {/* 66% 
      </div> */}
      <div className="pt-20 bg-red-300">
  <div className="h-4 bg-yellow-500 w-2/3"></div>
</div>


      <div className="flex-grow px-4 py-8 bg-gray-100 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          Sélectionnez 1 à 3 parfums préférés
        </h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Vos choix nous aideront à déterminer vos préférences olfactives
        </p>
        {/* Progression sous le header fixe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              onClick={() => toggleSelection(ingredient.id)}
              className={`cursor-pointer border rounded-xl p-4 text-center bg-white shadow-md transition ${
                selected.includes(ingredient.id)
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
                {selected.includes(ingredient.id) ? 'Sélectionné' : 'Sélectionner'}
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
            disabled={selected.length === 0}
            className={`px-4 py-2 rounded text-white ${
              selected.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800'
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
