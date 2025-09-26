import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subscribe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 👉 Tu peux ici intégrer un appel API ou envoyer vers une boîte mail
    console.log("Form submitted:", form);
    alert("Message envoyé !");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="pt-28 flex-grow py-20 px-6 max-w-5xl mx-auto font-montserrat">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 text-yellow-700">Contactez-nous</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Nom *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Message</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="subscribe"
                checked={form.subscribe}
                onChange={handleChange}
                className="w-4 h-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700 cursor-pointer">
                S’inscrire à notre liste d’emails pour recevoir des mises à jour, promotions et plus.
              </label>
            </div>
            <button
              type="submit"
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition font-semibold"
            >
              Envoyer
            </button>
          </form>

          {/* Infos de contact */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-yellow-700 mb-2">Adresse</h2>
              <p className="text-gray-700">EXTRAITS Cameroun<br />Douala, Cameroun <br />extraits1104@gmail.com</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-yellow-700 mb-2">Horaires d’ouverture</h2>
              <p className="text-gray-700">
                Lundi - Vendredi : 9h - 18h<br />
                Samedi : 10h - 14h<br />
                Dimanche : Fermé
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-yellow-700 mb-2">WhatsApp</h2>
              <a
                href="https://wa.me/237692616200"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
              >
                Envoyez-nous un message
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
