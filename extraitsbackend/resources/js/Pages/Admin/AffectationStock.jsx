import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navBar';
import { usePage } from '@inertiajs/react';

export default function AffectationStock() {
  const { user } = usePage().props;
  const [produits, setProduits] = useState([]);
  const [localisations, setLocalisations] = useState([]);
  const [affectations, setAffectations] = useState([]);
  const [selectedProduit, setSelectedProduit] = useState('');
  const [selectedLocalisation, setSelectedLocalisation] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [produitsRes, localisationsRes, affectationsRes] = await Promise.all([
          axios.get('/produits'),
          axios.get('/localisations'),
          axios.get('/affectations'),
        ]);

        setProduits(Array.isArray(produitsRes.data) ? produitsRes.data : []);
        setLocalisations(Array.isArray(localisationsRes.data) ? localisationsRes.data : []);
        setAffectations(Array.isArray(affectationsRes.data) ? affectationsRes.data : []);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error.response?.data || error.message);
        setProduits([]);
        setLocalisations([]);
        setAffectations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const quantiteDisponible = (produitId) => {
    const produit = produits.find((p) => p.id === produitId);
    if (!produit) return 0;

    const totalAffecte = affectations
      .filter((a) => a.produit_id === produitId)
      .reduce((sum, a) => sum + a.quantite, 0);

    return produit.quantiteProduit - totalAffecte;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduit || !selectedLocalisation || quantite <= 0) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }

    if (quantite > quantiteDisponible(selectedProduit)) {
      alert(`Quantité insuffisante en stock. Disponible : ${quantiteDisponible(selectedProduit)}`);
      return;
    }

    try {
      const response = await axios.post('/affectations', {
        produit_id: selectedProduit,
        localisation_id: selectedLocalisation,
        quantite: quantite,
        _token: document.querySelector('meta[name="csrf-token"]').content,
      });

      if (response.data.success) {
        const { data } = await axios.get('/affectations');
        setAffectations(Array.isArray(data) ? data : []);
        alert("Affectation enregistrée avec succès !");
        setSelectedProduit('');
        setSelectedLocalisation('');
        setQuantite(0);
      } else {
        alert(response.data.error || "Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      console.error("Erreur lors de l'affectation :", error.response?.data || error.message);
      alert(error.response?.data?.error || "Erreur lors de l'enregistrement.");
    }
  };

  const handleDelete = async (produitId, localisationId) => {
    try {
      const response = await axios.delete(`/affectations/${produitId}/${localisationId}`, {
        data: {
          _token: document.querySelector('meta[name="csrf-token"]').content,
        }
      });

      if (response.data.success) {
        const { data } = await axios.get('/affectations');
        setAffectations(Array.isArray(data) ? data : []);
        alert("Affectation supprimée avec succès !");
      } else {
        alert(response.data.error || "Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.response?.data || error.message);
      alert("Erreur lors de la suppression.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <div className="w-0 lg:w-[240px]"></div>
        <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[240px]">
          <h1 className="text-2xl font-bold mb-6">Affectation des stocks par localisation</h1>

          <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Nouvelle affectation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
                <select
                  value={selectedProduit}
                  onChange={(e) => setSelectedProduit(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Sélectionner un produit</option>
                  {Array.isArray(produits) && produits.map((produit) => (
                    <option key={produit.id} value={produit.id}>
                      {produit.nomProduit} (Dispo: {quantiteDisponible(produit.id)})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                <select
                  value={selectedLocalisation}
                  onChange={(e) => setSelectedLocalisation(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Sélectionner une localisation</option>
                  {Array.isArray(localisations) && localisations.map((localisation) => (
                    <option key={localisation.id} value={localisation.id}>
                      {localisation.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                <input
                  type="number"
                  value={quantite}
                  onChange={(e) => setQuantite(parseInt(e.target.value))}
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Affecter
            </button>
          </form>

          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <h2 className="text-xl font-semibold p-6">Affectations actuelles</h2>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Produit</th>
                  <th className="p-3 text-left">Localisation</th>
                  <th className="p-3 text-left">Quantité</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(affectations) && affectations.length > 0 ? (
                  affectations.map((affectation) => (
                    <tr key={`${affectation.produit_id}-${affectation.localisation_id}`} className="border-b">
                      <td className="p-3">
                        {produits.find((p) => p.id === affectation.produit_id)?.nomProduit || 'Inconnu'}
                      </td>
                      <td className="p-3">
                        {localisations.find((l) => l.id === affectation.localisation_id)?.nom || 'Inconnu'}
                      </td>
                      <td className="p-3">{affectation.quantite}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(affectation.produit_id, affectation.localisation_id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      Aucune affectation enregistrée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
