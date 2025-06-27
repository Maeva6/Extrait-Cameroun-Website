import React, { useEffect, useState } from 'react';
import { Bell, Download, PiggyBank, ShoppingCart, User, UserPlus, Percent, Search, Trash, ChevronDown, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../../reutilisable/popUpSuppressionProduit';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import FormuleDetailsModal from '../pageAdminDetails/FormuleDetailsModal';

export default function FormuleLab() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [produitASupprimer, setProduitASupprimer] = useState(null);
  const [createurFilter, setCreateurFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [produitId, setProduitId] = useState(null);
  const [produit, setProduit] = useState(null);
  const [selectedFormule, setSelectedFormule] = useState(null);
  const [showFormuleDetails, setShowFormuleDetails] = useState(false);

  const supprimerProduit = (index) => {
    if (index !== null && index >= 0 && index < updates.length) {
      setUpdates((prev) => prev.filter((_, i) => i !== index));
    }
    setShowConfirm(false);
    setProduitASupprimer(null);
  };

  useEffect(() => {
    const fetchFormules = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/formules');
        const formules = response.data.map(formule => ({
          ...formule,
          Id: `#${formule.id.toString().padStart(3, '0')}`,
          dateCreation: new Date(formule.dateCreation)
        }));
        setUpdates(formules);
      } catch (err) {
        setError('Erreur lors du chargement des formules');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFormules();
  }, []);

  const filteredUpdates = updates.filter((u) => {
    const matchesSearch = u.nomFormule?.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesDates = true;
    if (startDate || endDate) {
      const creationDate = new Date(u.dateCreation);
      if (startDate && endDate) {
        matchesDates = creationDate >= startDate && creationDate <= endDate;
      } else if (startDate) {
        matchesDates = creationDate >= startDate;
      } else if (endDate) {
        matchesDates = creationDate <= endDate;
      }
    }
    const matchesCreateur = createurFilter ? u.createur === createurFilter : true;
    return matchesSearch && matchesDates && matchesCreateur;
  });

  const exportToCSV = () => {
    if (filteredUpdates.length === 0) {
      alert("Aucune donnée à exporter !");
      return;
    }

    const headers = ['ID', 'Nom de la formule', 'Date de création', 'Créateur', 'Description'];
    const data = filteredUpdates.map(item => {
      return [
        item.Id || '',
        `"${(item.nomFormule || '').replace(/"/g, '""')}"`,
        `"${item.dateCreation ? new Date(item.dateCreation).toLocaleDateString('fr-FR') : ''}"`,
        `"${(item.createur || '').replace(/"/g, '""')}"`,
        `"${(item.description || '').replace(/"/g, '""')}"`
      ];
    });

    let csvContent = headers.join(",") + "\n" + data.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `formules_export_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const createurs = [...new Set(updates.map(update => update.createur))];

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
        <h1 className="text-xl font-bold">FORMULE</h1>
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
          placeholder="Rechercher une formule..."
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
            <div className="relative w-full sm:w-52">
              <select
                value={createurFilter}
                onChange={(e) => setCreateurFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              >
                <option value="">Tous les créateurs</option>
                {createurs.map((createur, index) => (
                  <option key={index} value={createur}>{createur}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
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
              />
            </div>
          </div>
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
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
          <Link to="/ajouter-formule" className="w-full sm:w-auto">
            <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
              <Plus size={18} />
              <span>Ajouter une formule</span>
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
        <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des formules</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto mt-2">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nom de la formule</th>
                <th className="p-3 text-left">Date de création</th>
                <th className="p-3 text-left">Créateur</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-3 text-center">Chargement en cours...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-red-500">{error}</td>
                </tr>
              ) : filteredUpdates.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-3 text-center">Aucune formule trouvée</td>
                </tr>
              ) : (
                filteredUpdates.map((u, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => {
                    setSelectedFormule(u);
                    setShowFormuleDetails(true);
                  }}>
                    <td className="p-3">{u.Id}</td>
                    <td
                      className="p-3"
                      dangerouslySetInnerHTML={{
                        __html: u.nomFormule.replace(
                          new RegExp(`(${searchTerm})`, 'gi'),
                          '<span class="font-bold text-[#D4AF37]">$1</span>'
                        )
                      }}
                    />
                    <td className="p-3">{new Date(u.dateCreation).toLocaleDateString()}</td>
                    <td className="p-3">{u.createur}</td>
                    <td className="p-3">{u.description}</td>
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
                ))
              )}
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

      {/* Modal de détails de la formule */}
      {showFormuleDetails && (
        <FormuleDetailsModal
          formuleId={selectedFormule.id}
          onClose={() => setShowFormuleDetails(false)}
        />
      )}
    </div>
  );
}
