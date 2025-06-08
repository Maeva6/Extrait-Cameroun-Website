import {Bell,Download,PiggyBank,ShoppingCart,User,UserPlus, Percent,Search, Trash,ChevronDown,Plus} from 'lucide-react';
import {Link} from 'react-router-dom';
import ConfirmDialog from '../../components/popUpSuppressionProduit';
import { useEffect, useState } from 'react';


export default function FormuleLab(){
        // Éléments de gestion de la pop-up pour la suppression
    const [showConfirm, setShowConfirm] = useState(false);
    const [updates, setUpdates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    // Éléments de gestion de la pop-up pour la suppression
    const [produitASupprimer, setProduitASupprimer] = useState(null);
    const supprimerProduit = (index) => {
        if (index !== null && index >= 0 && index < updates.length) {
            setUpdates((prev) => prev.filter((_, i) => i !== index));
        }
        setShowConfirm(false);
        setProduitASupprimer(null);
    };
    // Filtre les données
    const [valeur, setValeur] = useState('');     
    const filteredUpdates = updates.filter((u) =>
        u.nomFormule?.toLowerCase().includes(searchTerm.toLowerCase())
    );

        // Fonction pour exporter en CSV
        const exportToCSV = () => {
            if (filteredUpdates.length === 0) {
                alert("Aucune donnée à exporter !");
                return;
            }
    
            const headers = ['ID', 'Nom de la formule', 'dateCreation', 'createur', 'Description'];
            const data = filteredUpdates.map(item => [
                item.Id,
                item.nomFormule,
                item.dateCreation,
                item.createur,
                item.description
            ]);
    
            let csvContent = "data:text/csv;charset=utf-8," 
                + headers.join(",") + "\n" 
                + data.map(row => row.join(",")).join("\n");
    
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `produits_export_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        
        useEffect(() => {
            setUpdates([
              {
                Id: '#FORM-001',
                nomFormule: 'Élixir Vanille Ambre',
                dateCreation: '2025-01-12',
                createur: 'Dr. Camille Djouma',
                description: 'Une formule chaude et gourmande mêlant vanille, ambre et musc blanc.',
              },
              {
                Id: '#FORM-002',
                nomFormule: 'Fraîcheur Matinale',
                dateCreation: '2025-02-03',
                createur: 'Chimiste Lydie',
                description: 'Un parfum léger et frais à base de menthe, agrumes et notes florales.',
              },
              {
                Id: '#FORM-003',
                nomFormule: 'Bois Mystique',
                dateCreation: '2025-03-15',
                createur: 'Alain Mba',
                description: 'Un accord boisé profond composé de bois de santal, oud et encens.',
              },
              {
                Id: '#FORM-004',
                nomFormule: 'Jardin d’Été',
                dateCreation: '2025-04-08',
                createur: 'Fatima El Adil',
                description: 'Une composition florale vive, avec jasmin, rose et pivoine.',
              },
              {
                Id: '#FORM-005',
                nomFormule: 'Noir Intense',
                dateCreation: '2025-04-27',
                createur: 'Dr. Koffi Laurent',
                description: 'Une essence orientale sombre avec patchouli, ambre et cuir.',
              },
              {
                Id: '#FORM-006',
                nomFormule: 'Lune d’Orient',
                dateCreation: '2025-05-20',
                createur: 'Nour Ben Youssef',
                description: 'Un parfum envoûtant à base de myrrhe, encens et fleur d’oranger.',
              },
            ]);
          }, []);
                      

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative">
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-yellow-400 pb-2 mb-6">
                <h1 className="text-xl font-bold">FORMULE</h1>
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
                    {/* Select 1 */}
                    <div className="relative w-full sm:w-52">
                        <select
                            value={valeur}
                            onChange={(e) => setValeur(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                        >
                            <option value="">Toutes les catégories</option>
                            <option value="Batonnets d'Encens Parfumés">Batonnets d'Encens Parfumés</option>
                            <option value="Brume parfumée">Brume parfumée</option>
                            <option value="Diffuseurs à Roseaux">Diffuseurs à Roseaux</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Select 2 */}
                    <div className="relative w-full sm:w-52">
                        <select
                            value={valeur}
                            onChange={(e) => setValeur(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                        >
                            <option>En stock</option>
                            <option>En rupture de stock</option>
                            <option>En dessous du seuil</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
                    <Link to="/ajouter-produit" className="w-full sm:w-auto">
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
                                <th className="p-3 text-left">Nom de la formule </th>
                                <th className="p-3 text-left">Date de creation</th>
                                <th className="p-3 text-left">Createur</th>
                                <th className="p-3 text-left">Description</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUpdates.map((u, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
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
                                    <td className="p-3">{u.dateCreation}</td>
                                    <td className="p-3">{u.createur}</td>
                                    <td className="p-3">{u.description}</td>
                                    <td className="p-3">
                                        <button 
                                            onClick={() => {
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
        </div>
    );

}