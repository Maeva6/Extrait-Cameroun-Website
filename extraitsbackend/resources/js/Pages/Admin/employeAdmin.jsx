// import { useState, useEffect } from 'react';
// import { Link, usePage } from '@inertiajs/react';
// import { Bell, User, Search, ChevronDown, Plus, Download, Trash } from 'lucide-react';
// import Navbar from "../components/navBar";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// export default function EmployeAdmin() {
//     const [employes, setEmployes] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [valeur, setValeur] = useState('');
//     const [showConfirm, setShowConfirm] = useState(false);
//     const [employeASupprimer, setEmployeASupprimer] = useState(null);
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);

//  const { props } = usePage();
//   const user = props.user;

//     // Chargement des données
//     useEffect(() => {
//         setIsLoading(true);
//         fetch('/recupeemploye')
//             .then(response => response.json())
//             .then(data => {
//                 // setEmployes(response.data.users);
//                 setEmployes(Array.isArray(data) ? data : data.users);
//             })
//             .catch(error => {
//                 console.error('Erreur:', error);
//             })
//             .finally(() => {
//                 setIsLoading(false);
//             });
//     }, []);

//     if (isLoading) {
//         return (
//             <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
//             </div>
//         );
//     }

//     // Formatage des données
//     const formattedEmployes = employes.map(employe => ({
//         Id: `#EMP-${employe.id.toString().padStart(2, '0')}`,
//         nomEmploye: employe.name,
//         Categorie: employe.role === 'employe' ? 'Employé' :
//                    employe.role === 'admin' ? 'Administrateur' : 'Client',
//         DateEmbauche: new Date(employe.created_at),
//         DateEmbaucheFormatted: new Date(employe.created_at).toLocaleDateString('fr-FR'),
//         Quantite: '1',
//         originalId: employe.id
//     }));

//     // Filtrage des données
//     const filteredUpdates = formattedEmployes.filter((u) => {
//         const matchesSearch = u?.nomEmploye?.toLowerCase().includes(searchTerm?.toLowerCase() || '');
//         let matchesDate = true;
//         if (startDate || endDate) {
//             const employeDate = u.DateEmbauche;
//             if (startDate && endDate) {
//                 matchesDate = employeDate >= startDate && employeDate <= endDate;
//             } else if (startDate) {
//                 matchesDate = employeDate >= startDate;
//             } else if (endDate) {
//                 matchesDate = employeDate <= endDate;
//             }
//         }
//         return matchesSearch && matchesDate;
//     });

//     // Export CSV des employés
//     const exportToCSV = () => {
//         if (filteredUpdates.length === 0) {
//             alert("Aucun employé à exporter !");
//             return;
//         }

//         const headers = ['ID', 'Nom', 'Poste', 'Date d\'embauche', 'Statut'];
//         const csvContent = [
//             headers.join(','), // header row first
//             ...filteredUpdates.map(item => [
//                 item.Id,
//                 `"${item.nomEmploye}"`, // quotes for handling commas in names
//                 item.Categorie,
//                 item.DateEmbaucheFormatted,
//                 item.Quantite
//             ].join(','))
//         ].join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.setAttribute('href', url);
//         link.setAttribute('download', `employes_export_${new Date().toISOString().slice(0, 10)}.csv`);
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     // Suppression d'un employé
//     const supprimerProduit = async (id) => {
//         try {
//             setIsLoading(true);
//             const response = await fetch(`/recupeemploye/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
//                     'X-Requested-With': 'XMLHttpRequest'
//                 },
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Erreur lors de la suppression');
//             }

//             setEmployes(employes.filter(e => e.id !== id));
//             setShowConfirm(false);

//         } catch (error) {
//             console.error('Erreur:', error);
//             alert(`Échec de la suppression: ${error.message}`);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen">
//             <div className="flex">
//                 <Navbar/>
//                 <div className="w-0 lg:w-[225px] bg-red"></div>

//                 {/* Contenu principal */}
//                 <div className="flex-1 bg-gray-100 w-full">
//                     <div className="p-6 space-y-8 min-h-screen">
//                         <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
//                             <h1 className="text-xl font-bold">EMPLOYES</h1>
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
//                                 placeholder="Rechercher un employé..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//                             />
//                             <Search
//                                 size={20}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                             />
//                         </div>

//                         {/* Filtres et boutons */}
//                         <div className="flex flex-col gap-4 mb-6">
//                             <div className="flex flex-col sm:flex-row gap-4 w-full">
//                                 <div className="sm:hidden w-full overflow-x-auto">
//                                     <div className="flex items-center gap-2 w-full min-w-0">
//                                         <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
//                                         <DatePicker
//                                             selected={startDate}
//                                             onChange={(date) => setStartDate(date)}
//                                             selectsStart
//                                             startDate={startDate}
//                                             endDate={endDate}
//                                             dateFormat="dd/MM/yyyy"
//                                             placeholderText="Sélectionner"
//                                             className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
//                                             isClearable
//                                         />
//                                         <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
//                                         <DatePicker
//                                             selected={endDate}
//                                             onChange={(date) => setEndDate(date)}
//                                             selectsEnd
//                                             startDate={startDate}
//                                             endDate={endDate}
//                                             minDate={startDate}
//                                             dateFormat="dd/MM/yyyy"
//                                             placeholderText="Sélectionner"
//                                             className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
//                                             isClearable
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="hidden sm:flex items-end gap-4">
//                                     <div className="flex items-center gap-2">
//                                         <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
//                                         <DatePicker
//                                             selected={startDate}
//                                             onChange={(date) => setStartDate(date)}
//                                             selectsStart
//                                             startDate={startDate}
//                                             endDate={endDate}
//                                             dateFormat="dd/MM/yyyy"
//                                             placeholderText="Sélectionner"
//                                             className="w-40 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
//                                             isClearable
//                                         />
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
//                                         <DatePicker
//                                             selected={endDate}
//                                             onChange={(date) => setEndDate(date)}
//                                             selectsEnd
//                                             startDate={startDate}
//                                             endDate={endDate}
//                                             minDate={startDate}
//                                             dateFormat="dd/MM/yyyy"
//                                             placeholderText="Sélectionner"
//                                             className="w-40 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
//                                             isClearable
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
//                                 <Link href="/formulaireemploye/admin" className="w-full sm:w-auto">
//                                     <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
//                                         <Plus size={18} />
//                                         <span>Ajouter un employé</span>
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

//                         {/* Tableau des employés */}
//                         <div className="bg-white shadow p-4 rounded">
//                             <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des employés</h2>
//                             <div className="overflow-x-auto">
//                                 <table className="w-full table-auto mt-2">
//                                     <thead className="bg-black text-white">
//                                         <tr>
//                                             <th className="p-3 text-left">ID</th>
//                                             <th className="p-3 text-left">Nom</th>
//                                             <th className="p-3 text-left">Poste</th>
//                                             <th className="p-3 text-left">Date d'embauche</th>
//                                             <th className="p-3 text-left">Statut</th>
//                                             <th className="p-3 text-left">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredUpdates.map((u, index) => (
//                                             <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
//                                                 <td className="p-3">{u.Id}</td>
//                                                 <td
//                                                     className="p-3"
//                                                     dangerouslySetInnerHTML={{
//                                                         __html: u.nomEmploye.replace(
//                                                             new RegExp(`(${searchTerm})`, 'gi'),
//                                                             '<span class="font-bold text-[#D4AF37]">$1</span>'
//                                                         )
//                                                     }}
//                                                 />
//                                                 <td className="p-3">{u.Categorie}</td>
//                                                 <td className="p-3">{u.DateEmbaucheFormatted}</td>
//                                                 <td className="p-3">{u.Quantite}</td>
//                                                 <td className="p-3">
//                                                     <button
//                                                         onClick={() => {
//                                                             setEmployeASupprimer(u.originalId);
//                                                             setShowConfirm(true);
//                                                         }}
//                                                         className="text-red-500 hover:text-red-700 transition-colors bg-opacity-80"
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

//                         {/* Confirmation de suppression */}
//                         {showConfirm && (
//                             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                                     <h3 className="text-lg font-bold mb-4">Confirmer la suppression</h3>
//                                     <p>Êtes-vous sûr de vouloir supprimer cet employé ?</p>
//                                     <div className="flex justify-end gap-4 mt-6">
//                                         <button
//                                             onClick={() => setShowConfirm(false)}
//                                             className="px-4 py-2 border border-gray-300 rounded-md"
//                                         >
//                                             Annuler
//                                         </button>
//                                         <button
//                                             onClick={() => supprimerProduit(employeASupprimer)}
//                                             className="px-4 py-2 bg-red-500 text-white rounded-md"
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


import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Upload, User, Search, Plus, Download, Trash } from 'lucide-react';
import Navbar from "../components/navBar";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as XLSX from 'xlsx';
import EmployeDetailsModal from '../pageInfo/EmployeDetaille';

export default function EmployeAdmin() {
    const [employes, setEmployes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [valeur, setValeur] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [employeASupprimer, setEmployeASupprimer] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Dans le composant EmployeAdmin
    const [selectedEmploye, setSelectedEmploye] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const { props } = usePage();
    const user = props.user;

    // Chargement des données
    useEffect(() => {
        setIsLoading(true);
        fetch('/recupeemploye')
            .then(response => response.json())
            .then(data => {
                // setEmployes(response.data.users);
                setEmployes(Array.isArray(data) ? data : data.users);
            })
            .catch(error => {
                console.error('Erreur:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
            </div>
        );
    }

    const downloadTemplate = () => {
        try {
            const workbook = XLSX.utils.book_new();
    
            // En-têtes + 1 ligne exemple
            const data = [
                ['Nom*', 'Email*', 'Poste*', 'Téléphone', 'Adresse'],
                ['Jean Dupont', 'jean@exemple.com', 'employe', '0123456789', '123 Rue Exemple']
            ];
    
            const worksheet = XLSX.utils.aoa_to_sheet(data);
    
            // Style des colonnes
            worksheet['!cols'] = [
                { width: 20 },  // Nom
                { width: 25 },  // Email
                { width: 15 },  // Poste
                { width: 15 },  // Téléphone
                { width: 30 }   // Adresse
            ];
    
            XLSX.utils.book_append_sheet(workbook, worksheet, "Modele Employes");
            XLSX.writeFile(workbook, "modele_import_employes.xlsx");
    
        } catch (error) {
            console.error("Erreur création modèle:", error);
            alert("Erreur lors de la génération du modèle");
        }
    };
    
const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        setIsLoading(true);
        
        // 1. Lecture du fichier Excel
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        
        // 2. Conversion en JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: ['name', 'email', 'role', 'phone', 'address'],
            range: 1
        });

        // 3. Validation des données
        const employesToImport = jsonData.filter(employe => {
            return employe.name && employe.email && employe.role;
        });

        // Vérification s'il y a des employés à importer
        if (employesToImport.length === 0) {
            throw new Error("Aucune donnée valide à importer");
        }

        // 4. Envoi des données
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        const response = await fetch('/employes/import', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ employes: employesToImport })
        });

        // 5. Gestion de la réponse
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                errorData?.message || 
                `Erreur serveur (${response.status})`
            );
        }

        const result = await response.json();
        alert(`${result.count} employés importés avec succès!`);
        
        // 6. Rafraîchir les données
        const refreshResponse = await fetch('/recupeemploye');
        const refreshData = await refreshResponse.json();
        setEmployes(Array.isArray(refreshData) ? refreshData : refreshData.users);

    } catch (error) {
        console.error("Erreur détaillée:", {
            message: error.message,
            stack: error.stack
        });
        alert(`Échec de l'importation: ${error.message}`);
    } finally {
        setIsLoading(false);
        event.target.value = ''; // Réinitialiser l'input file
    }
};

    // Formatage des données
    const formattedEmployes = employes.map(employe => ({
        Id: `#${employe.id.toString().padStart(3, '0')}`,
        nomEmploye: employe.name,
        Categorie: employe.role === 'employe' ? 'Employé' :
                   employe.role === 'admin' ? 'Administrateur' : 'Client',
        DateEmbauche: new Date(employe.created_at),
        DateEmbaucheFormatted: new Date(employe.created_at).toLocaleDateString('fr-FR'),
        Quantite: 'En fonction',
        originalId: employe.id
    }));

    // Filtrage des données
    const filteredUpdates = formattedEmployes.filter((u) => {
        const matchesSearch = u?.nomEmploye?.toLowerCase().includes(searchTerm?.toLowerCase() || '');
        let matchesDate = true;
        if (startDate || endDate) {
            const employeDate = u.DateEmbauche;
            if (startDate && endDate) {
                matchesDate = employeDate >= startDate && employeDate <= endDate;
            } else if (startDate) {
                matchesDate = employeDate >= startDate;
            } else if (endDate) {
                matchesDate = employeDate <= endDate;
            }
        }
        return matchesSearch && matchesDate;
    });

    // Export CSV des employés
    // Export XLSX des employés
const exportToXLSX = () => {
    if (filteredUpdates.length === 0) {
      alert("Aucun employé à exporter !");
      return;
    }
  
    try {
      // 1. Préparer les données
      const data = filteredUpdates.map(item => ({
        'ID': item.Id,
        'Nom': item.nomEmploye,
        'Poste': item.Categorie,
        'Date d\'embauche': item.DateEmbaucheFormatted,
        'Statut': item.Quantite
      }));
  
      // 2. Créer le workbook
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // 3. Ajouter des styles optionnels (largeurs de colonnes)
      worksheet['!cols'] = [
        { width: 10 },  // ID
        { width: 25 },  // Nom
        { width: 15 },  // Poste
        { width: 15 },  // Date d'embauche
        { width: 15 }   // Statut
      ];
      
      // 4. Ajouter la feuille au workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Employés");
      
      // 5. Générer le fichier XLSX
      const fileName = `employes_export_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
    } catch (error) {
      console.error("Erreur d'export XLSX:", error);
      alert(`Échec de l'export : ${error.message}`);
    }
  };

    // Suppression d'un employé
    const supprimerProduit = async (id) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/recupeemploye/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'X-Requested-With': 'XMLHttpRequest'
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la suppression');
            }

            setEmployes(employes.filter(e => e.id !== id));
            setShowConfirm(false);

        } catch (error) {
            console.error('Erreur:', error);
            alert(`Échec de la suppression: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="flex">
                <Navbar/>
                <div className="w-0 lg:w-[225px] bg-red"></div>

                {/* Contenu principal */}
                <div className="flex-1 bg-gray-100 w-full">
                    <div className="p-6 space-y-8 min-h-screen">
                        <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
                            <h1 className="text-xl font-bold">EMPLOYES</h1>
                            <div className="flex items-center gap-4">
                                {/* <Link href="#"><Bell size={24} color="#D4AF37" /></Link> */}
                                <Link href="#"><User size={24} color="#D4AF37" /></Link>
                                <span className="font-semibold">{user?.name || 'Admin'}</span>
                            </div>
                        </div>

                        {/* Barre de recherche */}
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Rechercher un employé..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
                            />
                            <Search
                                size={20}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>

                        {/* Filtres et boutons */}
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
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
                                            className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] h-[42px] bg-white"
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
                                            onChange={(date) => setStartDate(date)}
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
                                            onChange={(date) => setEndDate(date)}
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

                                <Link href="/formulaireemploye/admin" className="w-full sm:w-auto">
                                    <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                                        <Plus size={18} />
                                        <span>Ajouter un employé</span>
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

                        {/* Tableau des employés */}
                        <div className="bg-white shadow rounded overflow-hidden">
                            <div className="flex justify-between items-center bg-[#D4AF37] text-black font-semibold px-4 py-2">
                            <h2>Liste des employés</h2>
                            <span className="text-sm bg-black text-white px-2 py-1 rounded-full">
                                {filteredUpdates.length} élément(s)
                            </span>
                        </div>

                            <div className="overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead className="bg-black text-white">
                                        <tr>
                                            <th className="p-3 text-left">ID</th>
                                            <th className="p-3 text-left">Nom</th>
                                            <th className="p-3 text-left">Poste</th>
                                            <th className="p-3 text-left">Date d'embauche</th>
                                            <th className="p-3 text-left">Statut</th>
                                            <th className="p-3 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUpdates.map((u, index) => (
                                            <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 cursor-pointer`}
                                            onClick={() => {
                                                setSelectedEmploye(u.originalId);
                                                setShowDetailsModal(true);
                                            }}
                                        >
                                                <td className="p-3">{u.Id}</td>
                                                <td
                                                    className="p-3"
                                                    dangerouslySetInnerHTML={{
                                                        __html: u.nomEmploye.replace(
                                                            new RegExp(`(${searchTerm})`, 'gi'),
                                                            '<span class="font-bold text-[#D4AF37]">$1</span>'
                                                        )
                                                    }}
                                                />
                                                <td className="p-3">{u.Categorie}</td>
                                                <td className="p-3">{u.DateEmbaucheFormatted}</td>
                                                <td className="p-3">{u.Quantite}</td>
                                                <td className="p-3">
                                                    <button
                                                        onClick={() => {
                                                            setEmployeASupprimer(u.originalId);
                                                            setShowConfirm(true);
                                                        }}
                                                        className="text-red-500 hover:text-red-700 transition-colors bg-opacity-80"
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
                                <EmployeDetailsModal 
                                    employeId={selectedEmploye} 
                                    onClose={() => setShowDetailsModal(false)} 
                                />
                            )}
                        {/* Confirmation de suppression */}
                        {showConfirm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="text-lg font-bold mb-4">Confirmer la suppression</h3>
                                    <p>Êtes-vous sûr de vouloir supprimer cet employé ?</p>
                                    <div className="flex justify-end gap-4 mt-6">
                                        <button
                                            onClick={() => setShowConfirm(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-md"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            onClick={() => supprimerProduit(employeASupprimer)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md"
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
