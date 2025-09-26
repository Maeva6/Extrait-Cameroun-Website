// import React, { useState, useEffect } from "react";
// import { Link, usePage } from '@inertiajs/react';
// import { Bell, User, Search, Plus, Download, Trash } from "lucide-react";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Navbar from "../components/navBar";

// export default function Contact() {
//     const { props } = usePage();
//       const user = props.user;
//     const [searchTerm, setSearchTerm] = useState('');
//     const [status, setStatus] = useState('Tous');
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [showConfirm, setShowConfirm] = useState(false);
//     const [clientToDelete, setClientToDelete] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [clients, setClients] = useState([]);

//     // Récupération des clients depuis l'API
//     useEffect(() => {
//         const fetchClients = async () => {
//             try {
//                 const response = await fetch('/clients');
//                 if (!response.ok) {
//                     throw new Error('Erreur lors de la récupération des clients');
//                 }
//                 const data = await response.json();
//                 setClients(data);
//             } catch (error) {
//                 console.error('Erreur:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchClients();
//     }, []);

//     const filteredData = clients.filter(item => {
//         const matchesStatus = status === 'Tous' || item.status === status;
//         const itemDate = new Date(item.created_at);
//         const matchesStartDate = !startDate || itemDate >= startDate;
//         const matchesEndDate = !endDate || itemDate <= endDate;
//         const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                              item.email.toLowerCase().includes(searchTerm.toLowerCase());
//         return matchesStatus && matchesStartDate && matchesEndDate && matchesSearch;
//     });

//     const exportToCSV = () => {
//         if (filteredData.length === 0) {
//             alert("Aucune donnée à exporter !");
//             return;
//         }

//         const headers = ['ID', 'Nom client', 'Email', 'Date inscription', 'Statut'];
//         const csvData = filteredData.map(item => [
//             `#CLT-${item.id.toString().padStart(2, '0')}`,
//             `"${item.name.replace(/"/g, '""')}"`,
//             `"${item.email.replace(/"/g, '""')}"`,
//             new Date(item.created_at).toLocaleDateString('fr-FR'),
//             `"${item.status || 'Actif'}"`
//         ]);

//         const csvContent = [
//             headers.join(','),
//             ...csvData.map(row => row.join(','))
//         ].join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.setAttribute('href', url);
//         link.setAttribute('download', `clients_export_${new Date().toISOString().slice(0, 10)}.csv`);
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const handleDelete = async (id) => {
//         setClientToDelete(id);
//         setShowConfirm(true);
//     };

//     const confirmDelete = async () => {
//         try {
//             const response = await fetch(`/clients/${clientToDelete}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Erreur lors de la suppression');
//             }

//             setClients(clients.filter(client => client.id !== clientToDelete));
//             setShowConfirm(false);
//         } catch (error) {
//             console.error('Erreur:', error);
//             alert('Échec de la suppression du client');
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen">
//             <div className="flex">
//                 <Navbar/>
//                 <div className="w-0 lg:w-[225px] bg-red"></div>

//                 {/* Contenu principal */}
//                 <div className="flex-1 bg-gray-100 w-full">
//                     <div className="p-6 space-y-8 min-h-screen">
//                         <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
//                             <h1 className="text-xl font-bold">CLIENTS</h1>
//                             <div className="flex items-center gap-4">
//                                 <Link href="#"><Bell size={24} color="#D4AF37" /></Link>
//                                 <Link href="#"><User size={24} color="#D4AF37" /></Link>
//                                 <span className="font-semibold">{user?.name || 'Admin'}</span>
//                             </div>
//                         </div>

//                         {/* Barre de recherche */}
//                         <div className="relative w-full">
//                             <input
//                                 type="text"
//                                 placeholder="Rechercher un client..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//                             />
//                             <Search
//                                 size={20}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                             />
//                         </div>

//                         {/* Version mobile - inline sur une ligne */}
//                         <div className="sm:hidden w-full overflow-x-auto">
//                             <div className="flex items-center gap-2 w-full min-w-0">
//                                 <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
//                                 <DatePicker
//                                     selected={startDate}
//                                     onChange={(date) => setStartDate(date)}
//                                     selectsStart
//                                     startDate={startDate}
//                                     endDate={endDate}
//                                     dateFormat="dd/MM/yyyy"
//                                     placeholderText="Sélectionner"
//                                     className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
//                                     isClearable
//                                 />
//                                 <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
//                                 <DatePicker
//                                     selected={endDate}
//                                     onChange={(date) => setEndDate(date)}
//                                     selectsEnd
//                                     startDate={startDate}
//                                     endDate={endDate}
//                                     minDate={startDate}
//                                     dateFormat="dd/MM/yyyy"
//                                     placeholderText="Sélectionner"
//                                     className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
//                                     isClearable
//                                 />
//                             </div>
//                         </div>

//                         {/* Version desktop - tout sur une ligne */}
//                         <div className="hidden sm:flex items-end gap-4">
//                             <div className="flex items-center gap-2">
//                                 <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
//                                 <DatePicker
//                                     selected={startDate}
//                                     onChange={(date) => setStartDate(date)}
//                                     selectsStart
//                                     startDate={startDate}
//                                     endDate={endDate}
//                                     dateFormat="dd/MM/yyyy"
//                                     placeholderText="Sélectionner"
//                                     className="w-40 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
//                                     isClearable
//                                 />
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
//                                 <DatePicker
//                                     selected={endDate}
//                                     onChange={(date) => setEndDate(date)}
//                                     selectsEnd
//                                     startDate={startDate}
//                                     endDate={endDate}
//                                     minDate={startDate}
//                                     dateFormat="dd/MM/yyyy"
//                                     placeholderText="Sélectionner"
//                                     className="w-40 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
//                                     isClearable
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex flex-col gap-4 mb-6 mt-10">
//                             {/* Boutons */}
//                             <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
//                                 <Link href="/formulaireclient/admin" className="w-full sm:w-auto">
//                                     <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
//                                         <Plus size={18} />
//                                         <span>Ajouter un client</span>
//                                     </button>
//                                 </Link>

//                                 <button
//                                     onClick={exportToCSV}
//                                     className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto transition-colors"
//                                 >
//                                     <Download size={18} />
//                                     <span>Exporter</span>
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Tableau des clients */}
//                         <div className="bg-white shadow p-4 rounded">
//                             <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des clients</h2>
//                             <div className="overflow-x-auto">
//                                 <table className="w-full table-auto mt-2">
//                                     <thead className="bg-black text-white">
//                                         <tr>
//                                             <th className="p-3 text-left">ID</th>
//                                             <th className="p-3 text-left">Nom client</th>
//                                             <th className="p-3 text-left">Email</th>
//                                             <th className="p-3 text-left">Date inscription</th>
//                                             <th className="p-3 text-left">Statut</th>
//                                             <th className="p-3 text-left">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredData.map((item) => (
//                                             <tr key={item.id} className="border-b hover:bg-gray-50">
//                                                 <td className="p-3">{`#CLT-${item.id.toString().padStart(2, '0')}`}</td>
//                                                 <td
//                                                     className="p-3"
//                                                     dangerouslySetInnerHTML={{
//                                                         __html: item.name.replace(
//                                                             new RegExp(`(${searchTerm})`, 'gi'),
//                                                             '<span class="font-bold text-[#D4AF37]">$1</span>'
//                                                         )
//                                                     }}
//                                                 />
//                                                 <td className="p-3">{item.email}</td>
//                                                 <td className="p-3">{new Date(item.created_at).toLocaleDateString('fr-FR')}</td>
//                                                 <td className="p-3">
//                                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                                                         ${(item.status || 'Actif') === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                                                         {item.status || 'Actif'}
//                                                     </span>
//                                                 </td>
//                                                 <td className="p-3">
//                                                     <button
//                                                         onClick={() => handleDelete(item.id)}
//                                                         className="text-red-500 hover:text-red-700 transition-colors"
//                                                     >
//                                                         <Trash size={18} />
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>

//                         {/* Modal de confirmation */}
//                         {showConfirm && (
//                             <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//                                 <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//                                     <h3 className="text-lg font-semibold mb-4">Confirmer la suppression</h3>
//                                     <p className="mb-6">Êtes-vous sûr de vouloir supprimer ce client ?</p>
//                                     <div className="flex justify-end gap-4">
//                                         <button
//                                             onClick={() => setShowConfirm(false)}
//                                             className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
//                                         >
//                                             Annuler
//                                         </button>
//                                         <button
//                                             onClick={confirmDelete}
//                                             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                                         >
//                                             Supprimer
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import { Link, usePage,router } from '@inertiajs/react';
import { User, Search, Plus, Download, Trash, Upload } from "lucide-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/navBar";
import * as XLSX from 'xlsx';
import ClientDetailsModal from "../pageInfo/ClientDetailsModal";

export default function Contact() {
    const { props } = usePage();
    const user = props.user;
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('Tous');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [errors, setErrors] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('/clients');
                if (!response.ok) throw new Error('Erreur lors de la récupération des clients');
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchClients();
    }, []);

    const downloadTemplate = () => {
        try {
            const workbook = XLSX.utils.book_new();
    
            // Une seule ligne d'exemple + en-têtes
            const data = [
                ['Nom client*', 'Email*', 'Téléphone', 'Adresse', 'Statut (Actif/Inactif)'],
                ['Jean Dupont', 'jean@exemple.com', '0123456789', '123 Rue Exemple', 'Actif']
            ];
    
            const worksheet = XLSX.utils.aoa_to_sheet(data);
    
            // Style des colonnes
            worksheet['!cols'] = [
                { width: 20 },  // Nom
                { width: 25 },  // Email
                { width: 15 },  // Téléphone
                { width: 30 },  // Adresse
                { width: 20 }   // Statut
            ];
    
            // Style de la ligne d'en-tête
            const headerStyle = {
                fill: { fgColor: { rgb: "D4AF37" } },  // Fond jaune or
                font: { bold: true }
            };
            
            for (let col = 0; col < data[0].length; col++) {
                const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
                if (!worksheet[cellAddress]) worksheet[cellAddress] = {};
                worksheet[cellAddress].s = headerStyle;
            }
    
            XLSX.utils.book_append_sheet(workbook, worksheet, "Modele Clients");
            XLSX.writeFile(workbook, "modele_import_clients.xlsx");
    
        } catch (error) {
            console.error("Erreur création modèle:", error);
            alert("Erreur lors de la génération du modèle");
        }
    };

    const validateData = (data) => {
        const errors = [];
        data.forEach((row, index) => {
            if (!row.name) errors.push(`Nom manquant à la ligne ${index + 1}`);
            if (!row.email) errors.push(`Email manquant à la ligne ${index + 1}`);
        });
        return errors;
    };


    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error("Aucun fichier sélectionné");
            return;
        }
    
        // Vérification de l'extension
        if (!file.name.match(/\.(xlsx|xls)$/i)) {
            alert("Veuillez sélectionner un fichier Excel (.xlsx ou .xls)");
            event.target.value = '';
            return;
        }
    
        try {
            setIsLoading(true);
            setErrors([]);
    
            // Lecture du fichier
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            
            if (workbook.SheetNames.length === 0) {
                throw new Error("Le fichier ne contient aucune feuille");
            }
    
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: ['name', 'email', 'phone', 'address', 'status'],
                range: 1 // Ignorer la première ligne d'en-têtes
            });
    
            // Filtrage et validation
            const EXAMPLE_EMAIL = 'jean@exemple.com';
            const clientsToImport = [];
            const validationErrors = [];
    
            jsonData.forEach((row, index) => {
                // Ignorer la ligne d'exemple
                if (row.email && row.email.toLowerCase() === EXAMPLE_EMAIL) {
                    return;
                }
    
                // Vérification des champs requis
                if (!row.name || !row.email) {
                    validationErrors.push(`Ligne ${index + 2}: Nom ou email manquant`);
                    return;
                }
    
                // Normalisation des données
                const client = {
                    name: String(row.name).trim(),
                    email: String(row.email).trim().toLowerCase(),
                    phone: row.phone ? String(row.phone).trim() : null,
                    address: row.address ? String(row.address).trim() : null,
                    status: row.status && ['Actif', 'Inactif'].includes(row.status) ? row.status : 'Actif'
                };
    
                // Validation de l'email
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
                    validationErrors.push(`Ligne ${index + 2}: Email invalide (${client.email})`);
                    return;
                }
    
                clientsToImport.push(client);
            });
    
            if (validationErrors.length > 0) {
                setErrors(validationErrors);
                return;
            }
    
            if (clientsToImport.length === 0) {
                setErrors(["Aucun client valide à importer"]);
                return;
            }
    
            // Envoi des données avec Inertia
            await router.post('/clients/import', { clients: clientsToImport }, {
                onSuccess: (page) => {
                    // Mise à jour de la liste des clients
                    if (page.props.createdClients) {
                        setClients(prevClients => [...prevClients, ...page.props.createdClients]);
                    }
                    
                    // Message de succès
                    alert(`${page.props.count ?? clientsToImport.length} clients importés avec succès !`);
                    
                    // Optionnel: Rechargement des données
                    router.reload({ only: ['clients'] });
                },
                onError: (errors) => {
                    // Gestion des erreurs de validation Laravel
                    if (errors.clients) {
                        const formattedErrors = Object.entries(errors.clients)
                            .map(([key, messages]) => {
                                const lineNum = parseInt(key.match(/clients\.(\d+)/)?.[1]) + 2;
                                return `Ligne ${lineNum}: ${messages.join(', ')}`;
                            });
                        setErrors(formattedErrors);
                    } 
                    // Gestion des autres erreurs
                    else if (errors.message) {
                        setErrors([errors.message]);
                    } else {
                        setErrors(["Une erreur est survenue lors de l'importation"]);
                    }
                },
                preserveScroll: true
            });
    
        } catch (error) {
            console.error("Erreur lors de l'import:", error);
            setErrors(["Une erreur technique s'est produite lors du traitement du fichier"]);
        } finally {
            setIsLoading(false);
            event.target.value = ''; // Réinitialiser l'input file
        }
    };
    
    const filteredData = clients.filter(item => {
        const matchesStatus = status === 'Tous' || item.status === status;
        const itemDate = new Date(item.created_at);
        const matchesStartDate = !startDate || itemDate >= startDate;
        const matchesEndDate = !endDate || itemDate <= endDate;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesStartDate && matchesEndDate && matchesSearch;
    });

    const exportToXLSX = () => {
        if (filteredData.length === 0) {
          alert("Aucune donnée à exporter !");
          return;
        }
      
        try {
          // 1. Préparer les données
          const data = filteredData.map(item => ({
            'ID': `#${item.id.toString().padStart(3, '0')}`,
            'Nom client': item.name,
            'Email': item.email,
            'Date inscription': new Date(item.created_at).toLocaleDateString('fr-FR'),
            'Statut': item.status || 'Actif'
          }));
      
          // 2. Créer le workbook
          const workbook = XLSX.utils.book_new();
          const worksheet = XLSX.utils.json_to_sheet(data);
          
          // 3. Ajouter des styles optionnels (largeurs de colonnes)
          worksheet['!cols'] = [
            { width: 10 },  // ID
            { width: 25 },  // Nom client
            { width: 30 },  // Email
            { width: 15 },  // Date inscription
            { width: 15 }   // Statut
          ];
          
          // 4. Ajouter la feuille au workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
          
          // 5. Générer le fichier XLSX
          const fileName = `clients_export_${new Date().toISOString().slice(0, 10)}.xlsx`;
          XLSX.writeFile(workbook, fileName);
          
        } catch (error) {
          console.error("Erreur d'export XLSX:", error);
          alert(`Échec de l'export : ${error.message}`);
        }
      };

    const handleDelete = async (id) => {
        setClientToDelete(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`/clients/${clientToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
            });
            if (!response.ok) throw new Error('Erreur lors de la suppression');

            setClients(clients.filter(client => client.id !== clientToDelete));
            setShowConfirm(false);
        } catch (error) {
            console.error('Erreur:', error);
            alert('Échec de la suppression du client');
        }
    };

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
                <Navbar/>
                <div className="w-0 lg:w-[225px] bg-red"></div>
                <div className="flex-1 bg-gray-100 w-full">
                    <div className="p-6 space-y-8 min-h-screen">
                        <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
                            <h1 className="text-xl font-bold">CLIENTS</h1>
                            <div className="flex items-center gap-4">
                                <Link href="#"><User size={24} color="#D4AF37" /></Link>
                                <span className="font-semibold">{user?.name || 'Admin'}</span>
                            </div>
                        </div>
                        {errors.length > 0 && (
                            <div className="error-messages bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                <h3 className="font-bold mb-2">Erreurs d'importation :</h3>
                                <ul className="list-disc pl-5">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Rechercher un client..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
                            />
                            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="sm:hidden w-full overflow-x-auto">
                            <div className="flex items-center gap-2 w-full min-w-0">
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={setStartDate}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Sélectionner"
                                    className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
                                    isClearable
                                />
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={setEndDate}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Sélectionner"
                                    className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
                                    isClearable
                                />
                            </div>
                        </div>
                        <div className="hidden sm:flex items-end gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={setStartDate}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Sélectionner"
                                    className="w-40 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
                                    isClearable
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={setEndDate}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Sélectionner"
                                    className="w-40 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
                                    isClearable
                                />
                            </div>
                        </div>
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
                                <Link href="/formulaireclient/admin" className="w-full sm:w-auto">
                                    <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                                        <Plus size={18} />
                                        <span>Ajouter un client</span>
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
                            <h2>Liste des clients</h2>
                            <span className="text-sm bg-black text-white px-2 py-1 rounded-full">
                                {filteredData.length} élément(s)
                            </span>
                        </div>

                            <div className="overflow-x-auto">
                                <table className="w-full table-auto ">
                                    <thead className="bg-black text-white">
                                        <tr>
                                            <th className="p-3 text-left">ID</th>
                                            <th className="p-3 text-left">Nom client</th>
                                            <th className="p-3 text-left">Email</th>
                                            <th className="p-3 text-left">Date inscription</th>
                                            <th className="p-3 text-left">Statut</th>
                                            <th className="p-3 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((item) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => {
                                                setSelectedClient(item.id);
                                                setShowDetailsModal(true);
                                            }}>
                                                <td className="p-3">{`#${item.id.toString().padStart(3, '0')}`}</td>
                                                <td className="p-3" dangerouslySetInnerHTML={{
                                                    __html: item.name.replace(
                                                        new RegExp(`(${searchTerm})`, 'gi'),
                                                        '<span class="font-bold text-[#D4AF37]">$1</span>'
                                                    )
                                                }} />
                                                <td className="p-3">{item.email}</td>
                                                <td className="p-3">{new Date(item.created_at).toLocaleDateString('fr-FR')}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                        ${(item.status || 'Actif') === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {item.status || 'Actif'}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
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
                        {showDetailsModal && (
                            <ClientDetailsModal 
                                clientId={selectedClient} 
                                onClose={() => setShowDetailsModal(false)} 
                            />
                        )}
                        
                        {showConfirm && (
                            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                    <h3 className="text-lg font-semibold mb-4">Confirmer la suppression</h3>
                                    <p className="mb-6">Êtes-vous sûr de vouloir supprimer ce client ?</p>
                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={() => setShowConfirm(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            onClick={confirmDelete}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
