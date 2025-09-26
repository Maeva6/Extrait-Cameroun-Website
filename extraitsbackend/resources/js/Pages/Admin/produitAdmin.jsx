// import { User, Bell, Search, Trash, Plus, Download, ChevronDown, X } from 'lucide-react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Navbar from "../components/navBar";
// import { useEffect, useState } from 'react';
// import ConfirmDialog from '../reutilisable/popUpSuppressionProduit';
// import NotificationsAdmin from '../reutilisable/notificationAdmin';
// import { Link, usePage } from '@inertiajs/react';
// import ProduitDetailsModal from '../pageInfo/ProduitDetailsModal';

// export default function ProduitAdmin() {
//    const { props } = usePage();
//     const user = props.user;
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

  
//   const [updates, setUpdates] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categorieFilter, setCategorieFilter] = useState('');
//   const [stockFilter, setStockFilter] = useState('En stock');
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [produitASupprimer, setProduitASupprimer] = useState(null);
//   const [selectedProduitId, setSelectedProduitId] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [produitsResponse, categoriesResponse] = await Promise.all([
//           axios.get('/produits'),
//           axios.get('/categories')
//         ]);
  
//         if (produitsResponse.data?.success && Array.isArray(produitsResponse.data.data)) {
//           setUpdates(produitsResponse.data.data);
//         } else {
//           setUpdates([]);
//         }
  
//         if (categoriesResponse.data && Array.isArray(categoriesResponse.data)) {
//           setCategories(categoriesResponse.data);
//         } else {
//           setCategories([]);
//         }
//       } catch (err) {
//         console.error('Erreur:', err);
//         setUpdates([]);
//         setCategories([]);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, []);
  

//   const markAllAsRead = () => {
//     setNotifications(notifs => notifs.map(n => ({ ...n, read: true })));
//   };

//   const exportToCSV = () => {
//     if (filteredUpdates.length === 0) {
//       alert("Aucune donnée à exporter !");
//       return;
//     }

//     const headers = ['ID', 'Nom du produit', 'Catégorie', 'Date ajout', 'Quantité'];
//     const data = filteredUpdates.map(item => [
//       item.Id,
//       item.nomProduit,
//       item.Categorie,
//       item.DateAjout,
//       item.Quantite
//     ]);

//     let csvContent = "data:text/csv;charset=utf-8,"
//       + headers.join(",") + "\n"
//       + data.map(row => row.join(",")).join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", `produits_export_${new Date().toISOString().slice(0, 10)}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const filteredUpdates = updates.filter((u) => {
//     const matchesSearch = u.nomProduit?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategorie = categorieFilter === '' || u.Categorie === categorieFilter;
  
//     let matchesStock = true;
//     if (stockFilter === 'En rupture de stock') {
//       matchesStock = parseInt(u.Quantite) === 0;
//     } else if (stockFilter === 'En dessous du seuil') {
//       matchesStock = parseInt(u.Quantite) < 5;
//     } else if (stockFilter === 'En stock') {
//       matchesStock = parseInt(u.Quantite) > 0;
//     }
  
//     let matchesDate = true;
//     if (startDate && endDate) {
//       const [day, month, year] = u.DateAjout.split('/');
//       const productDate = new Date(`${year}-${month}-${day}`);
//       matchesDate = productDate >= startDate && productDate <= endDate;
//     }
  
//     return matchesSearch && matchesCategorie && matchesStock && matchesDate;
//   });  

//   // const supprimerProduit = async (id) => {
//   //   try {
//   //     await axios.delete(`/produits/${id}`);
//   //     const response = await axios.get('/produits');
//   //     if (response.data?.success && Array.isArray(response.data.data)) {
//   //       setUpdates(response.data.data);
//   //     } else {
//   //       setUpdates([]);
//   //     }
//   //   } catch (err) {
//   //     console.error('Erreur lors de la suppression:', err);
//   //     alert('Erreur lors de la suppression du produit');
//   //   } finally {
//   //     setShowConfirm(false);
//   //     setProduitASupprimer(null);
//   //   }
//   // };

//   const supprimerProduit = (index) => {
//     console.log("Index à supprimer :", index); // Ajoutez ceci pour vérifier l'index
//     if (index !== null && index >= 0 && index < updates.length) {
//       setUpdates((prev) => prev.filter((_, i) => i !== index));
//     }
//     setShowConfirm(false);
//     setProduitASupprimer(null);
//   };

  
//   const handleRowClick = (produit) => {
//     setSelectedProduitId(produit.Id);
//     setShowDetailsModal(true);
//   };

//   useEffect(() => {
//     if (showNotifications) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => { document.body.style.overflow = ''; };
//   }, [showNotifications]);

//   if (loading) {
//     return (
//       <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
//       </div>
//     );
//   }

  
    

//   return (
    
//     <div className="min-h-screen">
//     <Navbar/>
//       <div className="flex">
//         <div className="w-0 lg:w-[225px] bg-red">
//         </div>
//         <div className="flex-1 bg-gray-100  w-full">
//           <div className="p-6 space-y-8 min-h-screen">
//             {/* Header */}
//             <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
//               <h1 className="text-xl font-bold">PRODUITS</h1>
//               <div className="flex items-center gap-4">
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowNotifications(!showNotifications)}
//                     className="relative focus:outline-none hover:bg-gray-100 p-1 rounded-full"
//                     aria-label="Notifications"
//                   >
//                     <Bell size={24} color="#D4AF37" />
//                     {notifications.filter(n => !n.read).length > 0 && (
//                       <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                         {notifications.filter(n => !n.read).length}
//                       </span>
//                     )}
//                   </button>
//                 </div>
//                 <Link to="/profile"><User size={24} color="#D4AF37" /></Link>
//                 <span className="font-semibold">{user?.name || 'Admin'}</span>
//               </div>
//             </div>

//             {/* Notifications */}
//             {showNotifications && (
//               <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 sm:absolute sm:inset-auto sm:bg-transparent sm:block sm:right-0 sm:top-12">
//                 <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-0 sm:w-80 max-h-[80vh] overflow-y-auto">
//                   <div className="p-4 flex justify-between items-center border-b">
//                     <h3 className="font-bold">Notifications</h3>
//                     <button
//                       onClick={() => setShowNotifications(false)}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       <X size={24} />
//                     </button>
//                   </div>
//                   <NotificationsAdmin
//                     notifications={notifications}
//                     onMarkAllAsRead={markAllAsRead}
//                     onClose={() => setShowNotifications(false)}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Barre de recherche */}
//             <div className="relative w-full mb-6">
//               <input
//                 type="text"
//                 placeholder="Rechercher un produit..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//               />
//               <Search
//                 size={20}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               />
//             </div>

//             {/* Filtres */}
//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//                 <div className="flex flex-col sm:flex-row gap-4 w-full">
//                 <div className="relative w-full sm:w-52 bg-white">
//                   <select
//                     value={categorieFilter}
//                     onChange={(e) => setCategorieFilter(e.target.value)}
//                     className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
//                   >
//                     <option value="">Toutes les catégories</option>
//                     {categories.map((categorie) => (
//                       <option key={categorie.id} value={categorie.name}>
//                         {categorie.name}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                     <ChevronDown className="h-5 w-5 text-gray-400" />
//                   </div>
// </div>


//                   <div className="relative w-full sm:w-52 bg-white">
//                     <select
//                       value={stockFilter}
//                       onChange={(e) => setStockFilter(e.target.value)}
//                       className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
//                     >
//                       <option value="En stock">En stock</option>
//                       <option value="En rupture de stock">En rupture de stock</option>
//                       <option value="En dessous du seuil">En dessous du seuil</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                       <ChevronDown className="h-5 w-5 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Dates - Version mobile */}
//               <div className="sm:hidden w-full overflow-x-auto">
//                 <div className="flex items-center gap-2 w-full min-w-0">
//                   <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
//                   <DatePicker
//                     selected={startDate}
//                     onChange={(date) => setStartDate(date)}
//                     selectsStart
//                     startDate={startDate}
//                     endDate={endDate}
//                     dateFormat="dd/MM/yyyy"
//                     placeholderText="Sélectionner"
//                     className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-blue-500 h-[42px] bg-white"
//                     isClearable
//                   />
//                   <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
//                   <DatePicker
//                     selected={endDate}
//                     onChange={(date) => setEndDate(date)}
//                     selectsEnd
//                     startDate={startDate}
//                     endDate={endDate}
//                     minDate={startDate}
//                     dateFormat="dd/MM/yyyy"
//                     placeholderText="Sélectionner"
//                     className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-[#D4AF37]-500 h-[42px] bg-white"
//                     isClearable
//                   />
//                 </div>
//               </div>

//               {/* Dates - Version desktop */}
//               <div className="hidden sm:flex items-end gap-4">
//                 <div className="flex items-center gap-2">
//                   <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
//                   <DatePicker
//                     selected={startDate}
//                     onChange={(date) => setStartDate(date)}
//                     selectsStart
//                     startDate={startDate}
//                     endDate={endDate}
//                     dateFormat="dd/MM/yyyy"
//                     placeholderText="Sélectionner"
//                     className="w-40 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37]-500 focus:border-[#D4AF37]-500 h-[42px] bg-white"
//                     isClearable
//                   />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
//                   <DatePicker
//                     selected={endDate}
//                     onChange={(date) => setEndDate(date)}
//                     selectsEnd
//                     startDate={startDate}
//                     endDate={endDate}
//                     minDate={startDate}
//                     dateFormat="dd/MM/yyyy"
//                     placeholderText="Sélectionner"
//                     className="w-40 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37]-500 focus:border-[#D4AF37]-500 h-[42px] bg-white"
//                     isClearable
//                   />
//                 </div>
//               </div>
//             </div>
            
//             {/* Boutons d'action */}
//             <div className="flex flex-col gap-4 mb-6 mt-10">
//               <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
//                 <Link href="/formulaireproduit/admin" className="w-full sm:w-auto">
//                   <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
//                     <Plus size={18} />
//                     <span>Ajouter un produit</span>
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

//             {/* Tableau des produits */}
//             <div className="bg-white shadow p-4 rounded">
//               <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des produits</h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full table-auto mt-2">
//                   <thead className="bg-black text-white">
//                     <tr>
//                       <th className="p-3 text-left">ID</th>
//                       <th className="p-3 text-left">Nom du produit</th>
//                       <th className="p-3 text-left">Catégorie</th>
//                       <th className="p-3 text-left">Date d'ajout</th>
//                       <th className="p-3 text-left">Quantité</th>
//                       <th className="p-3 text-left">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredUpdates.length > 0 ? (
//                       filteredUpdates.map((u) => (
//                         <tr 
//                           key={u.Id}
//                           className="border-b hover:bg-gray-50 cursor-pointer"
//                           onClick={() => handleRowClick(u)}
//                         >
//                           <td className="p-3">#{u.Id.toString().padStart(3, '0')}</td>
//                           <td
//                             className="p-3"
//                             dangerouslySetInnerHTML={{
//                               __html: u.nomProduit.replace(
//                                 new RegExp(`(${searchTerm})`, 'gi'),
//                                 '<span class="font-bold text-[#D4AF37]">$1</span>'
//                               )
//                             }}
//                           />
//                           <td className="p-3">{u.Categorie}</td>
//                           <td className="p-3">{u.DateAjout}</td>
//                           <td className="p-3">
//                             <span className={`px-2 py-1 rounded-full text-xs ${
//                               parseInt(u.Quantite) === 0
//                                 ? 'bg-red-100 text-red-800'
//                                 : parseInt(u.Quantite) < 5
//                                   ? 'bg-yellow-100 text-yellow-800'
//                                   : 'bg-green-100 text-green-800'
//                             }`}>
//                               {u.Quantite}
//                             </span>
//                           </td>
//                           <td className="p-3">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setProduitASupprimer(index); // Assurez-vous que l'index est correct
//                               setShowConfirm(true);
//                             }}
//                             className="text-red-500 hover:text-red-700 transition-colors"
//                           >
//                             <Trash size={18} />
//                           </button>

//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="6" className="p-4 text-center text-gray-500">
//                           Aucun produit trouvé
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



//       {/* Popup de confirmation */}
//       {showConfirm && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded shadow-lg">
//       <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce produit ?</p>
//       <div className="flex justify-end">
//         <button
//           onClick={() => setShowConfirm(false)}
//           className="mr-2 px-4 py-2 bg-gray-300 rounded"
//         >
//           Annuler
//         </button>
//         <button
//           onClick={() => supprimerProduit(produitASupprimer)}
//           className="px-4 py-2 bg-red-500 text-white rounded"
//         >
//           Supprimer
//         </button>
//       </div>
//     </div>
//   </div>
// )}


// {showDetailsModal && (
//     <ProduitDetailsModal
//       produitId={selectedProduitId}
//       onClose={() => setShowDetailsModal(false)}
//     />
//   )}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { User, Bell, Search, Trash, Plus, Download, ChevronDown, X, Upload} from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/navBar";
import ConfirmDialog from '../reutilisable/popUpSuppressionProduit';
import NotificationsAdmin from '../reutilisable/notificationAdmin';
import { Link, usePage } from '@inertiajs/react';
import ProduitDetailsModal from '../pageInfo/ProduitDetailsModal';
import axios from 'axios';
import * as XLSX from 'xlsx';

export default function ProduitAdmin() {
  const { props } = usePage();
  const user = props.user;

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const downloadTemplate = () => {
    const workbook = XLSX.utils.book_new();
    const data = [
      {
        "Nom": "Exemple",
        "Catégorie": "Catégorie Exemple",
        "Description": "Description Exemple",
        "Quantité": 10,
        "Contenance": "100ml",
        "Sexe": "Homme",
        "Personnalité": "Sûr de lui et charismatique",
        "Famille Olfactive": "Boisés secs",
        "Quantité Alerte": 5,
        "Prix": 100,
        "Image Principale": "URL_Image",
        "Mode d'utilisation": "Mode d'utilisation Exemple",
        "Particularité": "Particularité Exemple",
        "Senteurs": "Senteur d'ambiance",
        "Ingrédients": "Ingrédient1, Ingrédient2"
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Modèle Produit");
    XLSX.writeFile(workbook, "modele_produit.xlsx");
  };

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

  const [updates, setUpdates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categorieFilter, setCategorieFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('En stock');
  const [showNotifications, setShowNotifications] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [produitASupprimer, setProduitASupprimer] = useState(null);
  const [selectedProduitId, setSelectedProduitId] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [produitsResponse, categoriesResponse] = await Promise.all([
          axios.get('/produits'),
          axios.get('/categories')
        ]);

        if (produitsResponse.data?.success && Array.isArray(produitsResponse.data.data)) {
          setUpdates(produitsResponse.data.data);
        } else {
          setUpdates([]);
        }

        if (categoriesResponse.data && Array.isArray(categoriesResponse.data)) {
          setCategories(categoriesResponse.data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error('Erreur:', err);
        setUpdates([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifs => notifs.map(n => ({ ...n, read: true })));
  };

  const exportToXLSX = () => {
    if (filteredUpdates.length === 0) {
      alert("Aucune donnée à exporter !");
      return;
    }
  
    // Prépare les données pour l'export
    const headers = ['ID', 'Nom du produit', 'Catégorie', 'Date ajout', 'Quantité'];
    const data = filteredUpdates.map(item => [
      `#${item.Id.toString().padStart(3, '0')}`,
      item.nomProduit,
      item.Categorie,
      item.DateAjout,
      item.Quantite,
    ]);
  
    // Crée un nouveau classeur Excel
    const workbook = XLSX.utils.book_new();
  
    // Crée une feuille de calcul
    const worksheet = XLSX.utils.aoa_to_sheet([
      headers, // Ajoute les en-têtes
      ...data,  // Ajoute les données
    ]);
  
    // Ajoute la feuille au classeur
    XLSX.utils.book_append_sheet(workbook, worksheet, "Produits");
  
    // Génère le fichier XLSX
    const date = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `produits_export_${date}.xlsx`);
  };
  

  const filteredUpdates = updates.filter((u) => {
    const matchesSearch = u.nomProduit?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategorie = categorieFilter === '' || u.Categorie === categorieFilter;

    let matchesStock = true;
    if (stockFilter === 'En rupture de stock') {
      matchesStock = parseInt(u.Quantite) === 0;
    } else if (stockFilter === 'En dessous du seuil') {
      matchesStock = parseInt(u.Quantite) < 5;
    } else if (stockFilter === 'En stock') {
      matchesStock = parseInt(u.Quantite) > 0;
    }

    let matchesDate = true;
    if (startDate && endDate) {
      const [day, month, year] = u.DateAjout.split('/');
      const productDate = new Date(`${year}-${month}-${day}`);
      matchesDate = productDate >= startDate && productDate <= endDate;
    }

    return matchesSearch && matchesCategorie && matchesStock && matchesDate;
  });

  const supprimerProduit = async (id) => {
    try {
      await axios.delete(`/produits/${id}`);
      setUpdates(updates.filter(produit => produit.Id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression du produit');
    } finally {
      setShowConfirm(false);
      setProduitASupprimer(null);
    }
  };

  const handleRowClick = (produit) => {
    setSelectedProduitId(produit.Id);
    setShowDetailsModal(true);
  };

  useEffect(() => {
    if (showNotifications) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showNotifications]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  const handleImportClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
      if (jsonData.length > 0) {
        console.log(jsonData); // Vérifiez les données ici
        try {
          const response = await axios.post('http://localhost:8000/import', jsonData, {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
          });
          alert(response.data.message);
        } catch (error) {
          console.error('Erreur détaillée lors de l\'importation des données :', error.response?.data || error.message);
          let errorMessage = 'Erreur lors de l\'importation des données.';
  
          if (error.response) {
            errorMessage = `Erreur ${error.response.status}: ${error.response.data.message || 'Erreur inconnue du serveur'}`;
          } else if (error.request) {
            errorMessage = 'Aucune réponse reçue du serveur.';
          } else {
            errorMessage = error.message;
          }
  
          alert(errorMessage);
        }
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <div className="w-0 lg:w-[225px] bg-red"></div>
        <div className="flex-1 bg-gray-100 w-full">
          <div className="p-6 space-y-8 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
              <h1 className="text-xl font-bold">PRODUITS</h1>
              <div className="flex items-center gap-4">
                <Link to="/profile"><User size={24} color="#D4AF37" /></Link>
                <span className="font-semibold">{user?.name || 'Admin'}</span>
              </div>
            </div>

            {/* Notifications */}
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
                className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
              />
              <Search
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <div className="relative w-full sm:w-52 bg-white">
                    <select
                      value={categorieFilter}
                      onChange={(e) => setCategorieFilter(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    >
                      <option value="">Toutes les catégories</option>
                      {categories.map((categorie) => (
                        <option key={categorie.id} value={categorie.name}>
                          {categorie.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative w-full sm:w-52 bg-white">
                    <select
                      value={stockFilter}
                      onChange={(e) => setStockFilter(e.target.value)}
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
                    className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-blue-500 h-[42px] bg-white"
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
                    className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-[#D4AF37]-500 h-[42px] bg-white"
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
                    className="w-40 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37]-500 focus:border-[#D4AF37]-500 h-[42px] bg-white"
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
                    className="w-40 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37]-500 focus:border-[#D4AF37]-500 h-[42px] bg-white"
                    isClearable
                  />
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col gap-4 mb-6 mt-10">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
              <button
                  onClick={downloadTemplate}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto transition-colors"
                >
                  <Download size={18} />
                  <span>Télécharger le modèle</span>
              </button>

                <div className="w-full sm:w-auto">
                  <button
                    onClick={handleImportClick}
                    className="bg-[#09712B] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors"
                  >
                    <Upload size={18} />
                    <span>Importer les données</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept=".xlsx, .xls"
                  />
                </div>
                <Link href="/formulaireproduit/admin" className="w-full sm:w-auto">
                  <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                    <Plus size={18} />
                    <span>Ajouter un produit</span>
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

            {/* Tableau des produits */}
            <div className="bg-white shadow rounded">
              <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des produits</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
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
                    {filteredUpdates.length > 0 ? (
                      filteredUpdates.map((u) => (
                        <tr
                          key={u.Id}
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleRowClick(u)}
                        >
                          <td className="p-3">#{u.Id.toString().padStart(3, '0')}</td>
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
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              parseInt(u.Quantite) === 0
                                ? 'bg-red-100 text-red-800'
                                : parseInt(u.Quantite) < 5
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                            }`}>
                              {u.Quantite}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setProduitASupprimer(u.Id);
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
                        <td colSpan="6" className="p-4 text-center text-gray-500">
                          Aucun produit trouvé
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

      {/* Popup de confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce produit ?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Annuler
              </button>
              <button
                onClick={() => supprimerProduit(produitASupprimer)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && (
        <ProduitDetailsModal
          produitId={selectedProduitId}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
}
