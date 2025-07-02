import { Link, usePage } from '@inertiajs/react';
import { Bell, Download, PiggyBank, ShoppingCart, User, UserPlus, Percent, Search, Trash, ChevronDown, Plus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/navBar";
import { useEffect, useState } from 'react';
import ConfirmDialog from '../reutilisable/popUpSuppressionProduit';
import NotificationsAdmin from '../reutilisable/notificationAdmin';
import IngredientDetailsModal from '../pageInfo/IngredientDetailsModal';


export default function IngredientLaboratoire() {
    const { props } = usePage();
  const user = props.user;

  //Categorie des differents ingredients
const categories = [
    "Fruits", "Légumes", "Épices", "Produits laitiers",
    "Viandes", "Poissons", "Céréales", "Boissons", "Autres"
];
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [produitASupprimer, setProduitASupprimer] = useState(null);
  const [valeur, setValeur] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedIngredientId, setSelectedIngredientId] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('');

  const supprimerProduit = (index) => {
      if (index !== null && index >= 0 && index < updates.length) {
          setUpdates((prev) => prev.filter((_, i) => i !== index));
      }
      setShowConfirm(false);
      setProduitASupprimer(null);
  };

  const handleRowClick = (ingredient) => {
    setSelectedIngredientId(ingredient.id);
    setShowDetailsModal(true);
  };

  const exportToCSV = () => {
      if (filteredUpdates.length === 0) {
          alert("Aucune donnée à exporter !");
          return;
      }

      const headers = ['ID', 'Nom de l\'ingrédient', 'Prix', 'Date de création', 'Quantité'];
      const data = filteredUpdates.map(item => {
          const createdAtDate = item.created_at ? new Date(item.created_at) : null;
          const formattedDate = createdAtDate ? `${String(createdAtDate.getDate()).padStart(2, '0')}-${String(createdAtDate.getMonth() + 1).padStart(2, '0')}-${createdAtDate.getFullYear()}` : 'N/A';

          return [
              item.id,
              `"${item.nomIngredient}"`,
              item.prix,
              formattedDate,
              item.stockActuel
          ];
      });

      let csvContent = "data:text/csv;charset=utf-8,"
          + headers.join(",") + "\n"
          + data.map(row => row.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `produits_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  useEffect(() => {
      const fetchIngredients = async () => {
          try {
              const response = await fetch('http://localhost:8000/ingredients');
              if (!response.ok) {
                  throw new Error('Erreur lors du chargement des ingrédients');
              }
              const data = await response.json();
              setUpdates(data);
          } catch (error) {
              console.error("Erreur lors du chargement des ingrédients:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchIngredients();
  }, []);

  const getStockStatus = (quantite, seuilAlerte) => {
      if (quantite === 0) {
          return "En rupture de stock";
      } else if (quantite < seuilAlerte) {
          return "En dessous du seuil";
      } else {
          return "En stock";
      }
  };

  const filteredUpdates = updates.filter((u) => {
      const matchesSearchTerm = u.nomIngredient?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategorie = categorieSelectionnee ? u.categorie === categorieSelectionnee : true;

      const createdAtDate = u.created_at ? new Date(u.created_at) : null;
      const matchesStartDate = startDate ? createdAtDate >= new Date(startDate.setHours(0, 0, 0, 0)) : true;
      const matchesEndDate = endDate ? createdAtDate <= new Date(endDate.setHours(23, 59, 59, 999)) : true;

      const stockStatus = getStockStatus(u.stockActuel, u.seuilAlerte);
      const matchesStockStatus = valeur ? stockStatus === valeur : true;

      return matchesSearchTerm && matchesCategorie && matchesStartDate && matchesEndDate && matchesStockStatus;
  });

  if (loading) {
      return (
          <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
          </div>
      );
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Espace réservé pour la navbar */}
        <Navbar/>
        <div className="w-0 lg:w-[225px] bg-red"></div>
        {showDetailsModal && (
          <IngredientDetailsModal
            ingredientId={selectedIngredientId}
            onClose={() => setShowDetailsModal(false)}
          />
        )}
        {/* Contenu principal */}
        <div className="flex-1 bg-gray-100  w-full">
          <div className="p-6 space-y-8 min-h-screen ">
             {/* En-tête */}
            <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
              <h1 className="text-xl font-bold">INGREDIENTS</h1>
              <div className="flex items-center gap-4">
                <Link href="#"><Bell size={24} color="#D4AF37" /></Link>
                <Link href="#"><User size={24} color="#D4AF37" /></Link>
                <span className="font-semibold">{user?.name || 'Admin'}</span>
              </div>
            </div>
            
              {/* Barre de recherche */}
              <div className="relative w-full mb-6">
                <input
                    type="text"
                    placeholder="Rechercher un ingrédient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border  border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
                />
                <Search
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
            </div>

                   {/* Filtres et boutons */}
                   <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <div className="relative w-full sm:w-52 bg-white">
                                <select
                                    value={categorieSelectionnee}
                                    onChange={(e) => setCategorieSelectionnee(e.target.value)}
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                >
                                    <option value="">Toutes les catégories</option>
                                    {categories.map((categorie, index) => (
                                        <option key={index} value={categorie}>{categorie}</option>
                                    ))}
                                </select>

                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="relative w-full sm:w-52 bg-white" >
                                <select
                                    value={valeur}
                                    onChange={(e) => setValeur(e.target.value)}
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                >
                                    <option value="En stock">En stock</option>
                                    <option value="En rupture de stock">En rupture de stock</option>
                                    <option value="En dessous du seuil">En dessous du seuil</option>
                                </select>

                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Version mobile - inline sur une ligne */}
                        <div className="sm:hidden w-full overflow-x-auto">
                            <div className="flex items-center gap-2 w-full min-w-0">
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Sélectionner"
                                    className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                                    isClearable
                                />
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Sélectionner"
                                    className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                                    isClearable
                                />
                            </div>
                        </div>

                        {/* Version desktop - tout sur une ligne */}
                        <div className="hidden sm:flex items-end gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Sélectionner"
                                    className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                                    isClearable
                                />
                            </div>
                            <div className="flex items-center gap-2 ">
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Sélectionner"
                                    className=" bg-white w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                                    isClearable
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
                    <Link href="/formulaireingredient/admin" className="w-full sm:w-auto">
                        <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                            <Plus size={18} />
                            <span>Ajouter un Ingrédient</span>
                        </button>
                    </Link>
                    <button
                        onClick={exportToCSV}
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto transition-colors"
                    >
                        <Download size={18} />
                        <span>Exporter</span>
                    </button>
                </div>
            </div>

               {/* Tableau des ingrédients */}
               <div className="bg-white shadow p-4 rounded">
                <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des Ingrédients</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto mt-2">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Nom de l'ingrédient</th>
                                <th className="p-3 text-left">Prix</th>
                                <th className="p-3 text-left">Date de création</th>
                                <th className="p-3 text-left">Quantité</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {filteredUpdates.length > 0 ? (
                                filteredUpdates.map((u, index) => {
                                    const createdAtDate = u.created_at ? new Date(u.created_at) : null;
                                    const formattedDate = createdAtDate ? `${String(createdAtDate.getDate()).padStart(2, '0')}/${String(createdAtDate.getMonth() + 1).padStart(2, '0')}/${createdAtDate.getFullYear()}` : 'N/A';

                                    return (
                                        <tr 
                                            key={index} 
                                            className="border-b hover:bg-gray-50 cursor-pointer"
                                            onClick={() => {
                                                setSelectedIngredientId(u.id);
                                                setShowDetailsModal(true);
                                            }}
                                        >
                                            <td className="p-3">#{u.id.toString().padStart(3, '0')}</td>
                                            <td className="p-3"
                                                dangerouslySetInnerHTML={{
                                                    __html: u.nomIngredient.replace(
                                                        new RegExp(`(${searchTerm})`, 'gi'),
                                                        '<span class="font-bold text-[#D4AF37]">$1</span>'
                                                    )
                                                }}
                                            />
                                            <td className="p-3">{u.prix || 'N/A'}</td>
                                            <td className="p-3" dateFormat="dd/MM/yyyy">{formattedDate}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    u.stockActuel === 0
                                                        ? 'bg-red-100 text-red-800'
                                                        : u.stockActuel < (u.seuilAlerte || 10)
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {u.stockActuel || '0'} unités
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setProduitASupprimer(index);
                                                        setShowConfirm(true);
                                                    }}
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    <Trash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-4 text-center text-gray-500">
                                        Aucune donnée trouvée
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

          </div>
        </div>
        <ConfirmDialog
                isOpen={showConfirm}
                onConfirm={() => supprimerProduit(produitASupprimer)}
                onCancel={() => setShowConfirm(false)}
                message="Êtes-vous sûr de vouloir supprimer cet ingrédient ?"
            />

            {showDetailsModal && (
                <IngredientDetailsModal 
                    ingredientId={selectedIngredientId} 
                    onClose={() => setShowDetailsModal(false)}
                />
            )}
      </div>
    </div>
  );
}