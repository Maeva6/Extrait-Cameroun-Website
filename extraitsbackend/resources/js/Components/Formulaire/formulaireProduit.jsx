import React, { useState, useEffect } from 'react';
import { ExternalLink, Search, PlusCircle, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FormulaireProduit() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/produits');
  };

  
  const [product, setProduct] = useState({
    nom: '',
    categorie: '',
    description: '',
    quantite: '',
    contenances: '',
    senteurs: [],
    ingredients: [],
    sexe: 'Homme',
    personnalite: '',
    familleOlfactive: '',
    quantiteAlerte: '',
    prixProduit: '',
    imagePrincipale: '',
    modeUtilisation: '',
    particularite: ''
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [isSenteursOpen, setIsSenteursOpen] = useState(false);
  const [senteursSearchTerm, setSenteursSearchTerm] = useState('');
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  const [ingredientsSearchTerm, setIngredientsSearchTerm] = useState('');

  const categoriesSenteurs = [
    "Senteur d'ambiance",
    "Senteur corporelle",
    "Cosmétique"
  ];

  const personnalitesParSexe = {
    Homme: {
      "Sûr de lui et charismatique": ["Boisés secs", "cuir", "ambre", "fougère moderne"],
      "Sportif et énergique": ["Agrumes vifs", "notes marines", "menthe", "gingembre"],
      "Élégant et sophistiqué": ["Iris", "lavande noble", "vétiver", "encens léger"],
      "Mystérieux et intense": ["Oud", "patchouli noir", "ambre", "cuir profond"],
      "Libre et aventurier": ["Aromatiques", "bois secs", "épices fraîches"],
      "Décontracté et naturel": ["blancs", "bois clairs", "notes vertes"],
      "Romantique et attentionné": ["Rose masculine", "vanille douce", "ambrette", "musc"],
      "Urbain et moderne": ["Bois synthétiques", "ambroxan", "accords fruités cuirés"],
      "Traditionnel et discret": ["Lavande classique", "vétiver", "mousse de chêne"]
    },
    Femme: {
      "Douce et apaisante": ["Notes poudrées", "florales légères", "muscs doux"],
      "Élégante et sophistiquée": ["Chypre", "aldéhydes", "floraux nobles"],
      "Joyeuse et pétillante": ["Notes fruitées", "florales fraîches", "agrumes"],
      "Sensuelle et mystérieuse": ["Ambrés", "boisés", "orientaux profonds"],
      "Léger et frais": ["Notes aquatiques", "hespéridées", "florales pures"],
      "Moyen et équilibré": ["Parfums polyvalents", "ni trop légers ni trop intenses"],
      "Intense et envoûtant": ["Orientaux", "boisés", "vanillés", "résineux"],
      "Active et dynamique": ["Agrumes", "floraux verts", "énergisants"],
      "Classique et raffinée": ["Parfums emblématiques", "structures olfactives traditionnelles"]
    },
    Mixte: {
      "Polyvalent et équilibré": ["Notes fraîches", "bois légers", "agrumes doux"],
      "Audacieux et distinctif": ["Bois ambrés", "épices douces", "notes aromatiques"],
      "Naturel et organique": ["Herbes fraîches", "thé vert", "notes terreuses"]
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des catégories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
      }
    };

    const fetchIngredients = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/ingredients');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des ingrédients');
        }
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error("Erreur lors du chargement des ingrédients:", error);
      }
    };

    fetchCategories();
    fetchIngredients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => {
      const updated = { ...prev, [name]: value };
      if (name === "sexe") {
        updated.personnalite = "";
        updated.familleOlfactive = "";
      } else if (name === "personnalite") {
        updated.familleOlfactive = "";
      }
      return updated;
    });

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const toggleSenteur = (senteur) => {
    setProduct(prev => {
      const newSenteurs = prev.senteurs.includes(senteur)
        ? prev.senteurs.filter(s => s !== senteur)
        : [...prev.senteurs, senteur];

      return { ...prev, senteurs: newSenteurs };
    });

    if (errors.senteurs) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.senteurs;
        return newErrors;
      });
    }
  };

  const toggleIngredient = (ingredientId) => {
    setProduct(prev => {
      const newIngredients = prev.ingredients.includes(ingredientId)
        ? prev.ingredients.filter(id => id !== ingredientId)
        : [...prev.ingredients, ingredientId];

      return { ...prev, ingredients: newIngredients };
    });

    if (errors.ingredients) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.ingredients;
        return newErrors;
      });
    }
  };

  const handleOpenImageSite = () => {
    window.open('https://imgur.com/a/Ro4SF9e', '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const formData = {
        nom: product.nom,
        categorie_id: Number(product.categorie),
        description: product.description,
        quantite: Number(product.quantite),
        contenance: product.contenances,
        sexe: product.sexe,
        personnalite: product.personnalite,
        famille_olfactive: product.familleOlfactive,
        quantite_alerte: Number(product.quantiteAlerte),
        prix: Number(product.prixProduit),
        image_url: product.imagePrincipale,
        mode_utilisation: product.modeUtilisation,
        particularites: product.particularite,
        senteurs: product.senteurs,
        ingredients: product.ingredients
      };

      const response = await fetch('http://localhost:8000/api/produits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response error:", errorData);
        if (errorData.errors) {
          setErrors(errorData.errors);
          throw new Error('Validation error');
        }
        throw new Error(errorData.message || 'Erreur lors de la création');
      }

      const data = await response.json();
      alert(`Produit créé avec succès! ID: ${data.id}`);
      handleReset();
      navigate('/produits');
    } catch (error) {
      console.error('Erreur:', error);
      if (!error.message.includes('Validation error')) {
        alert('Une erreur est survenue lors de la création du produit');
      }
    }
  };

  const handleReset = () => {
    setProduct({
      nom: '',
      categorie: '',
      description: '',
      quantite: '',
      contenances: '',
      senteurs: [],
      ingredients: [],
      sexe: 'Homme',
      personnalite: '',
      familleOlfactive: '',
      quantiteAlerte: '',
      prixProduit: '',
      imagePrincipale: '',
      modeUtilisation: '',
      particularite: ''
    });
    setErrors({});
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSenteurs = categoriesSenteurs.filter(senteur =>
    senteur.toLowerCase().includes(senteursSearchTerm.toLowerCase())
  );

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.nomIngredient.toLowerCase().includes(ingredientsSearchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[330px]">
      <h1 className="text-2xl font-bold mb-6">Ajouter un produit</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Produit</label>
          <input
            type="text"
            name="nom"
            value={product.nom}
            onChange={handleChange}
            placeholder="Entrer le nom du produit..."
            className={`w-full p-3 border rounded-md ${errors.nom ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom[0]}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <input
              type="hidden"
              name="categorie"
              value={product.categorie || ''}
              onChange={handleChange}
            />
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-3 border border-gray-300 rounded-md text-left flex justify-between items-center"
              >
                {product.categorie
                  ? categories.find(c => c.id === product.categorie)?.name
                  : "Sélectionnez une catégorie"}
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300">
                  <div className="p-2 border-b border-gray-200">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full p-2 pl-8 border border-gray-300 rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                      />
                      <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute right-2 top-3 text-gray-400"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  {!filteredCategories.some(c => c.name.toLowerCase() === searchTerm.toLowerCase()) && searchTerm && (
                    <div
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                      onClick={() => setShowAddCategory(true)}
                    >
                      <span>Créer: "{searchTerm}"</span>
                      <PlusCircle className="text-[#D4AF37]" size={16} />
                    </div>
                  )}

                  {showAddCategory && (
                    <div className="p-3 border-t bg-gray-50">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Nom de la nouvelle catégorie"
                          className="flex-1 p-2 text-sm border rounded"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddCategory(false)}
                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                        >
                          Annuler
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 text-sm bg-[#D4AF37] text-white rounded hover:bg-[#C9A227]"
                        >
                          Créer
                        </button>
                      </div>
                    </div>
                  )}

                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`p-3 hover:bg-gray-100 cursor-pointer ${product.categorie === category.id ? 'bg-[#D4AF37]/10' : ''}`}
                      onClick={() => {
                        setProduct(prev => ({ ...prev, categorie: category.id }));
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {product.categorie && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Sélectionné: {categories.find(c => c.id === product.categorie)?.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setProduct(prev => ({ ...prev, categorie: '' }));
                    setSearchTerm('');
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description du produit..."
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sexe cible</label>
            <select
              name="sexe"
              value={product.sexe}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md ${errors.sexe ? 'border-red-500' : 'border-gray-300'}`}
              required
            >
              <option value="">-- Sélectionner un sexe --</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Mixte">Mixte</option>
            </select>
            {errors.sexe && <p className="text-red-500 text-xs mt-1">{errors.sexe[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenance</label>
            <input
              type="text"
              name="contenances"
              value={product.contenances}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md ${errors.contenance ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="En ml ou g selon le produit"
            />
            {errors.contenance && <p className="text-red-500 text-xs mt-1">{errors.contenance[0]}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Personnalité</label>
            {product.sexe && personnalitesParSexe[product.sexe] ? (
              <select
                name="personnalite"
                value={product.personnalite}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${errors.personnalite ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">-- Choisir une personnalité --</option>
                {Object.keys(personnalitesParSexe[product.sexe]).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            ) : (
              <p className="text-red-500 text-xs mt-1">Veuillez sélectionner un sexe.</p>
            )}
            {errors.personnalite && <p className="text-red-500 text-xs mt-1">{errors.personnalite[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Famille olfactive</label>
            {product.sexe && product.personnalite && (
              <select
                name="familleOlfactive"
                value={product.familleOlfactive}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${errors.famille_olfactive ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">-- Choisir une famille olfactive --</option>
                {personnalitesParSexe[product.sexe][product.personnalite].map((famille) => (
                  <option key={famille} value={famille}>{famille}</option>
                ))}
              </select>
            )}
            {errors.famille_olfactive && <p className="text-red-500 text-xs mt-1">{errors.famille_olfactive[0]}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantité Produit</label>
            <input
              type="number"
              name="quantite"
              value={product.quantite}
              onChange={handleChange}
              min={0}
              className={`w-full p-3 border rounded-md ${errors.quantite ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Quantité en stock"
            />
            {errors.quantite && <p className="text-red-500 text-xs mt-1">{errors.quantite[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantité alerte</label>
            <input
              type="number"
              name="quantiteAlerte"
              value={product.quantiteAlerte}
              onChange={handleChange}
              min={0}
              className={`w-full p-3 border rounded-md ${errors.quantite_alerte ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Seuil d'alerte"
            />
            {errors.quantite_alerte && <p className="text-red-500 text-xs mt-1">{errors.quantite_alerte[0]}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Type de senteur</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSenteursOpen(!isSenteursOpen)}
              className="w-full p-3 border border-gray-300 rounded-md text-left flex justify-between items-center"
            >
              {product.senteurs.length > 0
                ? product.senteurs.join(', ')
                : "Sélectionnez les types de senteurs"}
              <ChevronDown className={`h-4 w-4 transition-transform ${isSenteursOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSenteursOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300">
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="w-full p-2 pl-8 border border-gray-300 rounded-md"
                      value={senteursSearchTerm}
                      onChange={(e) => setSenteursSearchTerm(e.target.value)}
                      autoFocus
                    />
                    <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                    {senteursSearchTerm && (
                      <button
                        onClick={() => setSenteursSearchTerm('')}
                        className="absolute right-2 top-3 text-gray-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {filteredSenteurs.map(senteur => (
                    <div
                      key={senteur}
                      className={`p-3 hover:bg-gray-100 cursor-pointer flex items-center ${product.senteurs.includes(senteur) ? 'bg-blue-50' : ''}`}
                      onClick={() => toggleSenteur(senteur)}
                    >
                      <input
                        type="checkbox"
                        checked={product.senteurs.includes(senteur)}
                        readOnly
                        className="mr-2"
                      />
                      {senteur}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {errors.senteurs && <p className="text-red-500 text-xs mt-1">{errors.senteurs[0]}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingrédients</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
              className="w-full p-3 border border-gray-300 rounded-md text-left flex justify-between items-center"
            >
              {product.ingredients.length > 0
                ? product.ingredients.map(id => ingredients.find(i => i.id === id)?.nomIngredient).join(', ')
                : "Sélectionnez les ingrédients"}
              <ChevronDown className={`h-4 w-4 transition-transform ${isIngredientsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isIngredientsOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300">
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="w-full p-2 pl-8 border border-gray-300 rounded-md"
                      value={ingredientsSearchTerm}
                      onChange={(e) => setIngredientsSearchTerm(e.target.value)}
                      autoFocus
                    />
                    <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                    {ingredientsSearchTerm && (
                      <button
                        onClick={() => setIngredientsSearchTerm('')}
                        className="absolute right-2 top-3 text-gray-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {filteredIngredients.map(ingredient => (
                    <div
                      key={ingredient.id}
                      className={`p-3 hover:bg-gray-100 cursor-pointer flex items-center ${product.ingredients.includes(ingredient.id) ? 'bg-blue-50' : ''}`}
                      onClick={() => toggleIngredient(ingredient.id)}
                    >
                      <input
                        type="checkbox"
                        checked={product.ingredients.includes(ingredient.id)}
                        readOnly
                        className="mr-2"
                      />
                      {ingredient.nomIngredient}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients[0]}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix du produit (FCFA)</label>
            <input
              type="number"
              name="prixProduit"
              value={product.prixProduit}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md ${errors.prix ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Prix de vente"
            />
            {errors.prix && <p className="text-red-500 text-xs mt-1">{errors.prix[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mode d'utilisation</label>
            <textarea
              name="modeUtilisation"
              value={product.modeUtilisation}
              onChange={handleChange}
              placeholder="Mode d'utilisation du produit..."
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Particularité</label>
            <textarea
              name="particularite"
              value={product.particularite}
              onChange={handleChange}
              placeholder="Particularité du produit"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'image principale</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="imagePrincipale"
              value={product.imagePrincipale}
              onChange={handleChange}
              placeholder="Lien vers l'image principale"
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
          {product.imagePrincipale && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Aperçu :</p>
              <img
                src={product.imagePrincipale}
                alt="Aperçu"
                className="h-24 border rounded-md object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=Image+non+disponible';
                }}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#C9A227] transition-colors"
          >
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
}
