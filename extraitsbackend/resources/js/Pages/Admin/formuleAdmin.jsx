// import React, { useEffect, useState } from 'react';
// import { Bell, Download, Search, Trash, ChevronDown, Plus, User } from 'lucide-react';
// import { Link, usePage } from '@inertiajs/react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Navbar from "../components/navBar";
// import FormuleDetailsModal from '../pageInfo/FormuleDetailsModal';
// import axios from 'axios';

// export default function Contact() {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [updates, setUpdates] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [produitASupprimer, setProduitASupprimer] = useState(null);
//   const [createurFilter, setCreateurFilter] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedFormule, setSelectedFormule] = useState(null);
//   const [showFormuleDetails, setShowFormuleDetails] = useState(false);

//  const { props } = usePage();
//   const user = props.user;

//   const supprimerProduit = (index) => {
//     if (index !== null && index >= 0 && index < updates.length) {
//       setUpdates((prev) => prev.filter((_, i) => i !== index));
//     }
//     setShowConfirm(false);
//     setProduitASupprimer(null);
//   };

//   useEffect(() => {
//     const fetchFormules = async () => {
//       try {
//         const response = await axios.get('/formules');
//         const formules = response.data.map(formule => ({
//           ...formule,
//           Id: `#${formule.id.toString().padStart(3, '0')}`,
//           dateCreation: new Date(formule.dateCreation)
//         }));
//         setUpdates(formules);
//       } catch (err) {
//         setError('Erreur lors du chargement des formules');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFormules();
//   }, []);

//   const filteredUpdates = updates.filter((u) => {
//     const matchesSearch = u.nomFormule?.toLowerCase().includes(searchTerm.toLowerCase());
//     let matchesDates = true;
//     if (startDate || endDate) {
//       const creationDate = new Date(u.dateCreation);
//       if (startDate && endDate) {
//         matchesDates = creationDate >= startDate && creationDate <= endDate;
//       } else if (startDate) {
//         matchesDates = creationDate >= startDate;
//       } else if (endDate) {
//         matchesDates = creationDate <= endDate;
//       }
//     }
//     const matchesCreateur = createurFilter ? u.createur === createurFilter : true;
//     return matchesSearch && matchesDates && matchesCreateur;
//   });

//   const exportToCSV = () => {
//     if (filteredUpdates.length === 0) {
//       alert("Aucune donnée à exporter !");
//       return;
//     }

//     const headers = ['ID', 'Nom de la formule', 'Date de création', 'Créateur', 'Description'];
//     const data = filteredUpdates.map(item => {
//       return [
//         item.Id || '',
//         `"${(item.nomFormule || '').replace(/"/g, '""')}"`,
//         `"${item.dateCreation ? new Date(item.dateCreation).toLocaleDateString('fr-FR') : ''}"`,
//         `"${(item.createur || '').replace(/"/g, '""')}"`,
//         `"${(item.description || '').replace(/"/g, '""')}"`
//       ];
//     });

//     let csvContent = headers.join(",") + "\n" + data.map(row => row.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", `formules_export_${new Date().toISOString().slice(0, 10)}.csv`);
//     link.style.visibility = 'hidden';

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const createurs = [...new Set(updates.map(update => update.createur))];

//   if (loading) {
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
//               <h1 className="text-xl font-bold">FORMULES</h1>
//               <div className="flex items-center gap-4">
//                 <Link href="#"><Bell size={24} color="#D4AF37" /></Link>
//                 <Link href="#"><User size={24} color="#D4AF37" /></Link>
//                 <span className="font-semibold">{user?.name || 'Admin'}</span>
//               </div>
//             </div>

//             <div className="relative w-full mb-6">
//               <input
//                 type="text"
//                 placeholder="Rechercher une formule..."
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
//                     value={createurFilter}
//                     onChange={(e) => setCreateurFilter(e.target.value)}
//                     className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//                   >
//                     <option value="">Tous les créateurs</option>
//                     {createurs.map((createur, index) => (
//                       <option key={index} value={createur}>{createur}</option>
//                     ))}
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
//                       placeholderText="Sélectionner"
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
//                       placeholderText="Sélectionner"
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
//               <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
//                 <Link href="/formulaireformule/admin" className="w-full sm:w-auto">
//                   <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
//                     <Plus size={18} />
//                     <span>Ajouter une formule</span>
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

//             <div className="bg-white shadow p-4 rounded">
//               <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des formules</h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full table-auto mt-2">
//                   <thead className="bg-black text-white">
//                     <tr>
//                       <th className="p-3 text-left">ID</th>
//                       <th className="p-3 text-left">Nom de la formule</th>
//                       <th className="p-3 text-left">Date de création</th>
//                       <th className="p-3 text-left">Créateur</th>
//                       <th className="p-3 text-left">Description</th>
//                       <th className="p-3 text-left">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {loading ? (
//                       <tr>
//                         <td colSpan="6" className="p-3 text-center">Chargement en cours...</td>
//                       </tr>
//                     ) : error ? (
//                       <tr>
//                         <td colSpan="6" className="p-3 text-center text-red-500">{error}</td>
//                       </tr>
//                     ) : filteredUpdates.length === 0 ? (
//                       <tr>
//                         <td colSpan="6" className="p-3 text-center">Aucune formule trouvée</td>
//                       </tr>
//                     ) : (
//                       filteredUpdates.map((u, index) => (
//                         <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => {
//                           setSelectedFormule(u);
//                           setShowFormuleDetails(true);
//                         }}>
//                           <td className="p-3">{u.Id}</td>
//                           <td className="p-3" dangerouslySetInnerHTML={{
//                             __html: u.nomFormule.replace(
//                               new RegExp(`(${searchTerm})`, 'gi'),
//                               '<span class="font-bold text-[#D4AF37]">$1</span>'
//                             )
//                           }} />
//                           <td className="p-3">{new Date(u.dateCreation).toLocaleDateString()}</td>
//                           <td className="p-3">{u.createur}</td>
//                           <td className="p-3">{u.description}</td>
//                           <td className="p-3">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setProduitASupprimer(index);
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

//       {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-lg font-bold mb-4">Confirmer la suppression</h3>
//             <p className="mb-6">Êtes-vous sûr de vouloir supprimer cette formule ?</p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Annuler
//               </button>
//               <button
//                 onClick={() => supprimerProduit(produitASupprimer)}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Supprimer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showFormuleDetails && (
//         <FormuleDetailsModal
//           formule={selectedFormule}
//           onClose={() => setShowFormuleDetails(false)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Bell, Download, Search, Trash, ChevronDown, Plus, User, Upload } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/navBar";
import FormuleDetailsModal from '../pageInfo/FormuleDetailsModal';
import axios from 'axios';
import * as XLSX from 'xlsx';

export default function Contact() {
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
  const [selectedFormule, setSelectedFormule] = useState(null);
  const [showFormuleDetails, setShowFormuleDetails] = useState(false);

 const { props } = usePage();
  const user = props.user;

  const supprimerProduit = (index) => {
    if (index !== null && index >= 0 && index < updates.length) {
      setUpdates((prev) => prev.filter((_, i) => i !== index));
    }
    setShowConfirm(false);
    setProduitASupprimer(null);
  };

  const downloadTemplate = () => {
    const workbook = XLSX.utils.book_new();
    
    // Feuille unique avec toutes les données
    const completeSheet = XLSX.utils.aoa_to_sheet([
      ['formule_nom', 'formule_description', 'produit_id', 'instructions', 'createur', 'ingredient_id', 'quantite', 'unite'],
      ['Exemple Formule', 'Description de la formule', '1', 'Instructions ici', 'Admin', '1', '100', 'g'],
      ['Exemple Formule', 'Description de la formule', '1', 'Instructions ici', 'Admin', '2', '200', 'mL'],
      ['Deuxième Formule', 'Autre description', '2', 'Autres instructions', 'User', '3', '150', 'g'],
      ['Deuxième Formule', 'Autre description', '2', 'Autres instructions', 'User', '4', '250', 'mL']
    ]);
    
    XLSX.utils.book_append_sheet(workbook, completeSheet, "Formules_Complet");
    XLSX.writeFile(workbook, "modele_formules_complet.xlsx");
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Lire la feuille unique
        const completeSheet = workbook.Sheets['Formules_Complet'];
        const allData = XLSX.utils.sheet_to_json(completeSheet);
  
        console.log("Données brutes importées:", allData);
  
        // Grouper les données par formule
        const formulesMap = new Map();
  
        allData.forEach(row => {
          const formuleKey = `${row.formule_nom}-${row.produit_id}-${row.createur}`;
          
          if (!formulesMap.has(formuleKey)) {
            formulesMap.set(formuleKey, {
              nom_formule: row.formule_nom,
              description: row.formule_description,
              produit_id: row.produit_id,
              instructions: row.instructions,
              createur: row.createur,
              ingredients: []
            });
          }
  
          // Ajouter l'ingrédient à la formule
          if (row.ingredient_id && row.quantite && row.unite) {
            formulesMap.get(formuleKey).ingredients.push({
              ingredient_id: row.ingredient_id,
              quantite: row.quantite,
              unite: row.unite
            });
          }
        });
  
        const dataToSend = Array.from(formulesMap.values());
  
        console.log("Données structurées envoyées:", JSON.stringify(dataToSend, null, 2));
  
        // Envoyer au serveur avec token CSRF
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        
        const response = await axios.post('/formules/import', {
          data: dataToSend
        }, {
          headers: {
            'X-CSRF-TOKEN': csrfToken,
            'Content-Type': 'application/json'
          }
        });
  
        if (response.data.success) {
          alert(`${response.data.imported_count} formules importées avec succès !`);
          // Rafraîchir les données
          const fetchResponse = await axios.get('/formules');
          const updatedFormules = fetchResponse.data.map(formule => ({
            ...formule,
            Id: `#${formule.id.toString().padStart(3, '0')}`,
            dateCreation: new Date(formule.dateCreation)
          }));
          setUpdates(updatedFormules);
        }
  
      } catch (error) {
        console.error("Erreur d'importation:", error);
        console.error("Détails erreur:", error.response?.data);
        
        let errorMessage = "Erreur lors de l'importation";
        if (error.response?.data?.errors) {
          errorMessage += "\n\nErreurs de validation:";
          Object.entries(error.response.data.errors).forEach(([field, errors]) => {
            errorMessage += `\n- ${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`;
          });
        }
        
        alert(errorMessage);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  
  useEffect(() => {
    const fetchFormules = async () => {
      try {
        const response = await axios.get('/formules');
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

    const exportToXLSX = () => {
      try {
          if (filteredUpdates.length === 0) {
              alert("Aucune donnée à exporter !");
              return;
          }

          // Préparer les données pour l'exportation
          const data = filteredUpdates.map(item => {
              return {
                  'ID': item.Id || '',
                  'Nom de la formule': item.nomFormule || '',
                  'Date de création': item.dateCreation ? new Date(item.dateCreation).toLocaleDateString('fr-FR') : '',
                  'Créateur': item.createur || '',
                  'Description': item.description || '',
                  'Instructions': item.instructions || '',
                  'Produit ID': item.produit_id || ''
              };
          });

          // Créer un nouveau classeur
          const workbook = XLSX.utils.book_new();
          
          // Créer une feuille à partir des données
          const worksheet = XLSX.utils.json_to_sheet(data);
          
          // Ajouter la feuille au classeur
          XLSX.utils.book_append_sheet(workbook, worksheet, "Formules");
          
          // Générer le fichier et le télécharger
          const fileName = `formules_export_${new Date().toISOString().slice(0, 10)}.xlsx`;
          XLSX.writeFile(workbook, fileName);
          
      } catch (error) {
          console.error("Erreur lors de l'exportation:", error);
          alert("Une erreur est survenue lors de l'exportation des données.");
      }
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
    <div className="min-h-screen">
      <div className="flex">
        <Navbar />
        <div className="w-0 lg:w-[225px] bg-red"></div>
        <div className="flex-1 bg-gray-100 w-full">
          <div className="p-6 space-y-8 min-h-screen">
            <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
              <h1 className="text-xl font-bold">FORMULES</h1>
              <div className="flex items-center gap-4">
                {/* <Link href="#"><Bell size={24} color="#D4AF37" /></Link> */}
                <Link href="#"><User size={24} color="#D4AF37" /></Link>
                <span className="font-semibold">{user?.name || 'Admin'}</span>
              </div>
            </div>

            <div className="relative w-full mb-6">
              <input
                type="text"
                placeholder="Rechercher une formule..."
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
                    value={createurFilter}
                    onChange={(e) => setCreateurFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
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
                <Link href="/formulaireformule/admin" className="w-full sm:w-auto">
                  <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                    <Plus size={18} />
                    <span>Ajouter une formule</span>
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
              <h2>Liste des Formules</h2>
              <span className="text-sm bg-black text-white px-2 py-1 rounded-full">
                {filteredUpdates.length} élément(s)
              </span>
            </div>
              {/* <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des formules</h2> */}
              <div className="overflow-x-auto">
                <table className="w-full">
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
                          <td className="p-3" dangerouslySetInnerHTML={{
                            __html: u.nomFormule.replace(
                              new RegExp(`(${searchTerm})`, 'gi'),
                              '<span class="font-bold text-[#D4AF37]">$1</span>'
                            )
                          }} />
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
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirmer la suppression</h3>
            <p className="mb-6">Êtes-vous sûr de vouloir supprimer cette formule ?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded"
              >
                Annuler
              </button>
              <button
                onClick={() => supprimerProduit(produitASupprimer)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {showFormuleDetails && (
        <FormuleDetailsModal
          formule={selectedFormule}
          onClose={() => setShowFormuleDetails(false)}
        />
      )}
    </div>
  );
}
