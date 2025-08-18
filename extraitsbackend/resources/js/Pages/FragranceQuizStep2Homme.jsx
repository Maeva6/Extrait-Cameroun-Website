import React from "react";
import { router } from "@inertiajs/react";
import Header from "./Header";
import Footer from "./Footer";

const FragranceQuizStep2Homme = ({ selectedSex }) => {
  const handleSelect = (choice) => {
    router.visit("/quiz/step3-homme", {
      data: { scentType: choice, selectedSex },
    });
  };

  const options = [
    {
      id: "Warm",
      label: "Chaleureux",
      image:
        "https://i.imgur.com/9WDvuPw.jpeg",
      description:
        "Vous aimez les senteurs qui enveloppent, réconfortent et évoquent la sensualité. Parfait pour des soirées intimes et marquer les esprits.",
    },
    {
      id: "Fresh",
      label: "Frais",
      image:
        "https://i.imgur.com/70fiOcP.jpeg",
      description:
        "Vous préférez la fraîcheur des agrumes, des fleurs légères ou de l'air marin. Parfait pour une sensation de pureté, d'énergie et de liberté.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-montserrat">
        <Header />
  <div className="w-full max-w-4xl mb-6 pt-20">
  <div className="h-2 w-full bg-gray-200 rounded-full relative">
    <div className="h-2 bg-yellow-400 rounded-full absolute top-0 left-0" style={{ width: "40%" }}></div>
  </div>
</div>

        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Vers quel type de senteur penchez-vous ?
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-lg">
          Faites votre choix pour affiner votre fragrance idéale.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl ">
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
    onClick={() => router.visit("/find-my-fragrance")}
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

export default FragranceQuizStep2Homme;
