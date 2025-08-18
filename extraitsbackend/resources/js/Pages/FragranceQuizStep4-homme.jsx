import React from "react";
import { router } from "@inertiajs/react";
import Header from "./Header";
import Footer from "./Footer";

const FragranceQuizStep4 = ({ selectedSex, scentType, mood }) => {
  const handleSelect = (vibe) => {
    router.visit("/quiz/step5-homme", {
        method: 'get',
      data: { selectedSex, scentType, mood, vibe, },
      preserveState: true,
    });
  };

  const options = [
    {
      id: "Audacieux",
      label: "Audacieux",
      image: "https://i.imgur.com/9oMHk8D.jpeg",
      description:
        "Un parfum affirmé qui attire l’attention. Parfait pour les esprits libres et intrépides.",
    },
    {
      id: "Doux",
      label: "Doux",
      image: "https://i.imgur.com/Xqgxb23.jpeg",
      description:
        "Un sillage tendre et rassurant qui enveloppe sans jamais dominer.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-montserrat">
        <Header />

        {/* Barre de progression */}
        <div className="w-full max-w-4xl mb-6 pt-20">
          <div className="h-2 w-full bg-gray-200 rounded-full relative">
            <div
              className="h-2 bg-yellow-400 rounded-full absolute top-0 left-0"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Quelle énergie souhaitez-vous transmettre ?
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-lg">
          Optez pour un style audacieux ou une douceur enveloppante.
        </p>

        {/* Choix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="group cursor-pointer border rounded-2xl shadow hover:shadow-lg transition p-4"
            >
              <img
                src={option.image}
                alt={option.label}
                className="rounded-xl h-82 w-full object-cover mb-4 transform transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="text-xl font-semibold text-center">{option.label}</h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                {option.description}
              </p>
            </div>
          ))}
        </div>
               <div className="mt-10">
                  <button
                    onClick={() => router.visit("/quiz/step3-homme",{
                      method: 'get',
                      data: {
                        sex: selectedSex,
                        scentType: scentType,
                        mood: mood
                      },
                      preserveState: true
                    })}
                    className="border rounded px-4 py-2 bg-white hover:bg-gray-200 transition"
                  >
                    ← Retour
                  </button>
                  </div>
      </div>
      <Footer />
    </>
  );
};

export default FragranceQuizStep4;
