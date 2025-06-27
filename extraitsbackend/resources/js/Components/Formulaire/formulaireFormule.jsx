import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

function FormulaireFormule({ onFormSubmit }) {
    const navigate = useNavigate();
    
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
    const [messageSucces, setMessageSucces] = useState('');

    // Récupérer les ingrédients et produits finis depuis le backend
    useEffect(() => {
       // Dans la fonction fetchData du useEffect
        const fetchData = async () => {
            try {
                // Récupération des ingrédients
                const ingredientsResponse = await fetch('http://localhost:8000/api/ingredients');
                if (!ingredientsResponse.ok) throw new Error('Erreur lors de la récupération des ingrédients');
                const ingredientsData = await ingredientsResponse.json();
                
                // Récupération des produits finis
                const produitsResponse = await fetch('http://localhost:8000/api/produits');
                if (!produitsResponse.ok) throw new Error('Erreur lors de la récupération des produits finis');
                const produitsData = await produitsResponse.json();

                setIngredientsDisponibles(Array.isArray(ingredientsData) ? ingredientsData : []);
                // Modification ici pour utiliser la structure de votre API
                setProduitsFinis(produitsData.success && Array.isArray(produitsData.data) ? produitsData.data : []);
            } catch (error) {
                console.error('Erreur:', error);
                setIngredientsDisponibles([]);
                setProduitsFinis([]);
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

    // Soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validationPossible || !formuleSelectionnee) return;
      
        const production = {
          formule_id: formuleSelectionnee.id,
          quantite: quantite,
          ingredients_utilises: besoinsIngredients.map(ing => ({
            ingredient_id: ing.id, // Doit correspondre au nom dans la validation Laravel
            quantite_utilisee: parseFloat(ing.quantiteNecessaire), // Nom exact comme dans le contrôleur
            unite: ing.pivot.unite
          }))
        };
      
        try {
          const response = await fetch('http://localhost:8000/api/productions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(production)
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de l\'enregistrement');
          }
      
          // Réinitialisation après succès
          setFormuleSelectionnee(null);
          setQuantite(1);
          setBesoinsIngredients([]);
          setProduitFinal(null);
      
          // Recharger les stocks
          const stocksResponse = await fetch('http://localhost:8000/api/ingredients');
          const stocksData = await stocksResponse.json();
          setStocksIngredients(stocksData);
      
          alert('Production enregistrée avec succès!');
        } catch (error) {
          console.error('Erreur:', error);
          alert(`Erreur: ${error.message}`);
        }
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
        setMessageSucces('');
        navigate('/formules');
    };

    return (
        // p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative
        <div className="max-w-4xl mx-auto p-6 rounded-lg lg:ml-[325px]">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Créer une nouvelle formule</h1>
            
            {messageSucces && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
                    {messageSucces}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations de base */}
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom de la formule*
                        </label>
                        <input
                            type="text"
                            value={formule.nomFormule}
                            onChange={(e) => setFormule({...formule, nomFormule: e.target.value})}
                            className={`w-full p-2 border rounded ${erreurs.nomFormule ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        />
                        {erreurs.nomFormule && (
                            <p className="mt-1 text-sm text-red-600">{erreurs.nomFormule}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Produit fini associé*
                        </label>
                        <select
                            value={formule.produitFiniId}
                            onChange={(e) => setFormule({...formule, produitFiniId: e.target.value})}
                            className={`w-full p-2 border rounded ${erreurs.produitFiniId ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        >
                            <option value="">Sélectionner un produit fini</option>
                            {produitsFinis.map(produit => (
                                <option key={produit.Id} value={produit.Id}>
                                    {produit.nomProduit} ({produit.Categorie})
                                </option>
                            ))}
                        </select>
                        {erreurs.produitFiniId && (
                            <p className="mt-1 text-sm text-red-600">{erreurs.produitFiniId}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Créateur de la formule
                    </label>
                    <input
                        type="text"
                        value={formule.createur}
                        onChange={(e) => setFormule({...formule, createur: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={formule.description}
                        onChange={(e) => setFormule({...formule, description: e.target.value})}
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Ingrédients */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Ingrédients*</h3>
                    {erreurs.ingredients && (
                        <p className="mb-2 text-sm text-red-600">{erreurs.ingredients}</p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="px-4 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#D4AF37] disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer la formule'}
                    </button>
                </div>
                {erreurs.soumission && (
                    <p className="text-right mt-2 text-sm text-red-600">{erreurs.soumission}</p>
                )}
            </form>
        </div>
    );
}

FormulaireFormule.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
};

export default FormulaireFormule;