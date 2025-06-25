import { usePage } from '@inertiajs/react';
import Header from '../Header';
import Footer from '../Footer';
import { useState } from "react";

export default function OrdersPage() {
  const { commandes } = usePage().props;
  const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");

const commandesFiltrées = commandes.filter((commande) => {
  const date = new Date(commande.dateCommande);
  const from = fromDate ? new Date(fromDate) : null;
  const to = toDate ? new Date(toDate) : null;

  return (
    (!from || date >= from) &&
    (!to || date <= to)
  );
});

  return (
  <div className="flex flex-col min-h-screen bg-white font-montserrat">
    <Header />

    <main className="flex-grow pt-24 px-4">
      <h1 className="text-2xl font-bold mb-6">📦 Historique de mes commandes</h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <label className="flex flex-col text-sm">
          De :
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col text-sm">
          À :
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
      </div>

      {commandesFiltrées.length === 0 ? (
        <p>Aucune commande enregistrée pour l’instant.</p>
      ) : (
        <div className="space-y-6">
          {commandesFiltrées.map((commande) => (
            <div key={commande.idCommande} className="border rounded p-4 shadow">
              <p className="text-sm text-gray-600">Commande #{commande.idCommande}</p>
              <p className="text-sm">🕒 {new Date(commande.dateCommande).toLocaleString()}</p>
              <p className="text-yellow-600 font-semibold">
                Montant : {parseFloat(commande.montantTotal).toLocaleString()} FCFA
              </p>
              <p className="text-sm text-gray-800">Livraison : {commande.adresseLivraison}</p>
              <p className="text-sm text-gray-600">
                Statut : <strong>{commande.statutCommande}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </main>

    <Footer />
  </div>
);

}
