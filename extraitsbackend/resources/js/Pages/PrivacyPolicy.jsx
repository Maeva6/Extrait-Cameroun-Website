import React from "react";
import Header from "@/Pages/Header";
import Footer from "@/Pages/Footer";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicySoon() {
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
            <ShieldCheck size={32} className="text-yellow-600" />
            <h1 className="text-2xl font-bold text-yellow-700">
              Politique de confidentialité
            </h1>
          </div>

          <p className="text-gray-700 text-md leading-relaxed">
            Cette page est en cours de rédaction. Nous mettons tout en œuvre pour
            vous fournir une politique de confidentialité claire, transparente et
            conforme aux normes les plus strictes.
          </p>

          <p className="mt-4 text-gray-600 italic">
            Revenez bientôt pour en savoir plus sur la manière dont nous protégeons vos données.
          </p>

          <div className="mt-6 text-center">
            <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
             Mise à jour prévue pour très bientôt
            </span>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
    
  );
}
