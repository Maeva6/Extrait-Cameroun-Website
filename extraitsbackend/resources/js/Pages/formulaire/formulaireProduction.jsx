import { Link } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect, useMemo } from 'react';
import { Factory, AlertTriangle, ClipboardList, Maximize2, Loader2, Package, Check, X } from 'lucide-react';
import Navbar from '../components/navBar';
import { router } from '@inertiajs/react';

export default function FormulaireProduction() {

// États
const [formules, setFormules] = useState([]);
const [stocksIngredients, setStocksIngredients] = useState([]);
const [formuleSelectionnee, setFormuleSelectionnee] = useState(null);
const [produitFinal, setProduitFinal] = useState(null);
const [ingredientsFormule, setIngredientsFormule] = useState([]);
const [quantite, setQuantite] = useState(1);
const [quantiteMaximale, setQuantiteMaximale] = useState(0);
const [validationPossible, setValidationPossible] = useState(false);
const [besoinsIngredients, setBesoinsIngredients] = useState([]);
const [loading, setLoading] = useState({
  initial: true,
  ingredients: false
});
const [error, setError] = useState(null);
const [isSubmitting, setIsSubmitting] = useState(false);
const [showPopup, setShowPopup] = useState(false);
const [popupMessage, setPopupMessage] = useState('');
const [popupType, setPopupType] = useState('success');

// Récupération des données initiales
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(prev => ({ ...prev, initial: true }));
      setError(null);

      const [formulesResponse, stocksResponse] = await Promise.all([
        fetch('/formules'),
        fetch('/ingredients')
      ]);

      if (!formulesResponse.ok) throw new Error('Erreur lors de la récupération des formules');
      if (!stocksResponse.ok) throw new Error('Erreur lors de la récupération des stocks');

      const formulesData = await formulesResponse.json();
      const stocksData = await stocksResponse.json();

      setFormules(formulesData);
      setStocksIngredients(stocksData);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, initial: false }));
    }
  };

  fetchData();
}, []);

// Mettre à jour le produit final et les ingrédients quand la formule change
useEffect(() => {
  if (formuleSelectionnee) {
    setProduitFinal(formuleSelectionnee.produit || null);
    setIngredientsFormule(formuleSelectionnee.ingredients || []);
  } else {
    setProduitFinal(null);
    setIngredientsFormule([]);
  }
}, [formuleSelectionnee]);

// Optimisation: création d'un map des stocks
const stocksMap = useMemo(() => {
  const map = {};
  stocksIngredients.forEach(s => {
    map[s.id] = s.stockActuel;
  });
  return map;
}, [stocksIngredients]);

// Calcul des besoins et de la quantité maximale
useEffect(() => {
  if (formuleSelectionnee && ingredientsFormule.length > 0) {
    // Calcul des besoins en ingrédients
    const nouveauxBesoins = ingredientsFormule.map(ing => {
      const quantiteRequise = ing.pivot.quantite * quantite;
      const stockDisponible = stocksMap[ing.id] || 0;
      const difference = stockDisponible - quantiteRequise;

      return {
        ...ing,
        quantiteNecessaire: quantiteRequise.toFixed(2),
        stockActuel: stockDisponible,
        difference: difference,
        suffisant: difference >= 0,
        pourcentageUtilisation: Math.min(100, (quantiteRequise / stockDisponible) * 100 || 0).toFixed(1)
      };
    });

    setBesoinsIngredients(nouveauxBesoins);

    // Calcul de la quantité maximale produisible
    const quantitesPossibles = ingredientsFormule.map(ing => {
      const stock = stocksMap[ing.id] || 0;
      const quantiteParUnite = ing.pivot.quantite;
      return quantiteParUnite > 0 ? Math.floor(stock / quantiteParUnite) : 0;
    });

    const nouvelleQuantiteMax = quantitesPossibles.length > 0
      ? Math.min(...quantitesPossibles.filter(q => q > 0))
      : 0;

    setQuantiteMaximale(nouvelleQuantiteMax || 0);

    // Validation
    const stockSuffisant = nouveauxBesoins.every(ing => ing.suffisant);
    setValidationPossible(stockSuffisant && quantite > 0 && quantite <= nouvelleQuantiteMax);
  }
}, [formuleSelectionnee, quantite, stocksMap, ingredientsFormule]);

// Réinitialisation quand la formule change
useEffect(() => {
  setQuantite(1);
  setBesoinsIngredients([]);
}, [formuleSelectionnee]);

// Soumission du formulaire
const handleSubmit = (e) => {
  e.preventDefault();
  if (!validationPossible || !formuleSelectionnee || isSubmitting) return;

  const productionData = {
    formule_id: formuleSelectionnee.id,
    quantite: parseInt(quantite),
    ingredients_utilises: besoinsIngredients.map(ing => ({
      ingredient_id: ing.id,
      quantite_utilisee: parseFloat(ing.quantiteNecessaire),
      unite: ing.pivot.unite
    }))
  };

  setIsSubmitting(true);
  
  router.post('/productions', productionData, {
    onSuccess: () => {
      // Réinitialisation après succès
      setFormuleSelectionnee(null);
      setQuantite(1);
      setBesoinsIngredients([]);
      setProduitFinal(null);
      
      setPopupMessage('Production enregistrée avec succès!');
      setPopupType('success');
      setShowPopup(true);
      
      // Recharger les stocks
      fetch('/ingredients')
        .then(res => res.json())
        .then(setStocksIngredients);
    },
    onError: (errors) => {
      setPopupMessage(
        Object.values(errors).flat().join('\n') || 
        'Erreur lors de l\'enregistrement'
      );
      setPopupType('error');
      setShowPopup(true);
    },
    onFinish: () => setIsSubmitting(false)
  });
};

if (loading.initial) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      <span className="ml-2">Chargement des données initiales...</span>
    </div>
  );
}

if (error) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            Erreur lors du chargement des données: {error}
          </p>
        </div>
      </div>
    </div>
  );
}

if (formules.length === 0) {
  return (
    <div className="bg-white p-8 rounded-lg shadow border border-gray-200 text-center">
      <div className="text-gray-500 mb-2">
        <AlertTriangle size={48} className="mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-700">
        Aucune formule disponible
      </h3>
      <p className="text-gray-500 mt-1">
        Aucune formule n'a été trouvée dans la base de données
      </p>
    </div>
  );
}

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* <Navbar/> */}
        {/* Espace réservé pour la navbar */}
        {/* <div className="w-0 lg:w-[25px] bg-red"></div> */}

        {/* Contenu principal */}
        <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[270px]">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Factory className="text-[#D4AF37]" /> Lancement de production avancé
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche - Sélection */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <ClipboardList size={18} /> Formule de production
            </h2>
            <select
              value={formuleSelectionnee?.id || ''}
              onChange={(e) => {
                const formule = formules.find(f => f.id === parseInt(e.target.value));
                setFormuleSelectionnee(formule || null);
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Sélectionner une formule</option>
              {formules.map(formule => (
                <option key={formule.id} value={formule.id}>
                  {formule.nomFormule}
                </option>
              ))}
            </select>
          </div>

          {/* Section Produit Final */}
          {produitFinal && (
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <Package size={18} /> Produit final
              </h2>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Nom</p>
                  <p className="font-semibold">{produitFinal.nomProduit}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Contenance</p>
                  <p className="text-gray-600">{produitFinal.contenanceProduit}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Stock actuel</p>
                  <p className="text-gray-600">{produitFinal.quantiteProduit} unités</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Stock apres production</p>
                  <p className="text-gray-600 font-semibold">
                    {parseInt(produitFinal.quantiteProduit) + parseInt(quantite)} unités
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Configuration de production */}
          {formuleSelectionnee && (
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h2 className="font-semibold mb-3">Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité à produire {quantiteMaximale > 0 && `(max: ${quantiteMaximale})`}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max={quantiteMaximale}
                      value={quantite}
                      onChange={(e) => {
                        const value = Math.min(
                          Math.max(1, parseInt(e.target.value) || 1),
                          quantiteMaximale || 1
                        );
                        setQuantite(value);
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => setQuantite(quantiteMaximale)}
                      disabled={quantiteMaximale <= 0}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
                <div className={`p-3 rounded border ${
                  quantite > 0 && quantite <= quantiteMaximale
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="text-sm">
                    {quantiteMaximale > 0 ? (
                      quantite <= quantiteMaximale ? (
                        <span className="text-green-700">
                          ✅ Production possible : <strong>{quantite} unités</strong>
                        </span>
                      ) : (
                        <span className="text-red-700">
                          ❌ Quantité supérieure au maximum possible
                        </span>
                      )
                    ) : (
                      <span className="text-red-700">
                        ❌ Stocks insuffisants pour produire cette formule
                      </span>
                    )}
                  </div>
                  {quantiteMaximale > 0 && (
                    <div className="mt-1 text-xs text-gray-600">
                      Stocks actuels permettent de produire jusqu'à {quantiteMaximale} unités
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Colonne droite - Vérification */}
        <div className="lg:col-span-2">
          {loading.ingredients ? (
            <div className="bg-white p-8 rounded-lg shadow border border-gray-200 text-center">
              <Loader2 className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-gray-600">Chargement des ingrédients...</p>
            </div>
          ) : formuleSelectionnee ? (
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <ClipboardList size={18} /> Détail des ingrédients nécessaires
              </h2>

              {besoinsIngredients.length > 0 ? (
                <div className="space-y-4">
                  {besoinsIngredients.map((ingredient) => (
                    <div key={ingredient.id} className={`p-4 rounded border ${ingredient.suffisant ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{ingredient.nomIngredient}</h3>
                          <p className="text-sm text-gray-600">Unité: {ingredient.pivot.unite}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${ingredient.suffisant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {ingredient.suffisant ? 'Stock suffisant' : 'Stock insuffisant'}
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Nécessaire</p>
                          <p className="text-lg font-semibold">
                            {ingredient.quantiteNecessaire} {ingredient.pivot.unite}
                          </p>
                          <p className="text-xs text-gray-500">
                            ({ingredient.pivot.quantite} {ingredient.pivot.unite} par unité)
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Disponible</p>
                          <p className={`text-lg font-semibold ${ingredient.suffisant ? 'text-green-600' : 'text-red-600'}`}>
                            {ingredient.stockActuel} {ingredient.pivot.unite}
                          </p>
                        </div>
                      </div>
                      {!ingredient.suffisant && (
                        <div className="mt-2 text-sm text-red-600">
                          <AlertTriangle size={16} className="inline mr-1" />
                          Manque {Math.abs(ingredient.difference).toFixed(2)} {ingredient.pivot.unite}
                        </div>
                      )}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${ingredient.suffisant ? 'bg-green-600' : 'bg-red-600'}`}
                            style={{ width: `${ingredient.pourcentageUtilisation}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {ingredient.pourcentageUtilisation}% du stock utilisé
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Aucun ingrédient trouvé pour cette formule
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Bouton de soumission */}
              <div className="flex justify-end border-t pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={!validationPossible || isSubmitting}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    validationPossible && !isSubmitting
                      ? 'bg-[#D4AF37] hover:bg-[#C4A235] text-white'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      En cours...
                    </>
                  ) : (
                    <>
                      Lancer la production
                      <Factory size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow border border-gray-200 text-center">
              <div className="text-gray-500 mb-2">
                <Factory size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">
                Aucune formule sélectionnée
              </h3>
              <p className="text-gray-500 mt-1">
                Sélectionnez une formule dans le panneau de gauche pour configurer votre production
              </p>
            </div>
          )}
        </div>
      </div>

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