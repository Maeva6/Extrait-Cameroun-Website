import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const FormuleDetailsModal = ({ formuleId, onClose }) => {
  const [formule, setFormule] = useState(null);
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
    const fetchFormuleDetails = async () => {
      try {
        const response = await axios.get(`/api/formules/${formuleId}`);
        if (response.data) {
          setFormule(response.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Erreur lors de la récupération des détails de la formule');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    if (formuleId) {
      fetchFormuleDetails();
    }
  }, [formuleId]);

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

  if (!formule) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold">Détails de la formule</h3>
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
              <p><span className="font-medium">ID:</span> {formule.id || 'Non spécifié'}</p>
              <p><span className="font-medium">Nom:</span> {formule.nomFormule || 'Non spécifié'}</p>
              <p><span className="font-medium">Description:</span> {formule.description || 'Non spécifié'}</p>
              <p><span className="font-medium">Créateur:</span> {formule.createur || 'Non spécifié'}</p>
              <p><span className="font-medium">Date de création:</span> {new Date(formule.dateCreation).toLocaleDateString() || 'Non spécifié'}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Instructions</h4>
            <div className="space-y-3">
              <p>{formule.instructions || 'Aucune instruction'}</p>
            </div>
          </div>
          {formule.ingredients && formule.ingredients.length > 0 && (
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Ingrédients</h4>
              <ul className="list-disc pl-5 space-y-2">
                {formule.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="text-gray-700">
                    {ingredient.nomIngredient || 'Non spécifié'} - {ingredient.pivot.quantite} {ingredient.pivot.unite}
                  </li>
                ))}
              </ul>
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

export default FormuleDetailsModal;
