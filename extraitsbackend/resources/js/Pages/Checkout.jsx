import React, { useState } from "react";
import { useCartStore } from "./store/CartStore";
import { router } from "@inertiajs/react";
import Header from "./Header";
import Footer from "./Footer";
import { FaWhatsapp } from "react-icons/fa";

export default function Checkout() {
  const { cartItems, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("mobile_money");

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    city: "",
    neighborhood: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = () => {
    return Object.values(form).every((field) => field.trim() !== "");
  };

  const total = cartItems.reduce((sum, item) => {
  const price = parseFloat(item.price) || 0;
  return sum + price * item.quantity;
}, 0);

  const handleConfirm = () => {
    if (!isValid()) {
      alert("Merci de remplir tous les champs obligatoires.");
      return;
    }
    const transformedItems = cartItems.map(item => ({
  id: item.id,
  quantite: item.quantity // 👈 Transformation ici
}));


    if (!paymentMethod || cartItems.length === 0) return;
    
    router.post("/orders", {
      items: cartItems,
      total_price: total,
      payment_method: paymentMethod,
      ...form,
    });

    const message = encodeURIComponent(
      `Bonjour, je viens de passer une commande sur le site.\n\n🧍 Nom : ${form.firstname} ${form.lastname}\n🏙️ Ville : ${form.city}, ${form.neighborhood}\n📞 Téléphone : ${form.phone}\n💰 Montant total : ${total.toLocaleString()} FCFA\n💳 Paiement : ${paymentMethod}`
    );

    // clearCart();
    // window.location.href = `https://wa.me/23792616200?text=${message}`;
    setTimeout(() => {
  clearCart();
  window.location.href = `https://wa.me/23792616200?text=${message}`;
}, 100); // petit délai pour laisser Zustand mettre à jour

  };
// const handleConfirm = async () => {
//   if (!isValid()) {
//     alert("Merci de remplir tous les champs obligatoires.");
//     return;
//   }

//   if (!paymentMethod || cartItems.length === 0) return;

//   try {
//     await router.post(
//       "/orders",
//       {
//         items: cartItems,
//         total_price: total,
//         payment_method: paymentMethod,
//         ...form,
//       },
//       {
//         preserveScroll: true,
//         onSuccess: () => {
//           clearCart();

//           const message = encodeURIComponent(
//             `Bonjour, je viens de passer une commande sur le site.\n\n🧍 Nom : ${form.firstname} ${form.lastname}\n🏙️ Ville : ${form.city}, ${form.neighborhood}\n📞 Téléphone : ${form.phone}\n💰 Montant total : ${total.toLocaleString()} FCFA\n💳 Paiement : ${paymentMethod}`
//           );

//           window.location.href = `https://wa.me/23792616200?text=${message}`;
//         },
//         onError: () => {
//           alert("Une erreur est survenue. La commande n’a pas été enregistrée.");
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Erreur de création de la commande :", error);
//   }
// };


  return (
    <div className="pt-24 min-h-screen bg-white font-montserrat">
      <Header />
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        <h1 className="text-2xl font-bold text-yellow-700">
          🧾 Finalisation de votre commande
        </h1>

        {/* 🧍 Formulaire client */}
        <div>
          <h2 className="text-lg font-semibold mb-2">📋 Informations client</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Nom <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Prénom <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Ville <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Quartier <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="neighborhood"
                value={form.neighborhood}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">
                Numéro de téléphone <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>
        </div>

        {/* 🛒 Panier */}
        <div>
          <h2 className="text-lg font-bold mb-2">🛒 Articles dans votre panier</h2>
          <ul className="space-y-2">
            {cartItems.map((item, idx) => (
              <li
                key={idx}
                className="border p-2 rounded flex justify-between items-center"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="text-yellow-600">{item.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold text-right text-yellow-700">
            Total : {total.toLocaleString()} FCFA
          </p>
        </div>

        {/* 💳 Paiement */}
        <div>
          <h2 className="text-lg font-semibold mb-2">💳 Méthode de paiement</h2>
          <div className="space-y-2">
            {["mobile_money", "orange_money", "bank", "cash"].map((method) => (
              <label key={method} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
                {method === "mobile_money" && "Mobile Money"}
                {method === "orange_money" && "Orange Money"}
                {method === "bank" && "Paiement bancaire"}
                {method === "cash" && "Paiement à la livraison (Cash)"}
              </label>
            ))}
          </div>
        </div>

        {/* ✅ Bouton de validation */}
        <div className="text-center mt-6">
          <button
            onClick={handleConfirm}
            className="mt-4 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow animate-pulse"
          >
            <FaWhatsapp className="text-2xl animate-bounce" />
            Finaliser le paiement sur WhatsApp
          </button>
          {/* <button
  onClick={handlePaiement}
  className="bg-yellow-600 text-white px-4 py-2 rounded"
>
  Payer maintenant
</button> */}

        </div>
      </div>
      <Footer />
    </div>
  );
}
