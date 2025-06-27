import React, { useEffect, useState } from 'react';
import { Bell, Download, Search, Trash, ChevronDown, Plus, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../../reutilisable/popUpSuppressionProduit';
import DatePicker from 'react-datepicker';
import FournisseurDetailsModal from '../pageAdminDetails/FournisseurDetailsModal';

export default function FournisseurLab() {
  const [valeurNote, setValeurNote] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [produitASupprimer, setProduitASupprimer] = useState(null);
  const [valeur, setValeur] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFournisseurId, setSelectedFournisseurId] = useState(null);

  useEffect(() => {
    const fetchFournisseurs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/fournisseurs');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des fournisseurs');
        }
        const data = await response.json();
        setFournisseurs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFournisseurs();
  }, []);

  const supprimerProduit = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/fournisseurs/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setFournisseurs(prev => prev.filter(f => f.id !== id));
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setShowConfirm(false);
      setProduitASupprimer(null);
    }
  };

  const filteredFournisseurs = fournisseurs.filter((f) => {
    const matchesSearch = f.nom_fournisseur?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !startDate || !endDate ||
      (new Date(f.created_at) >= startDate && new Date(f.created_at) <= endDate);
    const matchesCategory = !valeur || f.categorie_produit === valeur;
    const matchesNote = !valeurNote || f.note == valeurNote;

    return matchesSearch && matchesDate && matchesCategory && matchesNote;
  });

  const exportToCSV = () => {
    if (filteredFournisseurs.length === 0) {
      alert("Aucune donnée à exporter !");
      return;
    }

    const headers = ['ID', 'Nom', 'Contact', 'Email', 'Catégorie', 'Note', 'Date ajout'];

    const data = filteredFournisseurs.map(item => {
      return [
        `FRN-${item.id.toString().padStart(3, '0')}`,
        item.nom_fournisseur || '',
        item.contact_tel || '',
        item.adresse_mail || '',
        item.categorie_produit || '',
        item.note ? `${item.note}/5` : '',
        item.created_at ? new Date(item.created_at).toLocaleDateString() : ''
      ];
    });

    let csvContent = headers.join(",") + "\n";
    data.forEach(row => {
      csvContent += row.map(field => {
        return `"${String(field).replace(/"/g, '""')}"`;
      }).join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `fournisseurs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Erreur</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative">
      <div className="flex items-center justify-between border-b border-yellow-400 pb-2 mb-6">
        <h1 className="text-xl font-bold">FOURNISSEUR</h1>
        <div className="flex items-center gap-4">
          <Link to="#"><Bell size={24} color="#D4AF37" /></Link>
          <Link to="#"><User size={24} color="#D4AF37" /></Link>
          <span className="font-semibold">Laboratoire</span>
        </div>
      </div>

      <div className="relative w-full mb-6">
        <input
          type="text"
          placeholder="Rechercher un fournisseur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
        />
        <Search
          size={20}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="relative w-full sm:w-52">
            <select
              value={valeur}
              onChange={(e) => setValeur(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              <option value="Alimentaire">Alimentaire</option>
              <option value="Boissons">Boissons</option>
              <option value="Épicerie">Épicerie</option>
              <option value="Produits frais">Produits frais</option>
              <option value="Matériel">Matériel</option>
              <option value="Équipement">Équipement</option>
              <option value="Services">Services</option>
              <option value="Autres">Autres</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="relative w-full sm:w-52">
            <select
              value={valeurNote}
              onChange={(e) => setValeurNote(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            >
              <option value="">Toutes les notes</option>
              <option value="5">⭐ 5/5 (Excellent)</option>
              <option value="4">⭐ 4/5 (Très bon)</option>
              <option value="3">⭐ 3/5 (Moyen)</option>
              <option value="2">⭐ 2/5 (Passable)</option>
              <option value="1">⭐ 1/5 (Mauvais)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
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
          <Link to="/ajouter-fournisseur" className="w-full sm:w-auto">
            <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
              <Plus size={18} />
              <span>Ajouter un Fournisseur</span>
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

      <div className="bg-white shadow p-4 rounded">
        <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des fournisseurs</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto mt-2">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Catégorie</th>
                <th className="p-3 text-left">Note</th>
                <th className="p-3 text-left">Date ajout</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFournisseurs.length > 0 ? (
                filteredFournisseurs.map((fournisseur) => (
                  <tr key={fournisseur.id} className="border-b hover:bg-gray-50" onClick={() => setSelectedFournisseurId(fournisseur.id) }   style={{ cursor: 'pointer' }} >
                    <td className="p-3">#{fournisseur.id.toString().padStart(3, '0')}</td>
                    <td className="p-3">
                      <span dangerouslySetInnerHTML={{
                        __html: fournisseur.nom_fournisseur.replace(
                          new RegExp(`(${searchTerm})`, 'gi'),
                          '<span class="font-bold text-[#D4AF37]">$1</span>'
                        )
                      }} />
                    </td>
                    <td className="p-3">{fournisseur.contact_tel}</td>
                    <td className="p-3">{fournisseur.adresse_mail}</td>
                    <td className="p-3">{fournisseur.categorie_produit}</td>
                    <td className="p-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`${i < fournisseur.note ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">{new Date(fournisseur.created_at).toLocaleDateString()}</td>
                    <td className="p-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Empêche la propagation de l'événement de clic
                          setProduitASupprimer(fournisseur.id);
                          setShowConfirm(true);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    Aucun fournisseur trouvé avec ces critères de recherche
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={() => supprimerProduit(produitASupprimer)}
        onCancel={() => setShowConfirm(false)}
        message="Êtes-vous sûr de vouloir supprimer ce fournisseur ?"
      />

      {selectedFournisseurId && (
        <FournisseurDetailsModal
          fournisseurId={selectedFournisseurId}
          onClose={() => setSelectedFournisseurId(null)}
        />
      )}
    </div>
  );
}
