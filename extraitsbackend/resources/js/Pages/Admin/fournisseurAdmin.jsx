// import React, { useEffect, useState } from 'react';
// import { Bell, Download, Search, Trash, ChevronDown, Plus, User } from 'lucide-react';
// import { Link, usePage } from '@inertiajs/react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Navbar from "../components/navBar";
// import ConfirmDialog from '../reutilisable/popUpSuppressionProduit';
// import NotificationsAdmin from '../reutilisable/notificationAdmin';
// import FournisseurDetailsModal from '../pageInfo/FournisseurDetailsModal';
// import axios from 'axios';

// export default function FournisseurAdmin() {
//   const [valeurNote, setValeurNote] = useState('');
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [fournisseurs, setFournisseurs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [produitASupprimer, setProduitASupprimer] = useState(null);
//   const [valeur, setValeur] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedFournisseurId, setSelectedFournisseurId] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//  const { props } = usePage();
//   const user = props.user;

//   useEffect(() => {
//     const fetchFournisseurs = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get('/fournisseurs');

//         if (!response.data) {
//           throw new Error('Aucune donnée reçue');
//         }

//         const data = Array.isArray(response.data) ? response.data : [];
//         setFournisseurs(data.map(f => ({
//           ...f,
//           Id: `FRN-${f.id.toString().padStart(3, '0')}`,
//           dateCreation: f.created_at ? new Date(f.created_at) : null
//         })));
//       } catch (err) {
//         setError(err.message || 'Erreur lors du chargement des fournisseurs');
//         setFournisseurs([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFournisseurs();
//   }, []);

//   const supprimerFournisseur = async (id) => {
//     try {
//       const response = await axios.delete(`/fournisseurs/${id}`);

//       if (response.status === 200) {
//         setFournisseurs(prev => prev.filter(f => f.id !== id));
//       }
//     } catch (error) {
//       console.error('Erreur:', error);
//       alert("Erreur lors de la suppression du fournisseur");
//     } finally {
//       setShowConfirm(false);
//       setProduitASupprimer(null);
//     }
//   };

//   const filteredFournisseurs = fournisseurs.filter((f) => {
//     const matchesSearch = f.nom_fournisseur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          f.adresse_mail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          f.contact_tel?.includes(searchTerm);

//     let matchesDates = true;
//     if (startDate || endDate) {
//       const creationDate = f.dateCreation;
//       if (!creationDate) matchesDates = false;
//       if (startDate && endDate) {
//         matchesDates = creationDate >= startDate && creationDate <= endDate;
//       } else if (startDate) {
//         matchesDates = creationDate >= startDate;
//       } else if (endDate) {
//         matchesDates = creationDate <= endDate;
//       }
//     }

//     const matchesCategory = !valeur || f.categorie_produit === valeur;
//     const matchesNote = !valeurNote || f.note == valeurNote;

//     return matchesSearch && matchesDates && matchesCategory && matchesNote;
//   });

//   const exportToCSV = () => {
//     if (filteredFournisseurs.length === 0) {
//       alert("Aucune donnée à exporter !");
//       return;
//     }

//     const headers = ['ID', 'Nom', 'Contact', 'Email', 'Catégorie', 'Note', 'Date ajout'];
//     const data = filteredFournisseurs.map(item => [
//       item.Id || '',
//       `"${(item.nom_fournisseur || '').replace(/"/g, '""')}"`,
//       `"${(item.contact_tel || '').replace(/"/g, '""')}"`,
//       `"${(item.adresse_mail || '').replace(/"/g, '""')}"`,
//       `"${(item.categorie_produit || '').replace(/"/g, '""')}"`,
//       item.note ? `${item.note}/5` : 'Non noté',
//       item.dateCreation ? item.dateCreation.toLocaleDateString('fr-FR') : 'N/A'
//     ]);

//     let csvContent = headers.join(",") + "\n" + data.map(row => row.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", `fournisseurs_export_${new Date().toISOString().slice(0, 10)}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const categories = [...new Set(fournisseurs.map(f => f.categorie_produit).filter(Boolean))];

//   if (isLoading) {
//     return (
//       <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <div className="flex">
//         <Navbar />
//         <div className="w-0 lg:w-[225px] bg-red"></div>
//         <div className="flex-1 bg-gray-100 w-full">
//           <div className="p-6 space-y-8 min-h-screen">
//             <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
//               <h1 className="text-xl font-bold">FOURNISSEURS</h1>
//               <div className="flex items-center gap-4">
//                 <Link href="#"><Bell size={24} color="#D4AF37" /></Link>
//                 <Link href="#"><User size={24} color="#D4AF37" /></Link>
//                 <span className="font-semibold">{user?.name || 'Admin'}</span>
//               </div>
//             </div>

//             <div className="relative w-full mb-6">
//               <input
//                 type="text"
//                 placeholder="Rechercher un fournisseur..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//               />
//               <Search
//                 size={20}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               />
//             </div>

//             <div className="flex flex-col gap-4 mb-6">
//               <div className="flex flex-col sm:flex-row gap-4 w-full">
//                 <div className="relative w-full sm:w-52">
//                   <select
//                     value={valeur}
//                     onChange={(e) => setValeur(e.target.value)}
//                     className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//                   >
//                     <option value="">Toutes catégories</option>
//                     {categories.map((cat, index) => (
//                       <option key={index} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                     <ChevronDown className="h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>

//                 <div className="relative w-full sm:w-52">
//                   <select
//                     value={valeurNote}
//                     onChange={(e) => setValeurNote(e.target.value)}
//                     className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//                   >
//                     <option value="">Toutes notes</option>
//                     <option value="5">⭐ 5/5 (Excellent)</option>
//                     <option value="4">⭐ 4/5 (Très bon)</option>
//                     <option value="3">⭐ 3/5 (Moyen)</option>
//                     <option value="2">⭐ 2/5 (Passable)</option>
//                     <option value="1">⭐ 1/5 (Mauvais)</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                     <ChevronDown className="h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>

//                 <div className="sm:hidden w-full overflow-x-auto">
//                   <div className="flex items-center gap-2 w-full min-w-0">
//                     <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
//                     <DatePicker
//                       selected={startDate}
//                       onChange={(date) => setStartDate(date)}
//                       selectsStart
//                       startDate={startDate}
//                       endDate={endDate}
//                       dateFormat="dd/MM/yyyy"
//                       placeholderText="Date début"
//                       className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                       isClearable
//                     />
//                     <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
//                     <DatePicker
//                       selected={endDate}
//                       onChange={(date) => setEndDate(date)}
//                       selectsEnd
//                       startDate={startDate}
//                       endDate={endDate}
//                       minDate={startDate}
//                       dateFormat="dd/MM/yyyy"
//                       placeholderText="Date fin"
//                       className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                       isClearable
//                     />
//                   </div>
//                 </div>

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
//                       placeholderText="Date début"
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
//                       placeholderText="Date fin"
//                       className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                       isClearable
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
//                 <Link href="/formulairefournisseur/admin" className="w-full sm:w-auto">
//                   <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
//                     <Plus size={18} />
//                     <span>Ajouter un fournisseur</span>
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

//             <div className="bg-white shadow rounded overflow-hidden">
//               <div className="bg-[#D4AF37] text-black font-semibold px-4 py-2">
//                 Liste des Fournisseurs
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-black text-white">
//                     <tr>
//                       <th className="p-3 text-left">ID</th>
//                       <th className="p-3 text-left">Nom</th>
//                       <th className="p-3 text-left">Contact</th>
//                       <th className="p-3 text-left">Email</th>
//                       <th className="p-3 text-left">Catégorie</th>
//                       <th className="p-3 text-left">Note</th>
//                       <th className="p-3 text-left">Date ajout</th>
//                       <th className="p-3 text-left">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {isLoading ? (
//                       <tr>
//                         <td colSpan="8" className="p-4 text-center text-gray-500"></td>
//                       </tr>
//                     ) : error ? (
//                       <tr>
//                         <td colSpan="8" className="p-4 text-center text-red-500">{error}</td>
//                       </tr>
//                     ) : filteredFournisseurs.length === 0 ? (
//                       <tr>
//                         <td colSpan="8" className="p-4 text-center text-gray-500">Aucun fournisseur trouvé</td>
//                       </tr>
//                     ) : (
//                       filteredFournisseurs.map((fournisseur) => (
//                         <tr
//                           key={fournisseur.id}
//                           className="border-b hover:bg-gray-50 cursor-pointer"
//                           onClick={() => {
//                             setSelectedFournisseurId(fournisseur.id);
//                             setShowDetailsModal(true);
//                           }}
//                         >
//                           <td className="p-3">{fournisseur.Id}</td>
//                           <td className="p-3">
//                             <span dangerouslySetInnerHTML={{
//                               __html: fournisseur.nom_fournisseur?.replace(
//                                 new RegExp(`(${searchTerm})`, 'gi'),
//                                 '<span class="font-bold text-[#D4AF37]">$1</span>'
//                               ) || 'N/A'
//                             }} />
//                           </td>
//                           <td className="p-3">{fournisseur.contact_tel || 'N/A'}</td>
//                           <td className="p-3">{fournisseur.adresse_mail || 'N/A'}</td>
//                           <td className="p-3">{fournisseur.categorie_produit || 'N/A'}</td>
//                           <td className="p-3">
//                             <div className="flex">
//                               {[...Array(5)].map((_, i) => (
//                                 <span
//                                   key={i}
//                                   className={`${i < (fournisseur.note || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
//                                 >
//                                   ★
//                                 </span>
//                               ))}
//                             </div>
//                           </td>
//                           <td className="p-3">
//                             {fournisseur.dateCreation ? fournisseur.dateCreation.toLocaleDateString('fr-FR') : 'N/A'}
//                           </td>
//                           <td className="p-3">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setProduitASupprimer(fournisseur.id);
//                                 setShowConfirm(true);
//                               }}
//                               className="text-red-500 hover:text-red-700 transition-colors"
//                             >
//                               <Trash size={18} />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ConfirmDialog
//         isOpen={showConfirm}
//         onConfirm={() => supprimerFournisseur(produitASupprimer)}
//         onCancel={() => setShowConfirm(false)}
//         message="Êtes-vous sûr de vouloir supprimer ce fournisseur ? Cette action est irréversible."
//       />

//       {showDetailsModal && (
//         <FournisseurDetailsModal
//           fournisseurId={selectedFournisseurId}
//           onClose={() => setShowDetailsModal(false)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Bell, Download, Search, Trash, ChevronDown, Plus, User,Upload } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/navBar";
import ConfirmDialog from '../reutilisable/popUpSuppressionProduit';
import NotificationsAdmin from '../reutilisable/notificationAdmin';
import FournisseurDetailsModal from '../pageInfo/FournisseurDetailsModal';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Ajoutez cette ligne en haut avec les autres imports


export default function FournisseurAdmin() {
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
  const [showDetailsModal, setShowDetailsModal] = useState(false);

 const { props } = usePage();
 const user = props.user;

const downloadTemplate = () => {
    // Créer un workbook avec une feuille de calcul
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
        // En-têtes en français
        ['Nom du fournisseur', 'Contact téléphone', 'Email', 'Adresse', 'Catégorie', 'Site web', 'Note'],
    ]);
    
    // Ajouter la feuille au workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fournisseurs");
    
    // Générer le fichier et le télécharger
    XLSX.writeFile(workbook, "modele_fournisseurs.xlsx");
};

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            // Lire le fichier Excel
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Prendre la première feuille
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            
            // Convertir en JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: ['nom_fournisseur', 'contact_tel', 'adresse_mail', 'adresse_boutique', 'categorie_produit', 'site_web', 'note'],
                range: 1 // Ignorer la première ligne (en-têtes)
            });

            // Envoyer au serveur
            const response = await fetch('/fournisseurs/import', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ data: jsonData }),
            });

            const result = await response.json();

            if (!response.ok) {
                let errorMessage = result.message || "Erreur lors de l'importation";
                if (result.errors) {
                    errorMessage += "\nDétails:";
                    for (const [line, errors] of Object.entries(result.errors)) {
                        errorMessage += `\n${line}: ${errors.join(', ')}`;
                    }
                }
                throw new Error(errorMessage);
            }

            alert(result.message);
            
            // Rafraîchir les données
            const fetchResponse = await fetch('/fournisseurs');
            const updatedFournisseurs = await fetchResponse.json();
            setFournisseurs(updatedFournisseurs.map(f => ({
                ...f,
                Id: `#${f.id.toString().padStart(3, '0')}`,
                dateCreation: f.created_at ? new Date(f.created_at) : null
            })));

        } catch (error) {
            console.error("Erreur d'importation:", error);
            alert(error.message);
        }
    };
    reader.readAsArrayBuffer(file);
};

  useEffect(() => {
    const fetchFournisseurs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/fournisseurs');

        if (!response.data) {
          throw new Error('Aucune donnée reçue');
        }

        const data = Array.isArray(response.data) ? response.data : [];
        setFournisseurs(data.map(f => ({
          ...f,
          Id: `#${f.id.toString().padStart(3, '0')}`,
          dateCreation: f.created_at ? new Date(f.created_at) : null
        })));
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des fournisseurs');
        setFournisseurs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFournisseurs();
  }, []);

  const supprimerFournisseur = async (id) => {
    try {
      const response = await axios.delete(`/fournisseurs/${id}`);

      if (response.status === 200) {
        setFournisseurs(prev => prev.filter(f => f.id !== id));
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur lors de la suppression du fournisseur");
    } finally {
      setShowConfirm(false);
      setProduitASupprimer(null);
    }
  };

  const filteredFournisseurs = fournisseurs.filter((f) => {
    const matchesSearch = f.nom_fournisseur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.adresse_mail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.contact_tel?.includes(searchTerm);

    let matchesDates = true;
    if (startDate || endDate) {
      const creationDate = f.dateCreation;
      if (!creationDate) matchesDates = false;
      if (startDate && endDate) {
        matchesDates = creationDate >= startDate && creationDate <= endDate;
      } else if (startDate) {
        matchesDates = creationDate >= startDate;
      } else if (endDate) {
        matchesDates = creationDate <= endDate;
      }
    }

    const matchesCategory = !valeur || f.categorie_produit === valeur;
    const matchesNote = !valeurNote || f.note == valeurNote;

    return matchesSearch && matchesDates && matchesCategory && matchesNote;
  });

  const exportToCSV = () => {
    if (filteredFournisseurs.length === 0) {
      alert("Aucune donnée à exporter !");
      return;
    }

    const headers = ['ID', 'Nom', 'Contact', 'Email', 'Catégorie', 'Note', 'Date ajout'];
    const data = filteredFournisseurs.map(item => [
      item.Id || '',
      `"${(item.nom_fournisseur || '').replace(/"/g, '""')}"`,
      `"${(item.contact_tel || '').replace(/"/g, '""')}"`,
      `"${(item.adresse_mail || '').replace(/"/g, '""')}"`,
      `"${(item.categorie_produit || '').replace(/"/g, '""')}"`,
      item.note ? `${item.note}/5` : 'Non noté',
      item.dateCreation ? item.dateCreation.toLocaleDateString('fr-FR') : 'N/A'
    ]);

    let csvContent = headers.join(",") + "\n" + data.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `fournisseurs_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

    const exportToXLSX = () => {
      if (filteredFournisseurs.length === 0) {
          alert("Aucune donnée à exporter !");
          return;
      }

      // Préparer les données pour l'exportation
      const data = filteredFournisseurs.map(item => {
          return {
              'ID': item.Id || '',
              'Nom du fournisseur': item.nom_fournisseur || '',
              'Contact téléphone': item.contact_tel || '',
              'Email': item.adresse_mail || '',
              'Adresse': item.adresse_boutique || '',
              'Catégorie': item.categorie_produit || '',
              'Site web': item.site_web || '',
              'Note': item.note ? `${item.note}/5` : 'Non noté',
              'Date d\'ajout': item.dateCreation ? item.dateCreation.toLocaleDateString('fr-FR') : 'N/A'
          };
      });

      // Créer un nouveau classeur
      const workbook = XLSX.utils.book_new();
      
      // Créer une feuille à partir des données
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Ajouter la feuille au classeur
      XLSX.utils.book_append_sheet(workbook, worksheet, "Fournisseurs");
      
      // Générer le fichier et le télécharger
      const fileName = `fournisseurs_export_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(workbook, fileName);
  };

  const categories = [...new Set(fournisseurs.map(f => f.categorie_produit).filter(Boolean))];

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        <Navbar />
        <div className="w-0 lg:w-[225px] bg-red"></div>
        <div className="flex-1 bg-gray-100 w-full">
          <div className="p-6 space-y-8 min-h-screen">
            <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
              <h1 className="text-xl font-bold">FOURNISSEURS</h1>
              <div className="flex items-center gap-4">
                {/* <Link href="#"><Bell size={24} color="#D4AF37" /></Link> */}
                <Link href="#"><User size={24} color="#D4AF37" /></Link>
                <span className="font-semibold">{user?.name || 'Admin'}</span>
              </div>
            </div>

            <div className="relative w-full mb-6">
              <input
                type="text"
                placeholder="Rechercher un fournisseur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
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
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
                  >
                    <option value="">Toutes catégories</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="relative w-full sm:w-52">
                  <select
                    value={valeurNote}
                    onChange={(e) => setValeurNote(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
                  >
                    <option value="">Toutes notes</option>
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
                      placeholderText="Date début"
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
                      placeholderText="Date fin"
                      className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
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
                      placeholderText="Date début"
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
                      placeholderText="Date fin"
                      className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                      isClearable
                    />
                  </div>
                </div>
              </div>

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
            onClick={() => document.getElementById('file-upload').click()}
            className="bg-[#09712B] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors"
            >
            <Upload size={18} />
            <span>Importer les données</span>
            </button>
            <input
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            accept=".xlsx, .xls"
           />
          </div>
          
                <Link href="/formulairefournisseur/admin" className="w-full sm:w-auto">
                  <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                    <Plus size={18} />
                    <span>Ajouter un fournisseur</span>
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

            <div className="bg-white shadow rounded overflow-hidden">
              <div className="flex justify-between items-center bg-[#D4AF37] text-black font-semibold px-4 py-2">
              <h2>Liste des Fournisseurs</h2>
              <span className="text-sm bg-black text-white px-2 py-1 rounded-full">
                {filteredFournisseurs.length} élément(s)
              </span>
            </div>
              <div className="overflow-x-auto">
                <table className="w-full">
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
                    {isLoading ? (
                      <tr>
                        <td colSpan="8" className="p-4 text-center text-gray-500"></td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan="8" className="p-4 text-center text-red-500">{error}</td>
                      </tr>
                    ) : filteredFournisseurs.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="p-4 text-center text-gray-500">Aucun fournisseur trouvé</td>
                      </tr>
                    ) : (
                      filteredFournisseurs.map((fournisseur) => (
                        <tr
                          key={fournisseur.id}
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedFournisseurId(fournisseur.id);
                            setShowDetailsModal(true);
                          }}
                        >
                          <td className="p-3">{fournisseur.Id}</td>
                          <td className="p-3">
                            <span dangerouslySetInnerHTML={{
                              __html: fournisseur.nom_fournisseur?.replace(
                                new RegExp(`(${searchTerm})`, 'gi'),
                                '<span class="font-bold text-[#D4AF37]">$1</span>'
                              ) || 'N/A'
                            }} />
                          </td>
                          <td className="p-3">{fournisseur.contact_tel || 'N/A'}</td>
                          <td className="p-3">{fournisseur.adresse_mail || 'N/A'}</td>
                          <td className="p-3">{fournisseur.categorie_produit || 'N/A'}</td>
                          <td className="p-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`${i < (fournisseur.note || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">
                            {fournisseur.dateCreation ? fournisseur.dateCreation.toLocaleDateString('fr-FR') : 'N/A'}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
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
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={() => supprimerFournisseur(produitASupprimer)}
        onCancel={() => setShowConfirm(false)}
        message="Êtes-vous sûr de vouloir supprimer ce fournisseur ? Cette action est irréversible."
      />

      {showDetailsModal && (
        <FournisseurDetailsModal
          fournisseurId={selectedFournisseurId}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
}
