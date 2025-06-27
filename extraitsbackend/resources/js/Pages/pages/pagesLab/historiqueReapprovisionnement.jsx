import React, { useEffect, useState } from 'react';
import { Bell, Download, PiggyBank, ShoppingCart, User, UserPlus, Percent, Search, Trash, ChevronDown, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../../reutilisable/popUpSuppressionProduit';
import DatePicker from 'react-datepicker';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import ReapprovisionnementDetailsModal from '../pageAdminDetails/ReapprovisionnementDetailsModal';

export default function HistoriqueReapprovisionnementLab() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFournisseur, setSelectedFournisseur] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [fournisseurs, setFournisseurs] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [produitASupprimer, setProduitASupprimer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReappro, setSelectedReappro] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fournisseursRes, reapproRes, ingredientsRes] = await Promise.all([
          fetch('http://localhost:8000/api/fournisseurs'),
          fetch('http://localhost:8000/api/reapprovisionnements'),
          fetch('http://localhost:8000/api/ingredients')
        ]);

        if (!fournisseursRes.ok || !reapproRes.ok || !ingredientsRes.ok) {
          throw new Error('Erreur de chargement des données');
        }

        const [fournisseursData, reapproData, ingredientsData] = await Promise.all([
          fournisseursRes.json(),
          reapproRes.json(),
          ingredientsRes.json()
        ]);

        setFournisseurs(fournisseursData);
        setUpdates(reapproData);
        setIngredients(ingredientsData);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const supprimerProduit = (index) => {
    if (index !== null && index >= 0 && index < updates.length) {
      setUpdates((prev) => prev.filter((_, i) => i !== index));
    }
    setShowConfirm(false);
    setProduitASupprimer(null);
  };

  const filteredUpdates = updates
    .filter(u => selectedFournisseur ? u.fournisseur === selectedFournisseur : true)
    .filter(u => selectedIngredient ? u.nomIngredient === selectedIngredient : true)
    .filter(u => {
      if (!startDate && !endDate) return true;

      const dateReappro = parseISO(u.dateReapprovisionnement);
      const afterStart = startDate ? dateReappro >= startDate : true;
      const beforeEnd = endDate ? dateReappro <= endDate : true;

      return afterStart && beforeEnd;
    })
    .filter(u => u.nomIngredient?.toLowerCase().includes(searchTerm.toLowerCase()));

  const exportToCSV = () => {
    if (filteredUpdates.length === 0) {
      alert("Aucune donnée à exporter !");
      return;
    }

    const headers = ['ID', 'Ingrédient', 'Quantité ajoutée', 'Date de réapprovisionnement', 'Fournisseur'];

    const data = filteredUpdates.map(item => [
      item.Id,
      `"${item.nomIngredient}"`,
      item.quantite,
      format(parseISO(item.dateReapprovisionnement), 'dd/MM/yyyy HH:mm', { locale: fr }),
      `"${item.fournisseur}"`
    ]);

    let csvContent = headers.join(";") + "\r\n";
    csvContent += data.map(row => row.join(";")).join("\r\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `export_reapprovisionnements_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative">
      {/* En-tête */}
      <div className="flex items-center justify-between border-b border-yellow-400 pb-2 mb-6">
        <h1 className="text-xl font-bold">HISTORIQUE REAPPROVISIONNEMENT</h1>
        <div className="flex items-center gap-4">
          <Link><Bell size={24} color="#D4AF37" /></Link>
          <Link><User size={24} color="#D4AF37" /></Link>
          <span className="font-semibold">Laboratoire</span>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="relative w-full mb-6">
        <input
          type="text"
          placeholder="Rechercher un ingrédient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
        />
        <Search
          size={20}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Filtres et boutons */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Dropdown Fournisseurs */}
            <div className="relative w-full sm:w-52">
              <select
                value={selectedFournisseur}
                onChange={(e) => setSelectedFournisseur(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              >
                <option value="">Tous les fournisseurs</option>
                {fournisseurs.map((fournisseur) => (
                  <option key={fournisseur.id} value={fournisseur.nom_fournisseur}>
                    {fournisseur.nom_fournisseur}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {/* Dropdown Ingrédients */}
            <div className="relative w-full sm:w-52">
              <select
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              >
                <option value="">Tous les ingrédients</option>
                {ingredients.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.nomIngredient}>
                    {ingredient.nomIngredient}
                  </option>
                ))}
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
                className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                isClearable
                locale={fr}
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
                className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                isClearable
                locale={fr}
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
                className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                isClearable
                locale={fr}
              />
            </div>
            <div className="flex items-center gap-2">
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
                className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                isClearable
                locale={fr}
              />
            </div>
          </div>
        </div>
        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
          <Link to="/reapprovisionner-ingredient" className="w-full sm:w-auto">
            <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
              <Plus size={18} />
              <span>Réapprovisionner un ingrédient</span>
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

      {/* Tableau des produits */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Historique des réapprovisionnements</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto mt-2">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Ingrédient</th>
                <th className="p-3 text-left">Quantité</th>
                <th className="p-3 text-left">Date Réapprovisionnement</th>
                <th className="p-3 text-left">Fournisseur</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUpdates.map((u, index) => (
                <tr key={index} className="border-b hover:bg-gray-50" onClick={() => setSelectedReappro(u)}  style={{ cursor: 'pointer' }} >
                  <td className="p-3">#{u.Id.toString().padStart(3, '0')}</td>
                  <td
                    className="p-3"
                    dangerouslySetInnerHTML={{
                      __html: u.nomIngredient.replace(
                        new RegExp(`(${searchTerm})`, 'gi'),
                        '<span class="font-bold text-[#D4AF37]">$1</span>'
                      )
                    }}
                  />
                  <td className="p-3">
                    <p>
                      <span className="font-medium"></span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800`}>
                        {u.quantite}
                      </span>
                    </p>
                  </td>
                  <td className="p-3">{format(parseISO(u.dateReapprovisionnement), 'dd/MM/yyyy', { locale: fr })}</td>
                  <td className="p-3">{u.fournisseur}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup de confirmation */}
      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={() => supprimerProduit(produitASupprimer)}
        onCancel={() => setShowConfirm(false)}
        message="Êtes-vous sûr de vouloir supprimer cette formule ?"
      />

      {/* Modal pour les détails du réapprovisionnement */}
      {selectedReappro && (
        <ReapprovisionnementDetailsModal
          reapproId={selectedReappro.Id}
          onClose={() => setSelectedReappro(null)}
        />
      )}
    </div>
  );
}
