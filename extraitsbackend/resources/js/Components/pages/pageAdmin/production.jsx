import { User, Bell, Search, Trash, Plus, Download, ChevronDown, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../../reutilisable/popUpSuppressionProduit';
import NotificationsAdmin from '../../reutilisable/notificationAdmin';

import DatePicker from 'react-datepicker';
export default function ProduitAdmin() {
    const [updates, setUpdates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [valeur, setValeur] = useState('');        
    const [showNotifications, setShowNotifications] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // État pour les notifications
    const [notifications, setNotifications] = useState([
        { 
            id: 1, 
            title: 'Stock critique', 
            message: 'Il ne reste que 3 unités de Parfum Oud Royal', 
            time: 'Il y a 15 minutes',
            read: false 
        },
        { 
            id: 2, 
            title: 'Nouvelle commande', 
            message: 'Commande #1245 de 120€ par Sarah K.', 
            time: 'Il y a 45 minutes',
            read: false 
        },
        { 
            id: 3, 
            title: 'Nouveau client', 
            message: 'Jean D. a créé un compte', 
            time: 'Hier, 14:30',
            read: false 
        }
    ]);

    const markAllAsRead = () => {
        setNotifications(notifs => notifs.map(n => ({ ...n, read: true })));
    };

    // Fonction pour exporter en CSV
    const exportToCSV = () => {
        if (filteredUpdates.length === 0) {
            alert("Aucune donnée à exporter !");
            return;
        }

        const headers = ['ID', 'Nom du produit', 'Catégorie', 'Date ajout', 'Quantité'];
        const data = filteredUpdates.map(item => [
            item.Id,
            item.nomProduit,
            item.Categorie,
            item.DateAjout,
            item.Quantite
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

    // Filtre les données
    const filteredUpdates = updates.filter((u) =>
        u.nomProduit?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Éléments de gestion de la pop-up pour la suppression
    const [showConfirm, setShowConfirm] = useState(false);
    const [produitASupprimer, setProduitASupprimer] = useState(null);

    const supprimerProduit = (index) => {
        if (index !== null && index >= 0 && index < updates.length) {
            setUpdates((prev) => prev.filter((_, i) => i !== index));
        }
        setShowConfirm(false);
        setProduitASupprimer(null);
    };

    useEffect(() => {
        setUpdates([
            {
                Id: '#PDR-01',
                nomProduit: 'Parlant oui',
                Categorie: 'parfum',
                DateAjout: '28/05/2025',
                Quantite: '10',
            },
            {
                Id: '#PDR-02',
                nomProduit: 'Encens Royal',
                Categorie: 'encens',
                DateAjout: '28/05/2025',
                Quantite: '5',
            },
            {
                Id: '#PDR-03',
                nomProduit: 'Brume Vanille',
                Categorie: 'brume',
                DateAjout: '28/05/2025',
                Quantite: '15',
            },
            {
                Id: '#PDR-03',
                nomProduit: 'Brume Vanille',
                Categorie: 'brume',
                DateAjout: '28/05/2025',
                Quantite: '15',
            },
            {
                Id: '#PDR-03',
                nomProduit: 'Brume Vanille',
                Categorie: 'brume',
                DateAjout: '28/05/2025',
                Quantite: '15',
            },
            {
                Id: '#PDR-03',
                nomProduit: 'Brume Vanille',
                Categorie: 'brume',
                DateAjout: '28/05/2025',
                Quantite: '15',
            },
        ]);
    }, []);

    // Gestion du scroll quand les notifications sont ouvertes
    useEffect(() => {
        if (showNotifications) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showNotifications]);

    return (
           <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative">
            {/* Titre */}
              <div className="flex items-center justify-between border-b border-yellow-400 pb-2 mb-6">
                <h1 className="text-xl font-bold">PRODUCTION</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative focus:outline-none hover:bg-gray-100 p-1 rounded-full"
                            aria-label="Notifications"
                        >
                            <Bell size={24} color="#D4AF37" />
                            {notifications.filter(n => !n.read).length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {notifications.filter(n => !n.read).length}
                                </span>
                            )}
                        </button>
                    </div>
                    <Link to="/profile"><User size={24} color="#D4AF37"/></Link>
                    <span className="font-semibold">Admin</span>
                </div>
             </div>

             {/* Menu des notifications - Version mobile/desktop */}
             {showNotifications && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 sm:absolute sm:inset-auto sm:bg-transparent sm:block sm:right-0 sm:top-12">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-0 sm:w-80 max-h-[80vh] overflow-y-auto">
                        <div className="p-4 flex justify-between items-center border-b">
                            <h3 className="font-bold">Notifications</h3>
                            <button 
                                onClick={() => setShowNotifications(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <NotificationsAdmin 
                            notifications={notifications}
                            onMarkAllAsRead={markAllAsRead}
                            onClose={() => setShowNotifications(false)}
                        />
                    </div>
                </div>
               )}

              {/* Barre de recherche */}
              <div className="relative w-full mb-6">
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
                <Search
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
               <div className="flex flex-col sm:flex-row gap-4 w-full">
                
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
                </div>

             <div className="flex flex-col gap-4 mb-6 mt-10">
                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
                    <Link to="/ajouter-production" className="w-full sm:w-auto">
                        <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                            <Plus size={18} />
                            <span>Nouvelle production</span>
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
                <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des produits</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto mt-2">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Nom du produit</th>
                                <th className="p-3 text-left">Catégorie</th>
                                <th className="p-3 text-left">Date d'ajout</th>
                                <th className="p-3 text-left">Quantité</th>
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
                                            __html: u.nomProduit.replace(
                                                new RegExp(`(${searchTerm})`, 'gi'),
                                                '<span class="font-bold text-[#D4AF37]">$1</span>'
                                            )
                                        }} 
                                    />
                                    <td className="p-3">{u.Categorie}</td>
                                    <td className="p-3">{u.DateAjout}</td>
                                    <td className="p-3">{u.Quantite}</td>
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
                message="Êtes-vous sûr de vouloir supprimer ce produit ?"
            />
        </div>
    );
}