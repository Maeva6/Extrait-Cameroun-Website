import { Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../components/navBar';
import { router } from '@inertiajs/react';


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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      router.post('/ingredients', ingredient, {
        onSuccess: () => {
          setPopupMessage('Ingrédient ajouté avec succès!');
          setShowPopup(true);
          setTimeout(() => router.visit('/ingredients/admin'), 2000);
        },
        onError: (errors) => {
          setPopupMessage(
            Object.values(errors).flat().join('\n') || 
            'Erreur lors de l\'ajout de l\'ingrédient'
          );
          setShowPopup(true);
        }
      });
    };
   
      const handleCancel = () => {
        router.visit('/ingredients/admin');
      };
      
  
    const handleOpenImageSite = () => {
      window.open('https://imgur.com/a/Ro4SF9e', '_blank');
    };

  return (
    <div className="min-h-screen">
      <div className="flex">
      
        {/* Contenu principal */}
        <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[240px]">
      <h1 className="text-2xl font-bold mb-6">Ajouter un ingrédient</h1>
      <form onSubmit={handleSubmit}>
        {/* Nom de l'ingrédient */}
        <div className="mb-6">
          <label className="block text-m font-medium text-gray-700 mb-1">Nom de l'ingrédient<span className='text-red-500'> *</span></label>
          <input
            type="text"
            name="nomIngredient"
            value={ingredient.nomIngredient}
            onChange={handleChange}
            placeholder="Entrer le nom de l'ingrédient..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            required
            onInvalid={(e) => {
              e.target.setCustomValidity("Veuillez renseigner le nom de l'ingrédient");
            }}
            onInput={(e) => {
              e.target.setCustomValidity('');
            }}
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block text-m font-medium text-gray-700 mb-1">Description</label>
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
            <label className="block text-m font-medium text-gray-700 mb-1">Fournisseur<span className='text-red-500'> *</span></label>
            <select
              name="fournisseur"
              value={ingredient.fournisseur}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
              onInvalid={(e) => {
                e.target.setCustomValidity("Veuillez sélectionner un fournisseur");
              }}
              onInput={(e) => {
                e.target.setCustomValidity('');
              }}
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
            <label className="block text-m font-medium text-gray-700 mb-1">Catégorie <span className='text-red-500'> *</span></label>
            <select
              name="categorie"
              value={ingredient.categorie}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
              onInvalid={(e) => {
                e.target.setCustomValidity("Veuillez sélectionner une catégorie");
              }}
              onInput={(e) => {
                e.target.setCustomValidity('');
              }}
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
            <label className="block text-m font-medium text-gray-700 mb-1">Stock actuel<span className='text-red-500'> *</span></label>
            <input
              type="number"
              name="stockActuel"
              value={ingredient.stockActuel}
              onChange={handleChange}
              placeholder="Quantité en stock"
              className="w-full p-3 border border-gray-300 rounded-md"
              min="0"
              required
              onInvalid={(e) => {
                e.target.setCustomValidity("Veuillez definir le stock actuel de l'ingredient");
              }}
              onInput={(e) => {
                e.target.setCustomValidity('');
              }}
            />
          </div>
          <div>
            <label className="block text-m font-medium text-gray-700 mb-1">Prix (FCFA)<span className='text-red-500'> *</span></label>
            <input
              type="number"
              name="prix"
              value={ingredient.prix}
              onChange={handleChange}
              placeholder="Prix unitaire"
              className="w-full p-3 border border-gray-300 rounded-md"
              min="0"
              required
              onInvalid={(e) => {
                e.target.setCustomValidity("Veuillez definir le prix de l'ingrédient");
              }}
              onInput={(e) => {
                e.target.setCustomValidity('');
              }}
            />
          </div>
        </div>
        {/* Seuil d'alerte et État physique */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-m font-medium text-gray-700 mb-1">Seuil d'alerte<span className='text-red-500'> *</span></label>
            <input
              type="number"
              name="seuilAlerte"
              value={ingredient.seuilAlerte}
              onChange={handleChange}
              placeholder="Quantité minimum avant alerte"
              className="w-full p-3 border border-gray-300 rounded-md"
              min="0"
              required
              onInvalid={(e) => {
                e.target.setCustomValidity("Veuillez definir le seuil d'alerte");
              }}
              onInput={(e) => {
                e.target.setCustomValidity('');
              }}
            />
          </div>
          <div>
            <label className="block text-m font-medium text-gray-700 mb-1">État physique<span className='text-red-500'> *</span></label>
            <select
              name="etat_physique"
              value={ingredient.etat_physique}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
              onInvalid={(e) => {
                e.target.setCustomValidity("Veuillez definir un etat physique");
              }}
              onInput={(e) => {
                e.target.setCustomValidity('');
              }}
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
          <label className="block text-m font-medium text-gray-700 mb-1">URL de la photo<span className='text-red-500'> *</span></label>
          <div className="flex gap-2">
            <input
              type="text-m"
              name="photo"
              value={ingredient.photo}
              onChange={handleChange}
              placeholder="Lien vers l'image de l'ingrédient"
              className="flex-1 p-3 border border-gray-300 rounded-md"
              required
              onInvalid={(e) => {
                e.target.setCustomValidity("Veuillez inserer une url pour l'image de l'ingrédient");
              }}
              onInput={(e) => {
                e.target.setCustomValidity('');
              }}
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
              <p className="text-m text-gray-600 mb-1">Aperçu :</p>
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