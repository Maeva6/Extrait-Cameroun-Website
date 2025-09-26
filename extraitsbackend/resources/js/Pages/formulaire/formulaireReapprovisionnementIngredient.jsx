import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {router} from '@inertiajs/react';

const ReapprovisionnementIngredient = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [quantiteAjoutee, setQuantiteAjoutee] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('/ingredients');
        setIngredients(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des ingrédients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedIngredient || quantiteAjoutee <= 0) {
      setMessage('Veuillez sélectionner un ingrédient et entrer une quantité valide.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/ingredients/${selectedIngredient.value}/reapprovisionner`, {
        quantiteAjoutee: parseInt(quantiteAjoutee, 10)
      });

      if (response.data.success) {
        setMessage('Réapprovisionnement Effectué avec succes ! ');
        setTimeout(() => {
          router.visit('/reapprovisionnements/admin'); 
        }, 1500);
      } else {
        setMessage('Erreur lors de la mise à jour du stock.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du stock:', error);
      setMessage('Erreur lors de la mise à jour du stock.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[300px]">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Réapprovisionner un ingrédient</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700 mb-1">Sélectionner un ingrédient</label>
            <Select
              id="ingredient"
              options={ingredients.map(ingredient => ({
                value: ingredient.id,
                label: ingredient.nomIngredient
              }))}
              value={selectedIngredient}
              onChange={setSelectedIngredient}
              placeholder="Rechercher un ingrédient..."
              isSearchable
              isClearable
            />
          </div>

          {selectedIngredient && (
            <div>
              <label htmlFor="quantiteAjoutee" className="block text-sm font-medium text-gray-700 mb-1">Quantité à ajouter</label>
              <input
                type="number"
                id="quantiteAjoutee"
                value={quantiteAjoutee}
                onChange={(e) => setQuantiteAjoutee(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                placeholder="Entrez la quantité à ajouter"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Réapprovisionner
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes('réussi') ? 'bg-green-100 text-green-700' : 
            message.includes('Redirection') ? 'bg-blue-100 text-blue-700' : 
            'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReapprovisionnementIngredient;