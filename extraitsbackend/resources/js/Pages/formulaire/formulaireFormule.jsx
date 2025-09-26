import { Link } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Check, X } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/navBar';
import { router } from '@inertiajs/react';


export default function FormulaireFormule() {


    // États du formulaire
    const [formule, setFormule] = useState({
        nomFormule: '',
        description: '',
        produitFiniId: '',
        ingredients: [],
        instructions: '',
        createur: ''
    });

    const [nouvelIngredient, setNouvelIngredient] = useState({
        ingredientId: '',
        quantite: 0,
        unite: 'g'
    });

    const [ingredientsDisponibles, setIngredientsDisponibles] = useState([]);
    const [produitsFinis, setProduitsFinis] = useState([]);
    const [erreurs, setErreurs] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formuleSelectionnee, setFormuleSelectionnee] = useState(null);
    
    // États pour la popup
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('success'); // 'success' ou 'error'

    // Récupérer les ingrédients et produits finis depuis le backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des ingrédients
                const ingredientsResponse = await fetch('/ingredients');
                if (!ingredientsResponse.ok) throw new Error('Erreur lors de la récupération des ingrédients');
                const ingredientsData = await ingredientsResponse.json();
                
                // Récupération des produits finis
                const produitsResponse = await fetch('/produits');
                if (!produitsResponse.ok) throw new Error('Erreur lors de la récupération des produits finis');
                const produitsData = await produitsResponse.json();

                setIngredientsDisponibles(Array.isArray(ingredientsData) ? ingredientsData : []);
                setProduitsFinis(produitsData.success && Array.isArray(produitsData.data) ? produitsData.data : []);
            } catch (error) {
                console.error('Erreur:', error);
                setIngredientsDisponibles([]);
                setProduitsFinis([]);
                setPopupMessage(error.message);
                setPopupType('error');
                setShowPopup(true);
            }
        };
        fetchData();
    }, []);

    const unites = ['g', 'kg', 'L', 'mL', 'pièces'];

    // Validation du formulaire
    const validerFormulaire = () => {
        const nouvellesErreurs = {};

        if (!formule.nomFormule.trim()) {
            nouvellesErreurs.nomFormule = 'Le nom de la formule est requis';
        }

        if (!formule.produitFiniId) {
            nouvellesErreurs.produitFiniId = 'Veuillez sélectionner un produit fini';
        }

        if (formule.ingredients.length === 0) {
            nouvellesErreurs.ingredients = 'Ajoutez au moins un ingrédient';
        }

        setErreurs(nouvellesErreurs);
        return Object.keys(nouvellesErreurs).length === 0;
    };

    // Ajouter un ingrédient
    const handleAddIngredient = () => {
        if (!nouvelIngredient.ingredientId) {
            setErreurs(prev => ({ ...prev, nouvelIngredient: 'Sélectionnez un ingrédient' }));
            return;
        }

        if (nouvelIngredient.quantite <= 0) {
            setErreurs(prev => ({ ...prev, nouvelIngredient: 'La quantité doit être positive' }));
            return;
        }

        setFormule(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, nouvelIngredient]
        }));

        setNouvelIngredient({
            ingredientId: '',
            quantite: 0,
            unite: 'g'
        });

        setErreurs(prev => ({ ...prev, nouvelIngredient: '', ingredients: '' }));
    };

    // Supprimer un ingrédient
    const handleRemoveIngredient = (index) => {
        setFormule(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

// Remplacez la fonction handleSubmit existante par celle-ci :
const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validerFormulaire()) return;
    
    setIsSubmitting(true);
  
    // Utilisation du router Inertia pour une meilleure intégration
    router.post('/formules', formule, {
      onSuccess: () => {
        setPopupMessage('Formule enregistrée avec succès!');
        setPopupType('success');
        setShowPopup(true);
        
        // Réinitialisation après succès
        setTimeout(() => {
          setFormule({
            nomFormule: '',
            description: '',
            produitFiniId: '',
            ingredients: [],
            instructions: '',
            createur: ''
          });
          router.visit('/formules/admin');
        }, 1500);
      },
      onError: (errors) => {
        setPopupMessage(
          Object.values(errors).flat().join('\n') || 
          "Une erreur est survenue"
        );
        setPopupType('error');
        setShowPopup(true);
        
        // Mise à jour des erreurs de validation
        if (errors.errors) {
          setErreurs(errors.errors);
        }
      },
      onFinish: () => setIsSubmitting(false)
    });
  };    
    // Fonction pour annuler et rediriger
    const handleAnnuler = () => {
        setFormule({
            nomFormule: '',
            description: '',
            produitFiniId: '',
            ingredients: [],
            instructions: '',
            createur: ''
        });
        setErreurs({});
        router.visit('/formules/admin');
    };
    


  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* <Navbar/> */}
        {/* Espace réservé pour la navbar */}
        {/* <div className="w-0 lg:w-[225px] bg-red"></div> */}

        {/* Contenu principal */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Créer une nouvelle formule</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations de base */}
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-m font-medium text-gray-700 mb-1">
                            Nom de la formule <span className='text-red-500'> *</span>
                        </label>
                        <input
                            type="text"
                            value={formule.nomFormule}
                            onChange={(e) => setFormule({...formule, nomFormule: e.target.value})}
                            className={`w-full p-2 border rounded ${erreurs.nomFormule ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder='Entrer le nom de la formule...'
                            required
                            onInvalid={(e) => {
                                e.target.setCustomValidity("Veuillez definir un nom pour la formule");
                              }}
                              onInput={(e) => {
                                e.target.setCustomValidity('');
                              }}
                        />
                        {erreurs.nomFormule && (
                            <p className="mt-1 text-sm text-red-600">{erreurs.nomFormule}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-m font-medium text-gray-700 mb-1">
                            Produit fini associé <span className='text-red-500'> *</span>
                        </label>
                        <select
                            value={formule.produitFiniId}
                            onChange={(e) => setFormule({...formule, produitFiniId: e.target.value})}
                            className={`w-full p-2 border rounded ${erreurs.produitFiniId ? 'border-red-500' : 'border-gray-300'}`}
                            required
                            onInvalid={(e) => {
                                e.target.setCustomValidity("Veuillez selectionner un produit fini");
                              }}
                              onInput={(e) => {
                                e.target.setCustomValidity('');
                              }}
                        >
                            <option value="">Sélectionner un produit fini</option>
                            {produitsFinis.map(produit => (
                                <option key={produit.Id} value={produit.Id}>
                                    {produit.nomProduit} ({produit.Categorie})
                                </option>
                            ))}
                        </select>
                        {erreurs.produitFiniId && (
                            <p className="mt-1 text-m text-red-600">{erreurs.produitFiniId}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-m font-medium text-gray-700 mb-1">
                        Créateur de la formule
                    </label>
                    <input
                        type="text"
                        value={formule.createur}
                        onChange={(e) => setFormule({...formule, createur: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder='Veuillez entrer le nom du createur '
                    />
                </div>

                <div>
                    <label className="block text-m font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={formule.description}
                        onChange={(e) => setFormule({...formule, description: e.target.value})}
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder='Veuillez entrer une description de la formule'
                    />
                </div>

                {/* Ingrédients */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Ingrédients<span className='text-red-500'> *</span></h3>
                    {erreurs.ingredients && (
                        <p className="mb-2 text-m text-red-600">{erreurs.ingredients}</p>
                    )}
                    <div className="grid grid-cols-12 gap-3 mb-3">
                        <div className="col-span-5">
                            <select
                                value={nouvelIngredient.ingredientId}
                                onChange={(e) => setNouvelIngredient({...nouvelIngredient, ingredientId: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Sélectionner un ingrédient</option>
                                {ingredientsDisponibles.map(ing => (
                                    <option key={ing.id} value={ing.id}>{ing.nomIngredient}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-3">
                            <input
                                type="number"
                                value={nouvelIngredient.quantite}
                                onChange={(e) => setNouvelIngredient({...nouvelIngredient, quantite: parseFloat(e.target.value) || 0})}
                                placeholder="Quantité"
                                className="w-full p-2 border border-gray-300 rounded"
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div className="col-span-3">
                            <select
                                value={nouvelIngredient.unite}
                                onChange={(e) => setNouvelIngredient({...nouvelIngredient, unite: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                {unites.map(u => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <button
                                type="button"
                                onClick={handleAddIngredient}
                                className="w-full h-full flex items-center justify-center bg-green-100 hover:bg-green-200 rounded text-green-800"
                            >
                                <PlusCircle size={18} />
                            </button>
                        </div>
                    </div>
                    {erreurs.nouvelIngredient && (
                        <p className="mt-1 text-sm text-red-600">{erreurs.nouvelIngredient}</p>
                    )}

                    {/* Liste des ingrédients ajoutés */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        {formule.ingredients.length === 0 ? (
                            <div className="p-4 text-center text-gray-500 bg-gray-50">
                                Aucun ingrédient ajouté
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {formule.ingredients.map((ing, index) => {
                                    const ingredient = ingredientsDisponibles.find(i => i.id == ing.ingredientId);
                                    return (
                                        <li key={index} className="p-3 flex justify-between items-center bg-white hover:bg-gray-50">
                                            <div>
                                                <span className="font-medium text-gray-800">
                                                    {ingredient?.nomIngredient || 'Inconnu'}
                                                </span>
                                                <span className="text-gray-600 ml-2">
                                                    {ing.quantite} {ing.unite}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveIngredient(index)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Instructions */}
                <div>
                    <label className="block text-m font-medium text-gray-700 mb-1">
                        Instructions de production
                    </label>
                    <textarea
                        value={formule.instructions}
                        onChange={(e) => setFormule({...formule, instructions: e.target.value})}
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Détaillez les étapes de production..."
                    />
                </div>

                {/* Boutons */}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={handleAnnuler}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        disabled={isSubmitting}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#C4A235] disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer la formule'}
                    </button>
                </div>
                {erreurs.soumission && (
                    <p className="text-right mt-2 text-sm text-red-600">{erreurs.soumission}</p>
                )}
            </form>

            {/* Popup de confirmation */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className={`flex items-center mb-4 ${popupType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {popupType === 'success' ? (
                                <Check className="h-6 w-6 mr-2" />
                            ) : (
                                <X className="h-6 w-6 mr-2" />
                            )}
                            <h2 className="text-xl font-bold">
                                {popupType === 'success' ? 'Succès' : 'Erreur'}
                            </h2>
                        </div>
                        <p className="mb-4 whitespace-pre-line">{popupMessage}</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    setShowPopup(false);
                                    if (popupType === 'success') {
                                        // Réinitialisations supplémentaires si nécessaire
                                    }
                                }}
                                className={`px-4 py-2 rounded-md ${
                                    popupType === 'success' 
                                        ? 'bg-[#D4AF37] hover:bg-[#C4A235] text-white'
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                }`}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
