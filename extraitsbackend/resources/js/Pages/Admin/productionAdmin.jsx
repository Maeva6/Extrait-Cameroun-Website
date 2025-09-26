// import React, { useState, useEffect } from "react";
// import { Link, usePage } from '@inertiajs/react';
// import { User, Bell, Search, Trash, Plus, Download, ChevronDown, X } from 'lucide-react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Navbar from "../components/navBar";
// import axios from 'axios';
// import IngredientDetailsModal from "../pageInfo/IngredientDetailsModal"; // Assurez-vous que le chemin est correct

// export default function ProduitAdmin() {
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: 'Stock critique',
//       message: 'Il ne reste que 3 unités de Parfum Oud Royal',
//       time: 'Il y a 15 minutes',
//       read: false
//     },
//     {
//       id: 2,
//       title: 'Nouvelle commande',
//       message: 'Commande #1245 de 120€ par Sarah K.',
//       time: 'Il y a 45 minutes',
//       read: false
//     },
//     {
//       id: 3,
//       title: 'Nouveau client',
//       message: 'Jean D. a créé un compte',
//       time: 'Hier, 14:30',
//       read: false
//     }
//   ]);
//    const { props } = usePage();
//     const user = props.user;
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [productions, setProductions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [selectedFormule, setSelectedFormule] = useState('');
//   const [selectedProduit, setSelectedProduit] = useState('');
//   const [formules, setFormules] = useState([]);
//   const [produits, setProduits] = useState([]);
//   const [produitASupprimer, setProduitASupprimer] = useState(null);
//   const [selectedProductionId, setSelectedProductionId] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false); // Ajout de l'état showDetailsModal

//   // Charger les données avec gestion silencieuse des erreurs
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const [productionsRes, formulesRes, produitsRes] = await Promise.allSettled([
//           axios.get('/productions'),
//           axios.get('/formules'),
//           axios.get('/produits')
//         ]);

//         setProductions(productionsRes.status === 'fulfilled' ? productionsRes.value.data : []);
//         setFormules(formulesRes.status === 'fulfilled'
//           ? (formulesRes.value.data?.data || formulesRes.value.data || [])
//           : []);
//         setProduits(produitsRes.status === 'fulfilled'
//           ? (produitsRes.value.data?.data || produitsRes.value.data || [])
//           : []);
//       } catch (err) {
//         console.error("Erreur API:", err);
//         setProductions([]);
//         setFormules([]);
//         setProduits([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filtrer les productions par date
//   const filterByDate = () => {
//     if (!startDate && !endDate) return productions;

//     return productions.filter(production => {
//       const productionDate = new Date(production.created_at);
//       const start = startDate ? new Date(startDate) : null;
//       const end = endDate ? new Date(endDate) : null;

//       if (start && end) {
//         return productionDate >= start && productionDate <= end;
//       } else if (start) {
//         return productionDate >= start;
//       } else if (end) {
//         return productionDate <= end;
//       }
//       return true;
//     });
//   };

//   // Supprimer une production
//   const supprimerProduction = async (id) => {
//     try {
//       await axios.delete(`/productions/${id}`);
//       setProductions(prev => prev.filter(prod => prod.id !== id));
//       setShowConfirm(false);
//       setProduitASupprimer(null);
//     } catch (err) {
//       console.error("Erreur suppression:", err);
//     }
//   };

//   // Filtrer les productions
//   const filteredProductions = filterByDate().filter((p) => {
//     const matchesSearch = p.produit?.nomProduit?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFormule = selectedFormule ? p.formule_id == selectedFormule : true;
//     const matchesProduit = selectedProduit ? p.produit_id == selectedProduit : true;
//     return matchesSearch && matchesFormule && matchesProduit;
//   });

//   // Exporter en CSV
//   const exportToCSV = () => {
//     if (filteredProductions.length === 0) return;

//     const headers = ['ID', 'Produit', 'Formule', 'Quantité', 'Date'];
//     const data = filteredProductions.map(item => [
//       item.id,
//       item.produit?.nomProduit || 'N/A',
//       item.formule?.nom_formule || 'N/A',
//       item.quantite_produite,
//       new Date(item.created_at).toLocaleDateString()
//     ]);

//     const csvContent = "data:text/csv;charset=utf-8,"
//       + headers.join(",") + "\n"
//       + data.map(row => row.join(",")).join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", `productions_${new Date().toISOString().slice(0, 10)}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Gestion du clic sur une ligne
//   const handleRowClick = (productionId, e) => {
//     if (e.target.closest('button')) return;
//     setSelectedProductionId(productionId);
//     setShowDetailsModal(true); // Afficher le modal de détails
//   };

//   if (loading) {
//     return (
//       <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full">
//       <div className="flex">
//         <Navbar />
//         <div className="w-0 lg:w-[225px] bg-red"></div>
//         <div className="flex-1 bg-gray-100 w-full">
//           <div className="p-6 space-y-8 min-h-screen">
//             {/* En-tête */}
//             <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
//               <h1 className="text-xl font-bold">PRODUCTIONS</h1>
//               <div className="flex items-center gap-4">
//                 <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
//                   <Bell size={24} color="#D4AF37" />
//                   {notifications.some(n => !n.read) && (
//                     <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                       {notifications.filter(n => !n.read).length}
//                     </span>
//                   )}
//                 </button>
//                 <Link to="/profile"><User size={24} color="#D4AF37" /></Link>
//                 <span className="font-semibold">{user?.name || 'Admin'}</span>
//               </div>
//             </div>
//             {/* Notifications */}
//             {showNotifications && (
//               <div className="fixed inset-0 bg-black bg-opacity-80 sm:bg-transparent sm:relative sm:inset-auto flex items-center justify-center sm:block sm:right-0 sm:top-12 z-50">
//                 <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:w-80 max-h-[80vh] overflow-y-auto">
//                   <div className="p-4 flex justify-between items-center border-b">
//                     <h3 className="font-bold">Notifications</h3>
//                     <button onClick={() => setShowNotifications(false)}>
//                       <X size={24} />
//                     </button>
//                   </div>
//                   <div className="divide-y">
//                     {notifications.map(notification => (
//                       <div key={notification.id} className={`p-4 ${!notification.read ? 'bg-gray-50' : ''}`}>
//                         <div className="flex justify-between">
//                           <h4 className="font-semibold">{notification.title}</h4>
//                           <span className="text-xs text-gray-500">{notification.time}</span>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//             {/* Barre de recherche */}
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Rechercher un produit..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] bg-white"
//               />
//               <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             </div>
//             {/* Filtres et boutons */}
//             <div className="flex flex-col gap-4 mb-6">
//               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//                 {/* Filtre par formule */}
//                 <div className="relative w-full sm:w-52">
//                   <select
//                     value={selectedFormule}
//                     onChange={(e) => setSelectedFormule(e.target.value)}
//                     className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//                   >
//                     <option value="">Toutes les formules</option>
//                     {formules.map(formule => (
//                       <option key={formule.id} value={formule.id}>
//                         {formule.nom_formule || formule.nomFormule}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                     <ChevronDown className="h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//                 {/* Filtre par produit */}
//                 <div className="relative w-full sm:w-52">
//                   <select
//                     value={selectedProduit}
//                     onChange={(e) => setSelectedProduit(e.target.value)}
//                     className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//                   >
//                     <option value="">Tous les produits</option>
//                     {produits.map(produit => (
//                       <option key={produit.Id || produit.id} value={produit.Id || produit.id}>
//                         {produit.nomProduit}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                     <ChevronDown className="h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//                 {/* Dates */}
//                 <div className="hidden sm:flex items-end gap-4">
//                   <div className="flex items-center gap-2">
//                     <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
//                     <DatePicker
//                       selected={startDate}
//                       onChange={(date) => setStartDate(date)}
//                       selectsStart
//                       startDate={startDate}
//                       endDate={endDate}
//                       dateFormat="dd/MM/yyyy"
//                       placeholderText="Sélectionner"
//                       className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                       isClearable
//                     />
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
//                     <DatePicker
//                       selected={endDate}
//                       onChange={(date) => setEndDate(date)}
//                       selectsEnd
//                       startDate={startDate}
//                       endDate={endDate}
//                       minDate={startDate}
//                       dateFormat="dd/MM/yyyy"
//                       placeholderText="Sélectionner"
//                       className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                       isClearable
//                     />
//                   </div>
//                 </div>
//               </div>
//               {/* Boutons */}
//               <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
//                 <Link href="/formulaireproduction/admin" className="w-full sm:w-auto">
//                   <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
//                     <Plus size={18} />
//                     <span>Ajouter une production</span>
//                   </button>
//                 </Link>
//                 <button
//                   onClick={exportToCSV}
//                   className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto transition-colors"
//                 >
//                   <Download size={18} />
//                   <span>Exporter</span>
//                 </button>
//               </div>
//             </div>
//             {/* Tableau des productions */}
//             <div className="bg-white shadow rounded overflow-hidden">
//               <h2 className="bg-[#D4AF37] text-black font-semibold px-4 py-2">Liste des productions</h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-black text-white">
//                     <tr>
//                       <th className="p-3 text-left">ID</th>
//                       <th className="p-3 text-left">Produit</th>
//                       <th className="p-3 text-left">Formule</th>
//                       <th className="p-3 text-left">Date</th>
//                       <th className="p-3 text-left">Quantité</th>
//                       <th className="p-3 text-left">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredProductions.length > 0 ? (
//                       filteredProductions.map(production => (
//                         <tr
//                           key={production.id}
//                           className="border-b hover:bg-gray-50 cursor-pointer"
//                           onClick={(e) => handleRowClick(production.id, e)}
//                         >
//                           <td className="p-3">#{production.id.toString().padStart(3, '0')}</td>
//                           <td className="p-3">{production.produit?.nomProduit || 'N/A'}</td>
//                           <td className="p-3">{production.formule?.nom_formule || 'N/A'}</td>
//                           <td className="p-3">{new Date(production.created_at).toLocaleDateString()}</td>
//                           <td className="p-3">
//                             <span className={`px-2 py-1 rounded-full text-xs ${
//                               production.quantite_produite === 0 ? 'bg-red-100 text-red-800' :
//                               production.quantite_produite < 5 ? 'bg-yellow-100 text-yellow-800' :
//                               'bg-green-100 text-green-800'
//                             }`}>
//                               {production.quantite_produite}
//                             </span>
//                           </td>
//                           <td className="p-3">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setProduitASupprimer(production.id);
//                                 setShowConfirm(true);
//                               }}
//                               className="text-red-500 hover:text-red-700"
//                             >
//                               <Trash size={18} />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="6" className="p-4 text-center text-gray-500">
//                           Aucune production trouvée
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Modal de confirmation */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-lg font-bold mb-4">Confirmer la suppression</h3>
//             <p className="mb-6">Êtes-vous sûr de vouloir supprimer cette production ?</p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Annuler
//               </button>
//               <button
//                 onClick={() => supprimerProduction(produitASupprimer)}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Supprimer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showDetailsModal && (
//         <IngredientDetailsModal
//           ingredientId={selectedProductionId}
//           onClose={() => setShowDetailsModal(false)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, usePage } from '@inertiajs/react';
import { User, Bell, Search, Trash, Plus, Download, ChevronDown, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/navBar";
import axios from 'axios';
// import ProductionDetailsModal from "../components/ProductionDetailsModal";
import ProductionDetailsModal from "../pageInfo/ProductionDetailsModal";
import * as XLSX from 'xlsx'; // Import ajouté

export default function ProduitAdmin() {
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
   const { props } = usePage();
    const user = props.user;
  const [showNotifications, setShowNotifications] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productions, setProductions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedFormule, setSelectedFormule] = useState('');
  const [selectedProduit, setSelectedProduit] = useState('');
  const [formules, setFormules] = useState([]);
  const [produits, setProduits] = useState([]);
  const [produitASupprimer, setProduitASupprimer] = useState(null);
  const [selectedProductionId, setSelectedProductionId] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productionsRes, formulesRes, produitsRes] = await Promise.allSettled([
          axios.get('/productions'),
          axios.get('/formules'),
          axios.get('/produits')
        ]);

        setProductions(productionsRes.status === 'fulfilled' ? productionsRes.value.data : []);
        setFormules(formulesRes.status === 'fulfilled'
          ? (formulesRes.value.data?.data || formulesRes.value.data || [])
          : []);
        setProduits(produitsRes.status === 'fulfilled'
          ? (produitsRes.value.data?.data || produitsRes.value.data || [])
          : []);
      } catch (err) {
        console.error("Erreur API:", err);
        setProductions([]);
        setFormules([]);
        setProduits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const supprimerProduction = async (id) => {
    try {
      await axios.delete(`/productions/${id}`);
      setProductions(prev => prev.filter(prod => prod.id !== id));
      setShowConfirm(false);
      setProduitASupprimer(null);
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  const filteredProductions = filterByDate().filter((p) => {
    const matchesSearch = p.produit?.nomProduit?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFormule = selectedFormule ? p.formule_id == selectedFormule : true;
    const matchesProduit = selectedProduit ? p.produit_id == selectedProduit : true;
    return matchesSearch && matchesFormule && matchesProduit;
  });

  // Exporter en XLSX
  const exportToXLSX = () => {
    if (filteredProductions.length === 0) return;

    // Préparer les données
    const headers = ['ID', 'Produit', 'Formule', 'Quantité', 'Date'];
    const data = filteredProductions.map(item => [
      item.id,
      item.produit?.nomProduit || 'N/A',
      item.formule?.nom_formule || 'N/A',
      item.quantite_produite,
      new Date(item.created_at).toLocaleDateString()
    ]);

    // Créer un classeur et une feuille de calcul
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productions");

    // Générer le fichier et le télécharger
    const fileName = `productions_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const handleRowClick = (productionId, e) => {
    if (e.target.closest('button')) return;
    setSelectedProductionId(productionId);
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        <Navbar />
        <div className="w-0 lg:w-[225px] bg-red"></div>
        <div className="flex-1 bg-gray-100 w-full">
          <div className="p-6 space-y-8 min-h-screen">
            {/* En-tête */}
            <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
              <h1 className="text-xl font-bold">PRODUCTIONS</h1>
              <div className="flex items-center gap-4">
                <Link to="/profile"><User size={24} color="#D4AF37" /></Link>
                <span className="font-semibold">{user?.name || 'Admin'}</span>
              </div>
            </div>
            {/* Notifications */}
            {showNotifications && (
              <div className="fixed inset-0 bg-black bg-opacity-80 sm:bg-transparent sm:relative sm:inset-auto flex items-center justify-center sm:block sm:right-0 sm:top-12 z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:w-80 max-h-[80vh] overflow-y-auto">
                  <div className="p-4 flex justify-between items-center border-b">
                    <h3 className="font-bold">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X size={24} />
                    </button>
                  </div>
                  <div className="divide-y">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`p-4 ${!notification.read ? 'bg-gray-50' : ''}`}>
                        <div className="flex justify-between">
                          <h4 className="font-semibold">{notification.title}</h4>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Barre de recherche */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] bg-white"
              />
              <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {/* Filtres et boutons */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Filtre par formule */}
                <div className="relative w-full sm:w-52">
                  <select
                    value={selectedFormule}
                    onChange={(e) => setSelectedFormule(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
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
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
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
                      className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
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
                      className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                      isClearable
                    />
                  </div>
                </div>
              </div>
              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
                <Link href="/formulaireproduction/admin" className="w-full sm:w-auto">
                  <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                    <Plus size={18} />
                    <span>Ajouter une production</span>
                  </button>
                </Link>
                <button
                  onClick={exportToXLSX}
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto transition-colors"
                >
                  <Download size={18} />
                  <span>Exporter</span>
                </button>
              </div>
            </div>
            {/* Tableau des productions */}
            <div className="bg-white shadow rounded overflow-hidden">
            <div className="flex justify-between items-center bg-[#D4AF37] text-black font-semibold px-4 py-2">
              <h2>Liste des productions</h2>
              <span className="text-sm bg-black text-white px-2 py-1 rounded-full">
                {filteredProductions.length} élément(s)
              </span>
            </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Produit</th>
                      <th className="p-3 text-left">Formule</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Quantité</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProductions.length > 0 ? (
                      filteredProductions.map(production => (
                        <tr
                          key={production.id}
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={(e) => handleRowClick(production.id, e)}
                        >
                          <td className="p-3">#{production.id.toString().padStart(3, '0')}</td>
                          <td className="p-3">{production.produit?.nomProduit || 'N/A'}</td>
                          <td className="p-3">{production.formule?.nom_formule || 'N/A'}</td>
                          <td className="p-3">{new Date(production.created_at).toLocaleDateString()}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              production.quantite_produite === 0 ? 'bg-red-100 text-red-800' :
                              production.quantite_produite < 5 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {production.quantite_produite}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setProduitASupprimer(production.id);
                                setShowConfirm(true);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-4 text-center text-gray-500">
                          Aucune production trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirmer la suppression</h3>
            <p className="mb-6">Êtes-vous sûr de vouloir supprimer cette production ?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded"
              >
                Annuler
              </button>
              <button
                onClick={() => supprimerProduction(produitASupprimer)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
        {showDetailsModal && (
          <ProductionDetailsModal
            productionId={selectedProductionId}
            onClose={() => setShowDetailsModal(false)}
          />
        )}
    </div>
  );
}