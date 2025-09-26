// import React, { useEffect, useState } from 'react';
// import { Bell, Download, PiggyBank, ShoppingCart, User, UserPlus, Percent, Search, Trash, ChevronDown, Plus } from 'lucide-react';
// import { Link, usePage } from '@inertiajs/react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Navbar from "../components/navBar";
// import { format, parseISO } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import ReapprovisionnementDetailsModal from '../pageInfo/ReapprovisionnementDetailsModal';

// export default function ReapprovisionnementAdmin() {
//      const { props } = usePage();
//       const user = props.user;
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [showConfirm, setShowConfirm] = useState(false);
//     const [updates, setUpdates] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedFournisseur, setSelectedFournisseur] = useState('');
//     const [selectedIngredient, setSelectedIngredient] = useState('');
//     const [fournisseurs, setFournisseurs] = useState([]);
//     const [ingredients, setIngredients] = useState([]);
//     const [produitASupprimer, setProduitASupprimer] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [selectedReappro, setSelectedReappro] = useState(null);
//     const [showDetailsModal, setShowDetailsModal] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [fournisseursRes, reapproRes, ingredientsRes] = await Promise.all([
//                     fetch('/fournisseurs'),
//                     fetch('/reapprovisionnements'),
//                     fetch('/ingredients')
//                 ]);

//                 if (!fournisseursRes.ok || !reapproRes.ok || !ingredientsRes.ok) {
//                     throw new Error('Erreur de chargement des données');
//                 }

//                 const [fournisseursData, reapproData, ingredientsData] = await Promise.all([
//                     fournisseursRes.json(),
//                     reapproRes.json(),
//                     ingredientsRes.json()
//                 ]);

//                 setFournisseurs(fournisseursData);
//                 setUpdates(reapproData);
//                 setIngredients(ingredientsData);
//             } catch (error) {
//                 console.error("Erreur:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const supprimerProduit = (index) => {
//         if (index !== null && index >= 0 && index < updates.length) {
//             setUpdates((prev) => prev.filter((_, i) => i !== index));
//         }
//         setShowConfirm(false);
//         setProduitASupprimer(null);
//     };

//     const filteredUpdates = updates
//         .filter(u => selectedFournisseur ? u.fournisseur === selectedFournisseur : true)
//         .filter(u => selectedIngredient ? u.nomIngredient === selectedIngredient : true)
//         .filter(u => {
//             if (!startDate && !endDate) return true;

//             const dateReappro = parseISO(u.dateReapprovisionnement);
//             const afterStart = startDate ? dateReappro >= startDate : true;
//             const beforeEnd = endDate ? dateReappro <= endDate : true;

//             return afterStart && beforeEnd;
//         })
//         .filter(u => u.nomIngredient?.toLowerCase().includes(searchTerm.toLowerCase()));

//     const exportToCSV = () => {
//         if (filteredUpdates.length === 0) {
//             alert("Aucune donnée à exporter !");
//             return;
//         }

//         const headers = ['ID', 'Ingrédient', 'Quantité ajoutée', 'Date de réapprovisionnement', 'Fournisseur'];

//         const data = filteredUpdates.map(item => [
//             item.Id,
//             `"${item.nomIngredient}"`,
//             item.quantite,
//             format(parseISO(item.dateReapprovisionnement), 'dd/MM/yyyy HH:mm', { locale: fr }),
//             `"${item.fournisseur}"`
//         ]);

//         let csvContent = headers.join(";") + "\r\n";
//         csvContent += data.map(row => row.join(";")).join("\r\n");

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.setAttribute("href", url);
//         link.setAttribute("download", `export_reapprovisionnements_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`);
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     if (loading) {
//         return (
//             <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen ">
//             <div className="flex w-full">
//                 <Navbar />
//                 <div className="w-0 lg:w-[225px] bg-red"></div>
//                 <div className="flex-1 bg-gray-100 w-full">
//                     <div className="p-6 space-y-8 min-h-screen">
//                         <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
//                             <h1 className="text-xl font-bold">HISTORIQUE REAPPROVISIONNEMENT</h1>
//                             <div className="flex items-center gap-4">
//                                 <Link href="#"><Bell size={24} color="#D4AF37" /></Link>
//                                 <Link href="#"><User size={24} color="#D4AF37" /></Link>
//                                 <span className="font-semibold">{user?.name || 'Admin'}</span>
//                             </div>
//                         </div>

//                         <div className="relative w-full mb-6">
//                             <input
//                                 type="text"
//                                 placeholder="Rechercher un ingrédient..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//                             />
//                             <Search
//                                 size={20}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                             />
//                         </div>

//                         <div className="flex flex-col gap-4 mb-6">
//                             <div className="flex flex-col sm:flex-row gap-4 w-full">
//                                 <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//                                     <div className="relative w-full sm:w-52">
//                                         <select
//                                             value={selectedFournisseur}
//                                             onChange={(e) => setSelectedFournisseur(e.target.value)}
//                                             className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//                                         >
//                                             <option value="">Tous les fournisseurs</option>
//                                             {fournisseurs.map((fournisseur) => (
//                                                 <option key={fournisseur.id} value={fournisseur.nom_fournisseur}>
//                                                     {fournisseur.nom_fournisseur}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                                             <ChevronDown className="h-5 w-5 text-gray-400" />
//                                         </div>
//                                     </div>
//                                     <div className="relative w-full sm:w-52">
//                                         <select
//                                             value={selectedIngredient}
//                                             onChange={(e) => setSelectedIngredient(e.target.value)}
//                                             className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
//                                         >
//                                             <option value="">Tous les ingrédients</option>
//                                             {ingredients.map((ingredient) => (
//                                                 <option key={ingredient.id} value={ingredient.nomIngredient}>
//                                                     {ingredient.nomIngredient}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                                             <ChevronDown className="h-5 w-5 text-gray-400" />
//                                         </div>
//                                     </div>
//                                 </div>
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
//                                             className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                                             isClearable
//                                             locale={fr}
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
//                                             className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                                             isClearable
//                                             locale={fr}
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
//                                             className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                                             isClearable
//                                             locale={fr}
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
//                                             className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                                             isClearable
//                                             locale={fr}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
//                                 <Link href="/formulairereapprovisionnment/admin" className="w-full sm:w-auto">
//                                     <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
//                                         <Plus size={18} />
//                                         <span>Réapprovisionner un ingrédient</span>
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
//                         <div className="bg-white shadow p-4 rounded">
//                             <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Historique des réapprovisionnements</h2>
//                             <div className="overflow-x-auto">
//                                 <table className="w-full table-auto mt-2">
//                                     <thead className="bg-black text-white">
//                                         <tr>
//                                             <th className="p-3 text-left">ID</th>
//                                             <th className="p-3 text-left">Ingrédient</th>
//                                             <th className="p-3 text-left">Quantité</th>
//                                             <th className="p-3 text-left">Date Réapprovisionnement</th>
//                                             <th className="p-3 text-left">Fournisseur</th>
//                                             <th className="p-3 text-left">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredUpdates.map((u, index) => (
//                                             <tr key={index} className="border-b hover:bg-gray-50" onClick={() => {
//                                                 setSelectedReappro(u);
//                                                 setShowDetailsModal(true);
//                                             }} style={{ cursor: 'pointer' }}>
//                                                 <td className="p-3">#{u.Id.toString().padStart(3, '0')}</td>
//                                                 <td
//                                                     className="p-3"
//                                                     dangerouslySetInnerHTML={{
//                                                         __html: u.nomIngredient.replace(
//                                                             new RegExp(`(${searchTerm})`, 'gi'),
//                                                             '<span class="font-bold text-[#D4AF37]">$1</span>'
//                                                         )
//                                                     }}
//                                                 />
//                                                 <td className="p-3">
//                                                     <p>
//                                                         <span className="font-medium"></span>
//                                                         <span className={`ml-2 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800`}>
//                                                             {u.quantite}
//                                                         </span>
//                                                     </p>
//                                                 </td>
//                                                 <td className="p-3">{format(parseISO(u.dateReapprovisionnement), 'dd/MM/yyyy', { locale: fr })}</td>
//                                                 <td className="p-3">{u.fournisseur}</td>
//                                                 <td className="p-3">
//                                                     <button
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             setProduitASupprimer(index);
//                                                             setShowConfirm(true);
//                                                         }}
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
//                     </div>
//                 </div>
//             </div>
//             {showConfirm && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded shadow-lg">
//                         <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce produit ?</p>
//                         <div className="flex justify-end">
//                             <button
//                                 onClick={() => setShowConfirm(false)}
//                                 className="mr-2 px-4 py-2 bg-gray-300 rounded"
//                             >
//                                 Annuler
//                             </button>
//                             <button
//                                 onClick={() => supprimerProduit(produitASupprimer)}
//                                 className="px-4 py-2 bg-red-500 text-white rounded"
//                             >
//                                 Supprimer
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {showDetailsModal && (
//                 <ReapprovisionnementDetailsModal
//                     reapproId={selectedReappro?.Id}
//                     onClose={() => setShowDetailsModal(false)}
//                 />
//             )}
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { Bell, Download, PiggyBank, ShoppingCart, User, UserPlus, Percent, Search, Trash, ChevronDown, Plus,Upload  } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/navBar";
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import ReapprovisionnementDetailsModal from '../pageInfo/ReapprovisionnementDetailsModal';
import * as XLSX from 'xlsx';

export default function ReapprovisionnementAdmin() {
    const { props } = usePage();
    const user = props.user;
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [updates, setUpdates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFournisseur, setSelectedFournisseur] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [fournisseurs, setFournisseurs] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [produitASupprimer, setProduitASupprimer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedReappro, setSelectedReappro] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fournisseursRes, reapproRes, ingredientsRes] = await Promise.all([
                    fetch('/fournisseurs'),
                    fetch('/reapprovisionnements'),
                    fetch('/ingredients')
                ]);

                if (!fournisseursRes.ok || !reapproRes.ok || !ingredientsRes.ok) {
                    throw new Error('Erreur de chargement des données');
                }

                const [fournisseursData, reapproData, ingredientsData] = await Promise.all([
                    fournisseursRes.json(),
                    reapproRes.json(),
                    ingredientsRes.json()
                ]);

                setFournisseurs(fournisseursData);
                setUpdates(reapproData);
                setIngredients(ingredientsData);
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const supprimerProduit = (index) => {
        if (index !== null && index >= 0 && index < updates.length) {
            setUpdates((prev) => prev.filter((_, i) => i !== index));
        }
        setShowConfirm(false);
        setProduitASupprimer(null);
    };

    const downloadTemplate = () => {
        // 1. Créer les données
        const data = [
            ['ID Ingredient*', 'Nom Ingredient', 'Quantité ajoutée*', 'Fournisseur'],
            // ['1', 'Farine', '10', 'Fournisseur Paris'], // Exemple
            // ['', '', '', ''] // Ligne vide à remplir
        ];
    
        // 2. Créer le workbook
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        
        // 3. Style pour la ligne d'exemple
        if (!worksheet['!rows']) worksheet['!rows'] = [];
        worksheet['!rows'][1] = { hidden: true }; // Cache la ligne d'exemple (optionnel)
    
        // 4. Ajouter au workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Réapprovisionnements");
    
        // 5. Télécharger
        XLSX.writeFile(workbook, "modele_reapprovisionnements.xlsx", {
            bookType: 'xlsx',
            type: 'array'
        });
    };
    
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        try {
            // Lire le fichier Excel
            const data = new Uint8Array(await new Response(file).arrayBuffer());
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            
            // Convertir en JSON en ignorant la première ligne (en-tête)
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: ['ingredient_id', 'nomIngredient', 'quantite_ajoutee', 'fournisseur'],
                range: 1 // Ignorer la ligne d'en-tête
            });
    
            // Filtrer et valider strictement les données
            const transformedData = jsonData
                .filter(row => 
                    row.ingredient_id !== undefined && 
                    row.quantite_ajoutee !== undefined &&
                    !isNaN(row.ingredient_id) && 
                    !isNaN(row.quantite_ajoutee)
                )
                .map((row, index) => {
                    const ingredientId = Number(row.ingredient_id);
                    const quantite = Number(row.quantite_ajoutee);
    
                    if (isNaN(ingredientId) || ingredientId <= 0) {
                        throw new Error(`Ligne ${index + 2}: ID d'ingrédient invalide`);
                    }
    
                    if (isNaN(quantite) || quantite <= 0) {
                        throw new Error(`Ligne ${index + 2}: Quantité doit être un nombre positif`);
                    }
    
                    return {
                        ingredient_id: ingredientId,
                        quantite_ajoutee: quantite,
                        fournisseur: row.fournisseur || ''
                    };
                });
    
            if (transformedData.length === 0) {
                throw new Error("Aucune donnée valide trouvée dans le fichier");
            }
    
            // Envoyer au serveur
            const response = await fetch('/reapprovisionnements/import', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ data: transformedData })
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                let errorMessage = result.message || "Erreur lors de l'importation";
                if (result.errors) {
                    errorMessage += "\nDétails:";
                    result.errors.forEach(err => {
                        errorMessage += `\nLigne ${err.line}: ${err.message}`;
                        if (err.data) {
                            errorMessage += `\nDonnées: ${JSON.stringify(err.data)}`;
                        }
                    });
                }
                throw new Error(errorMessage);
            }
    
            alert(`${result.count} réapprovisionnements importés avec succès`);
            
            // Rafraîchir les données
            const updatesResponse = await fetch('/reapprovisionnements');
            setUpdates(await updatesResponse.json());
    
        } catch (error) {
            console.error("Erreur d'import:", error);
            alert(`Échec de l'import:\n${error.message}`);
        } finally {
            event.target.value = ''; // Réinitialiser l'input fichier
        }
    };

    const filteredUpdates = updates
    .filter(u => selectedFournisseur ? u.fournisseur === selectedFournisseur : true)
    .filter(u => selectedIngredient ? u.nomIngredient === selectedIngredient : true)
    .filter(u => {
        if (!startDate && !endDate) return true;
        const dateReappro = parseISO(u.dateReapprovisionnement);
        const afterStart = startDate ? dateReappro >= startDate : true;
        const beforeEnd = endDate ? dateReappro <= endDate : true;
        return afterStart && beforeEnd;
    })
    .filter(u => u.nomIngredient?.toLowerCase().includes(searchTerm.toLowerCase()));

    console.log("Filtered updates:", filteredUpdates); // Vérifiez les données filtrées
   
    const exportToExcel = () => {
        try {
            // 1. Préparation des données
            const data = filteredUpdates.map(item => ({
                ID: item.Id,
                "Ingrédient": item.nomIngredient,
                "Quantité": item.quantite,
                "Date": item.dateReapprovisionnement 
                    ? format(new Date(item.dateReapprovisionnement), 'dd/MM/yyyy', { locale: fr })
                    : 'N/A',
                "Fournisseur": item.fournisseur.replace(/\r\n/g, ' ').trim()
            }));
    
            // 2. Création du worksheet
            const worksheet = XLSX.utils.json_to_sheet(data);
            
            // 3. Création du workbook
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Réapprovisionnements");
            
            // 4. Export en XLSX (format Excel moderne)
            XLSX.writeFile(workbook, `reapprovisionnements_${format(new Date(), 'yyyy-MM-dd')}.xlsx`, {
                bookType: 'xlsx',
                type: 'array'
            });
    
        } catch (error) {
            console.error("Erreur d'export Excel:", error);
            alert(`Échec de l'export : ${error.message}`);
        }
    };
    
    console.log("Structure des données:", JSON.stringify(filteredUpdates[0], null, 2));

    if (loading) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen ">
            <div className="flex w-full">
                <Navbar />
                <div className="w-0 lg:w-[225px] bg-red"></div>
                <div className="flex-1 bg-gray-100 w-full">
                    <div className="p-6 space-y-8 min-h-screen">
                        <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
                            <h1 className="text-xl font-bold">HISTORIQUE REAPPROVISIONNEMENT</h1>
                            <div className="flex items-center gap-4">
                                {/* <Link href="#"><Bell size={24} color="#D4AF37" /></Link> */}
                                <Link href="#"><User size={24} color="#D4AF37" /></Link>
                                <span className="font-semibold">{user?.name || 'Admin'}</span>
                            </div>
                        </div>

                        <div className="relative w-full mb-6">
                            <input
                                type="text"
                                placeholder="Rechercher un ingrédient..."
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
                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                    <div className="relative w-full sm:w-52">
                                        <select
                                            value={selectedFournisseur}
                                            onChange={(e) => setSelectedFournisseur(e.target.value)}
                                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
                                        >
                                            <option value="">Tous les fournisseurs</option>
                                            {fournisseurs.map((fournisseur) => (
                                                <option key={fournisseur.id} value={fournisseur.nom_fournisseur}>
                                                    {fournisseur.nom_fournisseur}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <ChevronDown className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="relative w-full sm:w-52">
                                        <select
                                            value={selectedIngredient}
                                            onChange={(e) => setSelectedIngredient(e.target.value)}
                                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
                                        >
                                            <option value="">Tous les ingrédients</option>
                                            {ingredients.map((ingredient) => (
                                                <option key={ingredient.id} value={ingredient.nomIngredient}>
                                                    {ingredient.nomIngredient}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <ChevronDown className="h-5 w-5 text-gray-400" />
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
                                            className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                                            isClearable
                                            locale={fr}
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
                                            locale={fr}
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
                                            locale={fr}
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
                                            locale={fr}
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

                                <Link href="/formulairereapprovisionnment/admin" className="w-full sm:w-auto">
                                    <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                                        <Plus size={18} />
                                        <span>Réapprovisionner un ingrédient</span>
                                    </button>
                                </Link>
                                <button
                                    onClick={exportToExcel}
                                    className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto transition-colors"
                                >
                                    <Download size={18} />
                                    <span>Exporter</span>
                                </button>
                            </div>
                        </div>
                        <div className="bg-white shadow rounded overflow-hidden">
                            <div className="flex justify-between items-center bg-[#D4AF37] text-black font-semibold px-4 py-2">
                            <h2>Historique des réapprovisionnements</h2>
                            <span className="text-sm bg-black text-white px-2 py-1 rounded-full">
                                {filteredUpdates.length} élément(s)
                            </span>
                        </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-black text-white">
                                        <tr>
                                            <th className="p-3 text-left">ID</th>
                                            <th className="p-3 text-left">Ingrédient</th>
                                            <th className="p-3 text-left">Quantité</th>
                                            <th className="p-3 text-left">Date Réapprovisionnement</th>
                                            <th className="p-3 text-left">Fournisseur</th>
                                            <th className="p-3 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUpdates.map((u, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-50" onClick={() => {
                                                setSelectedReappro(u);
                                                setShowDetailsModal(true);
                                            }} style={{ cursor: 'pointer' }}>
                                                <td className="p-3">#{u.Id.toString().padStart(3, '0')}</td>
                                                <td
                                                    className="p-3"
                                                    dangerouslySetInnerHTML={{
                                                        __html: u.nomIngredient.replace(
                                                            new RegExp(`(${searchTerm})`, 'gi'),
                                                            '<span class="font-bold text-[#D4AF37]">$1</span>'
                                                        )
                                                    }}
                                                />
                                                <td className="p-3">
                                                    <p>
                                                        <span className="font-medium"></span>
                                                        <span className={`ml-2 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800`}>
                                                            {u.quantite}
                                                        </span>
                                                    </p>
                                                </td>
                                                <td className="p-3">{format(parseISO(u.dateReapprovisionnement), 'dd/MM/yyyy', { locale: fr })}</td>
                                                <td className="p-3">{u.fournisseur}</td>
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
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                <ReapprovisionnementDetailsModal
                    reapproId={selectedReappro?.Id}
                    onClose={() => setShowDetailsModal(false)}
                />
            )}
        </div>
    );
}
