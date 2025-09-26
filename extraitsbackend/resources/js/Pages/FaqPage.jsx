import React, { useState } from "react";
import Header from "@/Pages/Header";
import Footer from "@/Pages/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Quels types de parfums proposez-vous ?",
    answer:
      "Nous proposons une large gamme de parfums corporels, d’ambiance, et d’accessoires parfumés inspirés de l’art du parfum camerounais.",
  },
  {
    question: "Comment suivre ma commande ?",
    answer:
      "Une fois votre commande passée, vous recevrez un email de confirmation avec un lien de suivi. Vous pouvez également consulter l’historique dans votre espace client.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Les délais varient selon votre localisation. En général, la livraison prend entre 2 à 5 jours ouvrés au Cameroun.",
  },
  {
    question: "Puis-je retourner un produit ?",
    answer:
      "Oui, vous avez 7 jours après réception pour retourner un produit non utilisé. Consultez notre politique de retour pour plus de détails.",
  },
  {
    question: "Comment vous contacter ?",
    answer:
      "Vous pouvez nous écrire via le formulaire de contact ou directement par email à extraits1104@gmail.com.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex flex-col font-montserrat font-bold pt-2">
      <Header />

      <main className="flex-grow px-6 py-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-xl p-8 border border-yellow-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle size={32} className="text-yellow-600" />
            <h1 className="text-3xl font-bold text-yellow-700">FAQ</h1>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <button
                  onClick={() => toggle(index)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h2 className="text-lg font-semibold text-yellow-700">
                    {faq.question}
                  </h2>
                  {openIndex === index ? (
                    <ChevronUp className="text-yellow-600" />
                  ) : (
                    <ChevronDown className="text-yellow-600" />
                  )}
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-700 mt-2"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
