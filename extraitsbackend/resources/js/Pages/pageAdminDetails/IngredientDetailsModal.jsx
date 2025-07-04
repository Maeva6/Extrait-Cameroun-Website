import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const IngredientDetailsModal = ({ ingredientId, onClose }) => {
  const [ingredient, setIngredient] = useState(null);
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
    const fetchIngredientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/ingredients/${ingredientId}`);
        setIngredient(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des détails de l\'ingrédient');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    if (ingredientId) {
      fetchIngredientDetails();
    }
  }, [ingredientId]);

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

  if (!ingredient) {
    return null;
  }

  const estDisponible = ingredient.stockActuel > 0;
  const createdAtDate = ingredient.created_at ? new Date(ingredient.created_at) : null;
  const formattedDate = createdAtDate ? `${String(createdAtDate.getDate()).padStart(2, '0')}/${String(createdAtDate.getMonth() + 1).padStart(2, '0')}/${createdAtDate.getFullYear()}` : 'Non spécifié';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold">Détails de l'ingrédient</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Colonne Photo */}
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg flex flex-col">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Photo</h4>
            {ingredient.photo ? (
              <div className="flex-grow flex items-center justify-center">
                <img 
                  src={`http://localhost:8000/storage/${ingredient.photo}`} 
                  alt={ingredient.nomIngredient}
                  className="max-h-64 w-full object-contain rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
                <span>Aucune image disponible</span>
              </div>
            )}
          </div>

          {/* Colonne Informations générales */}
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Informations générales</h4>
            <div className="space-y-3">
              <p><span className="font-medium">ID:</span> {ingredient.id || 'Non spécifié'}</p>
              <p><span className="font-medium">Nom:</span> {ingredient.nomIngredient || 'Non spécifié'}</p>
              <p><span className="font-medium">Catégorie:</span> {ingredient.categorie || 'Non spécifié'}</p>
              <p><span className="font-medium">Prix:</span> {ingredient.prix ? `${ingredient.prix} FCFA` : 'Non spécifié'}</p>
              <p><span className="font-medium">Unité de mesure:</span> {ingredient.uniteMesure || 'Non spécifié'}</p>
              <p><span className="font-medium">État physique:</span> {ingredient.etat_physique || 'Non spécifié'}</p>
              <p><span className="font-medium">Fournisseur:</span> {ingredient.fournisseur || 'Non spécifié'}</p>
              <p><span className="font-medium">Date de création:</span> {formattedDate}</p>
            </div>
          </div>

          {/* Colonne Stock */}
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Stock</h4>
            <div className="space-y-3">
              <p>
                <span className="font-medium">Quantité en stock:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  ingredient.stockActuel === 0
                    ? 'bg-red-100 text-red-800'
                    : ingredient.stockActuel < (ingredient.seuilAlerte || 10)
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                }`}>
                  {ingredient.stockActuel || '0'} {ingredient.uniteMesure || 'unités'}
                </span>
              </p>
              <p><span className="font-medium">Seuil d'alerte:</span> {ingredient.seuilAlerte || '10'} {ingredient.uniteMesure || 'unités'}</p>
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

          {/* Description (full width) */}
          {ingredient.description && (
            <div className="md:col-span-3 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Description</h4>
              <p className="text-gray-700 whitespace-pre-line">{ingredient.description}</p>
            </div>
          )}
        </div>

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

export default IngredientDetailsModal;