import { Bell, Download, Plus, Search, Trash, ChevronDown, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../../reutilisable/popUpSuppressionProduit';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import ProductionDetailsModal from '../pageAdminDetails/ProductionDetailsModal';

export default function ProductionLab() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [productions, setProductions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFormule, setSelectedFormule] = useState('');
    const [selectedProduit, setSelectedProduit] = useState('');
    const [formules, setFormules] = useState([]);
    const [produits, setProduits] = useState([]);
    const [produitASupprimer, setProduitASupprimer] = useState(null);
    const [selectedProductionId, setSelectedProductionId] = useState(null); // Pour gérer l'affichage des détails

    // Charger les données
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [productionsRes, formulesRes, produitsRes] = await Promise.all([
                    axios.get('/api/productions'),
                    axios.get('/api/formules'),
                    axios.get('/api/produits')
                ]);

                setProductions(productionsRes.data);
                setFormules(formulesRes.data?.data || formulesRes.data || []);
                setProduits(produitsRes.data?.data || produitsRes.data || []);

                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filtrer les productions par date (frontend)
    const filterByDate = () => {
        if (!startDate && !endDate) return productions;
        
        return productions.filter(production => {
            const productionDate = new Date(production.created_at);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            
            if (start && end) {
                return productionDate >= start && productionDate <= end;
            } else if (start) {
                return productionDate >= start;
            } else if (end) {
                return productionDate <= end;
            }
            return true;
        });
    };

    // Supprimer une production
    const supprimerProduction = async (id) => {
        try {
            const response = await axios.delete(`/api/productions/${id}`);
            if (response.status === 200) {
                setProductions(prev => prev.filter(prod => prod.id !== id));
                setShowConfirm(false);
                setProduitASupprimer(null);
                alert('Production supprimée avec succès');
            }
        } catch (err) {
            console.error("Erreur lors de la suppression:", err);
            alert(err.response?.data?.message || 'Erreur lors de la suppression');
        }
    };

    // Filtrer les productions (combinaison de tous les filtres)
    const filteredProductions = filterByDate().filter((p) => {
        const matchesSearch = p.produit?.nomProduit?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFormule = selectedFormule ? p.formule_id == selectedFormule : true;
        const matchesProduit = selectedProduit ? p.produit_id == selectedProduit : true;
        return matchesSearch && matchesFormule && matchesProduit;
    });

    // Exporter les données VISIBLES en CSV
    const exportToCSV = () => {
        if (filteredProductions.length === 0) {
            alert("Aucune donnée à exporter !");
            return;
        }

        const headers = ['ID', 'Produit', 'Formule', 'Quantité produite', 'Date', 'Ingrédients utilisés'];
        const data = filteredProductions.map(item => [
            item.id,
            item.produit?.nomProduit || 'N/A',
            item.formule?.nom_formule || 'N/A',
            item.quantite_produite,
            new Date(item.created_at).toLocaleDateString(),
            item.ingredients?.map(i => 
                `${i.nomIngredient}: ${i.pivot.quantite_utilisee} ${i.pivot.unite}`
            ).join('; ') || 'Aucun'
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + data.map(row => row.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `productions_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Gérer le clic sur une ligne pour afficher les détails
    const handleRowClick = (productionId, e) => {
        // Empêcher l'ouverture des détails si on clique sur le bouton de suppression
        if (e.target.closest('button')) {
            return;
        }
        setSelectedProductionId(productionId);
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
            </div>
        );
    }

    if (error) return <div className="p-6 text-red-500">Erreur: {error}</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative">
            {/* En-tête */}
            <div className="flex items-center justify-between border-b border-yellow-400 pb-2 mb-6">
                <h1 className="text-xl font-bold">PRODUCTIONS</h1>
                <div className="flex items-center gap-4">
                    <Link><Bell size={24} color="#D4AF37"/></Link>
                    <Link><User size={24} color="#D4AF37"/></Link>
                    <span className="font-semibold">Laboratoire</span>
                </div>
            </div>

            {/* Barre de recherche */}
            <div className="relative w-full mb-6">
                <input
                    type="text"
                    placeholder="Rechercher une production..."
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
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {/* Filtre par formule */}
                    <div className="relative w-full sm:w-52">
                        <select
                            value={selectedFormule}
                            onChange={(e) => setSelectedFormule(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                        >
                            <option value="">Toutes les formules</option>
                            {formules.map(formule => (
                                <option key={formule.id} value={formule.id}>
                                    {formule.nom_formule || formule.nomFormule}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Filtre par produit */}
                    <div className="relative w-full sm:w-52">
                        <select
                            value={selectedProduit}
                            onChange={(e) => setSelectedProduit(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                        >
                            <option value="">Tous les produits</option>
                            {produits.map(produit => (
                                <option key={produit.Id || produit.id} value={produit.Id || produit.id}>
                                    {produit.nomProduit}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Dates */}
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

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
                    <Link to="/ajouter-production" className="w-full sm:w-auto">
                        <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                            <Plus size={18} />
                            <span>Ajouter une production</span>
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

            {/* Tableau des productions */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des productions</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto mt-2">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Produit</th>
                                <th className="p-3 text-left">Formule</th>
                                <th className="p-3 text-left">Quantité produite</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProductions.length > 0 ? (
                                filteredProductions.map((production) => (
                                    <tr 
                                        key={production.id} 
                                        className="border-b hover:bg-gray-50 cursor-pointer"
                                        onClick={(e) => handleRowClick(production.id, e)}
                                    >
                                        <td className="p-3">#{production.id.toString().padStart(3, '0')}</td>
                                        <td className="p-3">{production.produit?.nomProduit || 'N/A'}</td>
                                        <td className="p-3">{production.formule?.nom_formule || 'N/A'}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                production.quantite_produite === 0
                                                    ? 'bg-red-100 text-red-800'
                                                    : production.quantite_produite < 10
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-green-100 text-green-800'
                                            }`}>
                                                {production.quantite_produite} unités
                                            </span>
                                        </td>
                                        <td className="p-3">{new Date(production.created_at).toLocaleDateString()}</td>
                                        <td className="p-3">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setProduitASupprimer(production.id);
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
                                    <td colSpan="6" className="p-3 text-center">Aucune production trouvée</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Popup de confirmation */}
            <ConfirmDialog
                isOpen={showConfirm}
                onConfirm={() => supprimerProduction(produitASupprimer)}
                onCancel={() => setShowConfirm(false)}
                message="Êtes-vous sûr de vouloir supprimer cette production ? Cette action est irréversible et affectera les stocks."
            />

            {/* Modal de détails de la production */}
            {selectedProductionId && (
                <ProductionDetailsModal
                    productionId={selectedProductionId}
                    onClose={() => setSelectedProductionId(null)}
                />
            )}
        </div>
    );
}