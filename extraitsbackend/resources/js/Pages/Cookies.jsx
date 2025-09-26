import React from "react";
import Header from "@/Pages/Header";
import Footer from "@/Pages/Footer";
import { motion } from "framer-motion";
import { Cookie } from "lucide-react";

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex flex-col font-montserrat font-bold pt-24">
      <Header />

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl bg-white shadow-xl rounded-xl p-8 border border-yellow-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <Cookie size={32} className="text-yellow-600" />
            <h1 className="text-2xl font-bold text-yellow-700">
              Politique des cookies
            </h1>
          </div>

          <p className="text-gray-700 text-md leading-relaxed">
            Ce site utilise des cookies afin d’améliorer votre expérience de navigation,
            d’analyser le trafic et de personnaliser le contenu selon vos préférences.
            Les cookies sont de petits fichiers texte stockés sur votre appareil qui
            permettent de vous reconnaître lors de vos visites futures.
          </p>

          <p className="mt-4 text-gray-700 text-md leading-relaxed">
            Certains cookies sont essentiels au bon fonctionnement du site, tandis que
            d’autres nous aident à comprendre comment vous interagissez avec notre contenu.
            Vous avez la possibilité de gérer vos préférences en matière de cookies à tout moment
            via les paramètres de votre navigateur.
          </p>

          <p className="mt-4 text-gray-600 italic">
            En continuant à utiliser notre site, vous acceptez notre utilisation des cookies.
          </p>

          <div className="mt-6 text-center">
            <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
              {/* Mise à jour prévue : Novembre 2025 */}
            </span>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
