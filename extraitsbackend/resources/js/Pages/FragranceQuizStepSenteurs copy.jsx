import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

// ✅ Liste des personnalités connues
const personnalites = [
  { id: 1, name: "Sûr de lui et charismatique 💼" },
  { id: 2, name: "Sportif et énergique 🏋️‍♂️" },
  { id: 3, name: "Élégant et sophistiqué 🎩" },
  { id: 4, name: "Mystérieux et intense 🌌" },
  { id: 5, name: "Libre et aventurier 🌍" },
  { id: 6, name: "Décontracté et naturel 👕" },
  { id: 7, name: "Romantique et attentionné 💌" },
  { id: 8, name: "Urbain et moderne 🏙️" },
  { id: 9, name: "Traditionnel et discret 👔" }
];

export default function FragranceStepQuizSenteurs() {
  const [ingredients, setIngredients] = useState([]);
  const [selected, setSelected] = useState([]);
  const [personnalite, setPersonnalite] = useState(null);

  useEffect(() => {
    axios.get('/quiz/ingredients-data')
      .then((res) => setIngredients(res.data))
      .catch((err) => console.error('Erreur chargement ingrédients', err));
  

  // 🔄 Récupère la personnalité choisie
    const id = localStorage.getItem('selectedPersonnaliteId');
    const pers = personnalites.find(p => p.id === Number(id));
    if (pers) setPersonnalite(pers);
  }, []);

  const toggleSelection = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const handleNext = () => {
    if (selected.length >= 2) {
//       const selectedSenteurs = ingredients
//   .filter((senteur) => selected.includes(senteur.id))
//   .map((senteur) => senteur.name);

// localStorage.setItem("senteurs", JSON.stringify(selectedSenteurs));
const selectedSenteurs = ingredients
  .filter((senteur) => selected.includes(senteur.id))
  .map((senteur) => senteur.name);

localStorage.setItem("senteurs", JSON.stringify(selectedSenteurs));

      //localStorage.setItem("senteurs", JSON.stringify(selected));
      router.visit('/quiz/fragrance-result');
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-montserrat bg-white">
      <Header />
        {/* progression */}
      <div className="pt-20 bg-red-300">
        <div className="h-4 bg-yellow-500 w-3/4"></div>
      </div>
      <main className="flex-grow pt-24 px-4">
        <h2 className="text-2xl font-bold mb-3 text-center">
          🌿 Choisissez vos ingrédients préférés
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Sélectionnez 2 à 3 senteurs que vous aimeriez retrouver dans votre parfum.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {ingredients.map((senteur) => (
            <div
              key={senteur.id}
              onClick={() => toggleSelection(senteur.id)}
              className={`cursor-pointer border rounded-xl p-4 text-center shadow-md transition ${
                selected.includes(senteur.id)
                  ? 'border-yellow-500 bg-yellow-100'
                  : 'border-gray-300'
              }`}
            >
              <img
                src={senteur.image}
                alt={senteur.name}
                className="w-full h-64 object-cover rounded mb-3"
              />
              <h3 className="font-semibold">{senteur.name}</h3>
              <button className="mt-2 text-sm border px-3 py-1 rounded border-yellow-500 text-yellow-700 hover:bg-yellow-100">
                {selected.includes(senteur.id) ? 'Sélectionné' : 'Sélectionner'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            disabled={selected.length < 2}
            onClick={handleNext}
            className={`px-6 py-2 rounded text-white font-semibold transition ${
              selected.length < 2
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800'
            }`}
          >
            Continuer ({selected.length}/3 sélectionnés)
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { router } from '@inertiajs/react';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';

// // ✅ Liste des personnalités connues
// const personnalites = [
//   { id: 1, name: "Sûr de lui et charismatique 💼" },
//   { id: 2, name: "Sportif et énergique 🏋️‍♂️" },
//   { id: 3, name: "Élégant et sophistiqué 🎩" },
//   { id: 4, name: "Mystérieux et intense 🌌" },
//   { id: 5, name: "Libre et aventurier 🌍" },
//   { id: 6, name: "Décontracté et naturel 👕" },
//   { id: 7, name: "Romantique et attentionné 💌" },
//   { id: 8, name: "Urbain et moderne 🏙️" },
//   { id: 9, name: "Traditionnel et discret 👔" }
// ];

// export default function FragranceStepQuizSenteurs() {
//   const [ingredients, setIngredients] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [personnalite, setPersonnalite] = useState(null);

//   useEffect(() => {
//     axios.get('/quiz/ingredients-data')
//       .then((res) => setIngredients(res.data))
//       .catch((err) => console.error('Erreur chargement ingrédients', err));

//     // 🔄 Récupère la personnalité choisie
//     const id = localStorage.getItem('selectedPersonnaliteId');
//     const pers = personnalites.find(p => p.id === Number(id));
//     if (pers) setPersonnalite(pers);
//   }, []);

//   // ...toggleSelection et handleNext restent inchangés

//   return (
//     <div className="flex flex-col min-h-screen font-montserrat bg-white">
//       <Header />

//       <main className="flex-grow pt-24 px-4">
//         {/* ✅ Affichage de la personnalité choisie */}
//         {personnalite && (
//           <div className="bg-yellow-100 border-l-4 border-yellow-500 text-gray-700 p-4 mb-6 rounded shadow">
//             <p className="text-sm">Vous êtes plutôt :</p>
//             <h3 className="text-xl font-semibold mt-1">{personnalite.name}</h3>
//           </div>
//         )}

//         <h2 className="text-2xl font-bold mb-3 text-center">
//           🌿 Choisissez vos ingrédients préférés
//         </h2>
//         <p className="text-sm text-gray-600 text-center mb-6">
//           Sélectionnez 2 à 3 senteurs que vous aimeriez retrouver dans votre parfum.
//         </p>

//         {/* ...la grille des ingrédients reste inchangée */}

//         <div className="text-center">
//           <button
//             disabled={selected.length < 2}
//             onClick={handleNext}
//             className={`px-6 py-2 rounded text-white font-semibold transition ${
//               selected.length < 2
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-black hover:bg-gray-800'
//             }`}
//           >
//             Continuer ({selected.length}/3 sélectionnés)
//           </button>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
