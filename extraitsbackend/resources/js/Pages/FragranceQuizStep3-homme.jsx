import React from "react";
import { router } from "@inertiajs/react";
import Header from "./Header";
import Footer from "./Footer";

const FragranceQuizStep3 = ({ selectedSex, scentType }) => {
  const handleSelect = (mood) => {
    router.visit("/quiz/step4/homme", {
       data: {
        sex: selectedSex,
        scentType: scentType,
        mood: mood,
      },
    });
  };

  const options = [
    {
      id: "Sophistique",
      label: "Sophistiqué",
      image: "https://i.imgur.com/Kk6E2ZF.jpeg",
      description:
        "Vous recherchez une élégance raffinée, un parfum qui inspire respect et confiance.",
    },
    {
      id: "Enjoue",
      label: "Enjoué",
      image: "https://i.imgur.com/U1xYD0C.jpeg",
      description:
        "Vous préférez la légèreté, l’insouciance, un parfum pétillant et joyeux comme vous.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-montserrat">
        <Header />

        {/* Progression */}
        <div className="w-full max-w-4xl mb-6 pt-20">
          <div className="h-2 w-full bg-gray-200 rounded-full relative">
            <div
              className="h-2 bg-yellow-400 rounded-full absolute top-0 left-0"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>

        {/* Titre & texte */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Quelle ambiance souhaitez-vous évoquer ?
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-lg">
          Choisissez l’humeur que vous souhaitez incarner à travers votre parfum.
        </p>

        {/* Options */}
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
            onClick={() => router.visit("/quiz/senteurs-homme",{
              data: {
                sex: selectedSex,
              }
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

export default FragranceQuizStep3;
