import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const ProduitDetailsModal = ({ produitId, onClose }) => {
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProduitDetails = async () => {
      try {
        const response = await axios.get(`/api/produits/${produitId}`);
        if (response.data.success) {
          setProduit(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Erreur lors de la récupération des détails du produit');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    if (produitId) {
      fetchProduitDetails();
    }
  }, [produitId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
          <button
            onClick={onClose}
            className="mt-2 bg-[#D4AF37] text-white px-4 py-2 rounded"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  if (!produit) {
    return null;
  }

  const estDisponible = produit.quantiteProduit > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold">Détails du produit</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Informations générales</h4>
            <div className="space-y-3">
              <p><span className="font-medium">ID:</span> {produit.id || 'Non spécifié'}</p>
              <p><span className="font-medium">Nom:</span> {produit.nomProduit || 'Non spécifié'}</p>
              <p><span className="font-medium">Catégorie:</span> {produit.categorie?.name || 'Non spécifié'}</p>
              <p><span className="font-medium">Sexe cible:</span> {produit.sexeCible || 'Non spécifié'}</p>
              <p><span className="font-medium">Famille olfactive:</span> {produit.familleOlfactive || 'Non spécifié'}</p>
              <p><span className="font-medium">Prix:</span> {produit.prixProduit ? `${produit.prixProduit} FCFA` : 'Non spécifié'}</p>
              <p><span className="font-medium">Contenance:</span> {produit.contenanceProduit || 'Non spécifié'}</p>
              <p>
                <span className="font-medium">Statut:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  estDisponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {estDisponible ? 'Disponible' : 'Indisponible'}
                </span>
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Détails supplémentaires</h4>
            <div className="space-y-3">
              <p><span className="font-medium">Senteur:</span> {produit.senteur || 'Non spécifié'}</p>
              <p>
                <span className="font-medium">Quantité en stock:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  produit.quantiteProduit === 0
                    ? 'bg-red-100 text-red-800'
                    : produit.quantiteProduit < (produit.quantiteAlerte || 10)
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                }`}>
                  {produit.quantiteProduit || '0'} unités
                </span>
              </p>
              <p><span className="font-medium">Seuil d'alerte:</span> {produit.quantiteAlerte || '10'} unités</p>
              <p><span className="font-medium">Personnalité:</span> {produit.personnalite || 'Non spécifié'}</p>
            </div>
          </div>
          <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Descriptions</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Description:</p>
                <p className="text-gray-700 mt-1">{produit.descriptionProduit || 'Aucune description'}</p>
              </div>
              <div>
                <p className="font-medium">Mode d'utilisation:</p>
                <p className="text-gray-700 mt-1">{produit.modeUtilisation || 'Non spécifié'}</p>
              </div>
              <div>
                <p className="font-medium">Particularités:</p>
                <p className="text-gray-700 mt-1">{produit.particularite || 'Aucune particularité'}</p>
              </div>
            </div>
          </div>
          {produit.ingredients && produit.ingredients.length > 0 && (
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Ingrédients</h4>
              <ul className="list-disc pl-5 space-y-2">
                {produit.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="text-gray-700">
                    {ingredient.nomIngredient || 'Non spécifié'}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {produit.imagePrincipale && (
          <div className="p-6 border-t bg-gray-50">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Image du produit</h4>
            <div className="flex justify-center">
              <img
                src={produit.imagePrincipale}
                alt={produit.nomProduit}
                className="max-h-64 object-contain rounded"
              />
            </div>
          </div>
        )}
        <div className="p-4 border-t flex justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProduitDetailsModal;
