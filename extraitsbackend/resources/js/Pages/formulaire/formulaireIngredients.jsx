import { Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../components/navBar';

export default function Contact() {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [ingredient, setIngredient] = useState({
      nomIngredient: '',
      description: '',
      fournisseur: '',
      stockActuel: '',
      prix: '',
      seuilAlerte: '',
      categorie: '',
      photo: '',
      etat_physique: 'solide'
    });
  
    const [fournisseurs, setFournisseurs] = useState([]);
  
    useEffect(() => {
      const fetchFournisseurs = async () => {
        try {
          const response = await fetch('/fournisseurs');
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des fournisseurs');
          }
          const data = await response.json();
          setFournisseurs(data);
        } catch (error) {
          setPopupMessage(`Erreur: ${error.message}`);
          setShowPopup(true);
        }
      };
  
      fetchFournisseurs();
    }, []);
  
    const categories = [
      "Fruits", "Légumes", "Épices", "Produits laitiers",
      "Viandes", "Poissons", "Céréales", "Boissons", "Autres"
    ];
  
    const etatsPhysiques = ['liquide', 'solide', 'gazeux'];
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setIngredient(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
          
          const response = await fetch('/ingredients', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': csrfToken, // Ajout du token CSRF
            },
            body: JSON.stringify(ingredient),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de l\'envoi des données');
          }
      
          const data = await response.json();
          setPopupMessage('Ingrédient ajouté avec succès!');
          setShowPopup(true);
          setTimeout(() => navigate('/laboratoire/ingredients'), 2000);
        } catch (error) {
          setPopupMessage(`Erreur: ${error.message}`);
          setShowPopup(true);
        }
      };
  
    const handleCancel = () => {
      navigate('/laboratoire/ingredients');
    };
  
    const handleOpenImageSite = () => {
      window.open('https://www.google.com/imghp', '_blank');
    };

  return (
    <div className="min-h-screen">
      <div className="flex">
        <Navbar/>
        {/* Espace réservé pour la navbar */}
        <div className="w-0 lg:w-[05px] bg-red"></div>

        {/* Contenu principal */}
        <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[300px]">
      <h1 className="text-2xl font-bold mb-6">Ajouter un ingrédient</h1>
      <form onSubmit={handleSubmit}>
        {/* Nom de l'ingrédient */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'ingrédient</label>
          <input
            type="text"
            name="nomIngredient"
            value={ingredient.nomIngredient}
            onChange={handleChange}
            placeholder="Entrer le nom de l'ingrédient..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={ingredient.description}
            onChange={handleChange}
            placeholder="Description de l'ingrédient..."
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        {/* Fournisseur et Catégorie */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fournisseur</label>
            <select
              name="fournisseur"
              value={ingredient.fournisseur}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Sélectionner un fournisseur</option>
              {fournisseurs.map((fournisseur) => (
                <option key={fournisseur.id} value={fournisseur.nom_fournisseur}>
                  {fournisseur.nom_fournisseur}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              name="categorie"
              value={ingredient.categorie}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Stock et Prix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock actuel</label>
            <input
              type="number"
              name="stockActuel"
              value={ingredient.stockActuel}
              onChange={handleChange}
              placeholder="Quantité en stock"
              className="w-full p-3 border border-gray-300 rounded-md"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA)</label>
            <input
              type="number"
              name="prix"
              value={ingredient.prix}
              onChange={handleChange}
              placeholder="Prix unitaire"
              className="w-full p-3 border border-gray-300 rounded-md"
              min="0"
            />
          </div>
        </div>
        {/* Seuil d'alerte et État physique */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seuil d'alerte</label>
            <input
              type="number"
              name="seuilAlerte"
              value={ingredient.seuilAlerte}
              onChange={handleChange}
              placeholder="Quantité minimum avant alerte"
              className="w-full p-3 border border-gray-300 rounded-md"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">État physique</label>
            <select
              name="etat_physique"
              value={ingredient.etat_physique}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              {etatsPhysiques.map((etat) => (
                <option key={etat} value={etat}>
                  {etat.charAt(0).toUpperCase() + etat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Photo */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de la photo</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="photo"
              value={ingredient.photo}
              onChange={handleChange}
              placeholder="Lien vers l'image de l'ingrédient"
              className="flex-1 p-3 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={handleOpenImageSite}
              className="flex items-center gap-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              <ExternalLink className="h-4 w-4" />
              Parcourir
            </button>
          </div>
          {ingredient.photo && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Aperçu :</p>
              <img
                src={ingredient.photo}
                alt="Aperçu de l'ingrédient"
                className="h-24 border rounded-md object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=Image+non+disponible';
                }}
              />
            </div>
          )}
        </div>
        {/* Boutons */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#C4A235]"
          >
            Enregistrer l'ingrédient
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Information</h2>
            <p className="mb-4 whitespace-pre-line">{popupMessage}</p>
            <button
              onClick={() => {
                setShowPopup(false);
                if (popupMessage.includes("avec succès")) {
                  navigate('/laboratoire/ingredients');
                }
              }}
              className="px-4 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#C9A227]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
       
      </div>
    </div>
  );
}