import React from "react";
import Header from "@/Pages/Header";
import Footer from "@/Pages/Footer";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex flex-col font-montserrat font-bold pt-20">
      <Header />

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-yellow-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText size={32} className="text-yellow-600" />
            <h1 className="text-3xl font-bold text-yellow-700">
              Conditions d’utilisation
            </h1>
          </div>

          <p className="text-gray-700 text-md leading-relaxed">
            En accédant à notre site, vous acceptez de respecter les présentes conditions
            d’utilisation. Elles définissent les règles de conduite, les droits et les responsabilités
            des utilisateurs, ainsi que les limites d’utilisation de nos services.
          </p>

          <p className="mt-4 text-gray-700 text-md leading-relaxed">
            Vous vous engagez à utiliser le site de manière légale, éthique et respectueuse.
            Toute tentative de piratage, de collecte de données sans autorisation, ou de perturbation
            du bon fonctionnement du site est strictement interdite. Nous nous réservons le droit
            de suspendre ou de supprimer l’accès à tout utilisateur ne respectant pas ces règles.
          </p>

          <p className="mt-4 text-gray-700 text-md leading-relaxed">
            Le contenu du site, y compris les textes, images, vidéos et éléments interactifs,
            est protégé par les lois sur la propriété intellectuelle. Toute reproduction ou utilisation
            non autorisée est interdite sans notre consentement écrit.
          </p>

          <p className="mt-4 text-gray-700 text-md leading-relaxed">
            Nous nous réservons le droit de modifier ces conditions à tout moment, sans préavis.
            Il est de votre responsabilité de les consulter régulièrement. En continuant à utiliser
            le site après une mise à jour, vous acceptez les nouvelles conditions.
          </p>

          <div className="mt-6 text-center">
            <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
              Dernière mise à jour : Septembre 2025
            </span>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
