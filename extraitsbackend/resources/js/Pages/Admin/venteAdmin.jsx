// import React, { useState, useEffect } from "react";
// import { Link, usePage } from '@inertiajs/react';
// import { User, Bell, Plus, BarChart2, Download, ChevronLeft, ChevronRight, Trash } from 'lucide-react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import Navbar from "../components/navBar";
// import axios from 'axios';
// import { startOfWeek, endOfWeek, format, addWeeks, subWeeks } from 'date-fns';
// import { fr } from 'date-fns/locale'; // 👈 Ajout

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function VenteAdmin() {
//   const { props } = usePage();
//   const user = props.user;

//   const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })); // 👈 Début lundi
//   const [currentWeekEnd, setCurrentWeekEnd] = useState(endOfWeek(new Date(), { weekStartsOn: 1 }));     // 👈 Fin dimanche
//   const [ventes, setVentes] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [venteToDelete, setVenteToDelete] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [weeklyData, setWeeklyData] = useState({
//     labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
//     datasets: [
//       {
//         label: 'Ventes (FCFA)',
//         data: [0, 0, 0, 0, 0, 0, 0],
//         backgroundColor: '#D4AF37',
//         borderRadius: 4
//       }
//     ]
//   });

//   const fetchVentes = async (start, end) => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get('/ventes-hebdomadaires', {
//         params: {
//           startDate: format(start, 'yyyy-MM-dd'),
//           endDate: format(end, 'yyyy-MM-dd')
//         }
//       });
//       setWeeklyData(prevState => ({
//         ...prevState,
//         datasets: [{
//           ...prevState.datasets[0],
//           data: response.data
//         }]
//       }));
//     } catch (error) {
//       console.error("Erreur lors de la récupération des ventes:", error);
//       setError("Erreur lors du chargement des données");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchVentesList = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get('/infoventes');
//       setVentes(response.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des ventes:", error);
//       setError("Erreur lors du chargement des données");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVentes(currentWeekStart, currentWeekEnd);
//     fetchVentesList();
//   }, [currentWeekStart, currentWeekEnd]);

//   const goToPreviousWeek = () => {
//     const newStart = subWeeks(currentWeekStart, 1);
//     const newEnd = subWeeks(currentWeekEnd, 1);
//     setCurrentWeekStart(startOfWeek(newStart, { weekStartsOn: 1 }));
//     setCurrentWeekEnd(endOfWeek(newEnd, { weekStartsOn: 1 }));
//   };

//   const goToNextWeek = () => {
//     const newStart = addWeeks(currentWeekStart, 1);
//     const newEnd = addWeeks(currentWeekEnd, 1);
//     setCurrentWeekStart(startOfWeek(newStart, { weekStartsOn: 1 }));
//     setCurrentWeekEnd(endOfWeek(newEnd, { weekStartsOn: 1 }));
//   };

//   const exportToCSV = () => {
//     const headers = ['Semaine du ' + format(currentWeekStart, 'dd/MM/yyyy') + ' au ' + format(currentWeekEnd, 'dd/MM/yyyy')];
//     const subHeaders = ['Jour', 'Ventes (FCFA)'];
//     const csvRows = weeklyData.labels.map((label, index) => {
//       const data = weeklyData.datasets[0].data[index];
//       return `${label},${data}`;
//     });

//     const csvContent = [headers, subHeaders, ...csvRows].join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', `ventes_hebdomadaires_${format(currentWeekStart, 'dd-MM-yyyy')}_${format(currentWeekEnd, 'dd-MM-yyyy')}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: function(value) {
//             return value + ' FCFA';
//           }
//         }
//       }
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             const label = context.label || '';
//             const value = context.raw || 0;
//             const date = new Date(currentWeekStart);
//             date.setDate(currentWeekStart.getDate() + context.dataIndex); // 👈 correction ici
//             return `${label}: ${value} FCFA (${format(date, 'dd/MM/yyyy', { locale: fr })})`;
//           }
//         }
//       }
//     }
//   };

//   const handleDelete = (id) => {
//     setVenteToDelete(id);
//     setShowConfirm(true);
//   };

//   const supprimerVente = async () => {
//     try {
//       setIsLoading(true);
//       await axios.delete(`/ventedestroy/${venteToDelete}`);
//       setVentes(ventes.filter(vente => vente.id !== venteToDelete));
//     } catch (error) {
//       console.error("Erreur lors de la suppression de la vente:", error);
//       setError("Erreur lors de la suppression");
//     } finally {
//       setIsLoading(false);
//       setShowConfirm(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
//       </div>
//     );
//   }

//    return (
//       <div className="min-h-screen">
//         <div className="flex">
//           <Navbar />
//           <div className="w-0 lg:w-[225px] bg-red"></div>
          
//           <div className="flex-1 bg-gray-100 w-full">
//             <div className="p-6 space-y-8 min-h-screen">
//               <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
//                 <h1 className="text-xl font-bold">VENTES</h1>
//                 <div className="flex items-center gap-4">
//                   <Link href="#"><Bell size={24} color="#D4AF37" /></Link>
//                   <Link href="#"><User size={24} color="#D4AF37" /></Link>
//                  <span className="font-semibold">{user?.name || 'Admin'}</span>
//                 </div>
//               </div>
  
//               {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//                   <span className="block sm:inline">{error}</span>
//                 </div>
//               )}
  
//               <div className="flex flex-col sm:flex-row gap-4 w-full justify-end">
//                 <button
//                   onClick={goToPreviousWeek}
//                   className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors"
//                 >
//                   <ChevronLeft size={18} />
//                   <span>Semaine précédente</span>
//                 </button>
  
//                 <button
//                   onClick={goToNextWeek}
//                   className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors"
//                 >
//                   <ChevronRight size={18} />
//                   <span>Semaine suivante</span>
//                 </button>
  
//                 <button
//                   onClick={exportToCSV}
//                   className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors"
//                 >
//                   <Download size={18} />
//                   <span>Exporter</span>
//                 </button>
//               </div>
  
//               {/* Diagramme hebdomadaire */}
//               <div className="bg-white p-4 rounded-lg shadow w-full">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center">
//                     <BarChart2 className="text-[#D4AF37] mr-2" size={20} />
//                     <h3 className="font-semibold">Ventes hebdomadaires</h3>
//                   </div>
//                   <p className="text-lg text-[#000000]">
//                     Semaine du <span className="text-[#B7950B]">{format(currentWeekStart, 'dd/MM/yyyy')}</span> au <span className="text-[#B7950B]">{format(currentWeekEnd, 'dd/MM/yyyy')}</span>
//                   </p>
//                 </div>
//                 <div className="h-96">
//                   <Bar data={weeklyData} options={options} />
//                 </div>
//               </div>
  
//               {/* Tableau des ventes */}
//               <div className="bg-white rounded-lg shadow overflow-hidden">
//                 <div className="bg-white rounded-lg shadow overflow-hidden p-4">
//                   <h2 className="bg-[#D4AF37] text-black font-semibold px-4 py-2 rounded-t">Liste des ventes</h2>
//                   <div className="overflow-x-auto">
//                     <table className="w-full table-auto mt-2">
//                       <thead className="bg-black text-white">
//                         <tr>
//                           <th className="p-3 text-left">ID</th>
//                           <th className="p-3 text-left">Client</th>
//                           <th className="p-3 text-left">Produit</th>
//                           <th className="p-3 text-left">Prix</th>
//                           <th className="p-3 text-left">Date Commande</th>
//                           <th className="p-3 text-left">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {ventes.length === 0 ? (
//                           <tr>
//                             <td colSpan="6" className="p-3 text-center">Aucune vente trouvée</td>
//                           </tr>
//                         ) : (
//                           ventes.map((vente) => (
//                             <tr key={vente.id} className="border-b hover:bg-gray-50">
//                               <td className="p-3">{vente.id}</td>
//                               <td className="p-3">{vente.client}</td>
//                               <td className="p-3">{vente.produits}</td>
//                               <td className="p-3">{vente.prix} FCFA</td>
//                               <td className="p-3">{new Date(vente.dateCommande).toLocaleDateString()}</td>
//                               <td className="p-3">
//                                 <button
//                                   onClick={() => handleDelete(vente.id)}
//                                   className="text-red-500 hover:text-red-700 transition-colors"
//                                 >
//                                   <Trash size={18} />
//                                 </button>
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
  
//         {/* Confirmation de suppression */}
//         {showConfirm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded shadow-lg z-50">
//               <p className="mb-4">Êtes-vous sûr de vouloir supprimer cette vente ?</p>
//               <div className="flex justify-end">
//                 <button
//                   onClick={() => setShowConfirm(false)}
//                   className="mr-2 px-4 py-2 bg-gray-300 rounded"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   onClick={supprimerVente}
//                   className="px-4 py-2 bg-red-500 text-white rounded"
//                 >
//                   Supprimer
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

import React, { useState, useEffect } from "react";
import { Link, usePage } from '@inertiajs/react';
import { User, Bell, Plus, BarChart2, Download, ChevronLeft, ChevronRight, Trash } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from "../components/navBar";
import axios from 'axios';
import { startOfWeek, endOfWeek, format, addWeeks, subWeeks } from 'date-fns';
import { fr } from 'date-fns/locale'; // 👈 Ajout
import * as XLSX from 'xlsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function VenteAdmin() {
  const { props } = usePage();
  const user = props.user;

  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })); // 👈 Début lundi
  const [currentWeekEnd, setCurrentWeekEnd] = useState(endOfWeek(new Date(), { weekStartsOn: 1 }));     // 👈 Fin dimanche
  const [ventes, setVentes] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [venteToDelete, setVenteToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [weeklyData, setWeeklyData] = useState({
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
      {
        label: 'Ventes (FCFA)',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#D4AF37',
        borderRadius: 4
      }
    ]
  });

  const fetchVentes = async (start, end) => {
    try {
      setIsLoading(true);
      const response = await axios.get('/ventes-hebdomadaires', {
        params: {
          startDate: format(start, 'yyyy-MM-dd'),
          endDate: format(end, 'yyyy-MM-dd')
        }
      });
      setWeeklyData(prevState => ({
        ...prevState,
        datasets: [{
          ...prevState.datasets[0],
          data: response.data
        }]
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des ventes:", error);
      setError("Erreur lors du chargement des données");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVentesList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/infoventes');
      setVentes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des ventes:", error);
      setError("Erreur lors du chargement des données");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVentes(currentWeekStart, currentWeekEnd);
    fetchVentesList();
  }, [currentWeekStart, currentWeekEnd]);

  const goToPreviousWeek = () => {
    const newStart = subWeeks(currentWeekStart, 1);
    const newEnd = subWeeks(currentWeekEnd, 1);
    setCurrentWeekStart(startOfWeek(newStart, { weekStartsOn: 1 }));
    setCurrentWeekEnd(endOfWeek(newEnd, { weekStartsOn: 1 }));
  };

  const goToNextWeek = () => {
    const newStart = addWeeks(currentWeekStart, 1);
    const newEnd = addWeeks(currentWeekEnd, 1);
    setCurrentWeekStart(startOfWeek(newStart, { weekStartsOn: 1 }));
    setCurrentWeekEnd(endOfWeek(newEnd, { weekStartsOn: 1 }));
  };

  const exportToXLSX = () => {
    // Données principales (graphique)
    const dataGraphique = weeklyData.labels.map((label, index) => {
      return {
        'Jour': label,
        'Ventes (FCFA)': weeklyData.datasets[0].data[index],
        'Date': format(
          new Date(currentWeekStart.getTime() + (index * 24 * 60 * 60 * 1000)), 
          'dd/MM/yyyy'
        )
      };
    });
  
    // Données détaillées (toutes les ventes)
    const dataDetails = ventes.map(vente => {
      return {
        'ID': vente.id,
        'Client': vente.client,
        'Produits': vente.produits,
        'Prix (FCFA)': vente.prix,
        'Date Commande': new Date(vente.dateCommande).toLocaleDateString()
      };
    });
  
    // Calcul des totaux
    const totalVentesGraphique = weeklyData.datasets[0].data.reduce((sum, value) => sum + value, 0);
    const totalVentesDetails = ventes.reduce((sum, vente) => sum + parseFloat(vente.prix), 0);
  
    // Création du workbook avec formatage
    const workbook = XLSX.utils.book_new();
    
    // Feuille de données principales (graphique)
    const worksheetGraphique = XLSX.utils.json_to_sheet(dataGraphique);
    
    // Ajouter la ligne de total pour le graphique
    XLSX.utils.sheet_add_aoa(worksheetGraphique, [
      ['TOTAL', totalVentesGraphique, '']
    ], { origin: -1 });
    
    // Formatage des nombres (optionnel)
    const rangeGraphique = XLSX.utils.decode_range(worksheetGraphique['!ref']);
    for (let R = rangeGraphique.s.r + 1; R <= rangeGraphique.e.r; R++) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: 1 }); // Colonne B (Ventes)
      if (worksheetGraphique[cellAddress]) {
        worksheetGraphique[cellAddress].z = '#,##0" FCFA"';
      }
    }
    
    XLSX.utils.book_append_sheet(workbook, worksheetGraphique, "Ventes Hebdomadaires");
    
    // Feuille de détails des ventes (toutes les ventes)
    const worksheetDetails = XLSX.utils.json_to_sheet(dataDetails);
    
    // Ajouter la ligne de total pour les détails
    XLSX.utils.sheet_add_aoa(worksheetDetails, [
      ['TOTAL', '', '', totalVentesDetails, '']
    ], { origin: -1 });
    
    // Formatage des nombres pour les détails
    const rangeDetails = XLSX.utils.decode_range(worksheetDetails['!ref']);
    for (let R = rangeDetails.s.r + 1; R <= rangeDetails.e.r; R++) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: 3 }); // Colonne D (Prix)
      if (worksheetDetails[cellAddress]) {
        worksheetDetails[cellAddress].z = '#,##0.00" FCFA"';
      }
    }
    
    XLSX.utils.book_append_sheet(workbook, worksheetDetails, "Détails des Ventes");
    
    // Feuille de résumé
    const summaryData = [
      ['RAPPORT DES VENTES HEBDOMADAIRES'],
      [''],
      ['Période', `Du ${format(currentWeekStart, 'dd/MM/yyyy')} au ${format(currentWeekEnd, 'dd/MM/yyyy')}`],
      ['Date de génération', format(new Date(), 'dd/MM/yyyy à HH:mm')],
      ['Total des ventes de la semaine', `${totalVentesGraphique.toLocaleString()} FCFA`],
      ['Total général des ventes', `${totalVentesDetails.toLocaleString()} FCFA`],
      ['Nombre total de transactions', ventes.length],
      ['Moyenne par transaction', ventes.length > 0 ? `${Math.round(totalVentesDetails / ventes.length).toLocaleString()} FCFA` : '0 FCFA'],
      ['Moyenne quotidienne', `${Math.round(totalVentesGraphique / 7).toLocaleString()} FCFA`],
      ['Jour le plus rentable', weeklyData.labels[weeklyData.datasets[0].data.indexOf(Math.max(...weeklyData.datasets[0].data))]],
      [''],
      ['Détails par jour:']
    ];
    
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Résumé");
    
    // Générer le fichier
    const fileName = `ventes_hebdomadaires_${format(currentWeekStart, 'dd-MM-yyyy')}_${format(currentWeekEnd, 'dd-MM-yyyy')}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + ' FCFA';
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const date = new Date(currentWeekStart);
            date.setDate(currentWeekStart.getDate() + context.dataIndex); // 👈 correction ici
            return `${label}: ${value} FCFA (${format(date, 'dd/MM/yyyy', { locale: fr })})`;
          }
        }
      }
    }
  };

  const handleDelete = (id) => {
    setVenteToDelete(id);
    setShowConfirm(true);
  };

  const supprimerVente = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/ventedestroy/${venteToDelete}`);
      setVentes(ventes.filter(vente => vente.id !== venteToDelete));
    } catch (error) {
      console.error("Erreur lors de la suppression de la vente:", error);
      setError("Erreur lors de la suppression");
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
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
          <Navbar />
          <div className="w-0 lg:w-[225px] bg-red"></div>
          
          <div className="flex-1 bg-gray-100 w-full">
            <div className="p-6 space-y-8 min-h-screen">
              <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
                <h1 className="text-xl font-bold">VENTES</h1>
                <div className="flex items-center gap-4">
                  {/* <Link href="#"><Bell size={24} color="#D4AF37" /></Link> */}
                  <Link href="#"><User size={24} color="#D4AF37" /></Link>
                 <span className="font-semibold">{user?.name || 'Admin'}</span>
                </div>
              </div>
  
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
  
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-end">
                <button
                  onClick={goToPreviousWeek}
                  className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <ChevronLeft size={18} />
                  <span>Semaine précédente</span>
                </button>
  
                <button
                  onClick={goToNextWeek}
                  className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <ChevronRight size={18} />
                  <span>Semaine suivante</span>
                </button>
  
                <button
                  onClick={exportToXLSX}
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={18} />
                  <span>Exporter</span>
                </button>
              </div>
  
              {/* Diagramme hebdomadaire
              <div className="bg-white p-4 rounded-lg shadow w-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <BarChart2 className="text-[#D4AF37] mr-2" size={20} />
                    <h3 className="font-semibold">Ventes hebdomadaires</h3>
                  </div>
                  <p className="text-lg text-[#000000]">
                    Semaine du <span className="text-[#B7950B]">{format(currentWeekStart, 'dd/MM/yyyy')}</span> au <span className="text-[#B7950B]">{format(currentWeekEnd, 'dd/MM/yyyy')}</span>
                  </p>
                </div>
                <div className="h-96">
                  <Bar data={weeklyData} options={options} />
                </div>
              </div>
   */}

              {/* Diagramme hebdomadaire amélioré */}
              <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-xl w-full border border-gray-100">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-[#D4AF37] p-2 rounded-lg mr-3">
                      <BarChart2 className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-800">Ventes Hebdomadaires</h3>
                      <p className="text-sm text-gray-500">Performance des ventes sur 7 jours</p>
                    </div>
                  </div>
                  <div className=" bg-gray-100 px-4 py-2 rounded-lg border border-red-500">
                    <p className="text-lg font-semibold  bg-gray-100">
                      Semaine du <span className="text-[#B7950B]">{format(currentWeekStart, 'dd MMM yyyy')}</span> au <span className="text-[#B7950B]">{format(currentWeekEnd, 'dd MMM yyyy')}</span>
                    </p>
                  </div>
                </div>
                <div className="h-96 relative">
                  <Bar 
                    data={weeklyData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                          },
                          ticks: {
                            callback: function(value) {
                              return new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';
                            },
                            font: {
                              weight: '500'
                            }
                          }
                        },
                        x: {
                          grid: {
                            display: false
                          },
                          ticks: {
                            font: {
                              weight: '600'
                            }
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: false
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          titleFont: {
                            size: 14,
                            weight: '600'
                          },
                          bodyFont: {
                            size: 13
                          },
                          padding: 12,
                          cornerRadius: 8,
                          callbacks: {
                            label: function(context) {
                              const label = context.label || '';
                              const value = context.raw || 0;
                              const date = new Date(currentWeekStart);
                              date.setDate(currentWeekStart.getDate() + context.dataIndex);
                              return `${label}: ${new Intl.NumberFormat('fr-FR').format(value)} FCFA (${format(date, 'dd/MM/yyyy', { locale: fr })})`;
                            }
                          }
                        }
                      },
                      elements: {
                        bar: {
                          borderRadius: 6,
                          borderSkipped: false,
                        }
                      },
                      animation: {
                        duration: 1500,
                        easing: 'easeOutQuart'
                      }
                    }} 
                  />
                  
                  {/* Indicateur de chargement ou données vides */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-lg">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
                    </div>
                  )}
                  
                  {!isLoading && weeklyData.datasets[0].data.every(val => val === 0) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-lg">
                      <div className="text-[#D4AF37] mb-2">
                        <BarChart2 size={48} />
                      </div>
                      <p className="text-gray-600 font-medium">Aucune donnée de vente cette semaine</p>
                      <p className="text-gray-500 text-sm">Les ventes apparaîtront ici</p>
                    </div>
                  )}
                </div>
                
                {/* Légende et statistiques résumées */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap gap-4 justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#D4AF37] rounded mr-2"></div>
                      <span className="text-sm font-medium text-gray-700">Chiffre d'affaires quotidien</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Total semaine</p>
                        <p className="font-bold text-gray-800">
                          {new Intl.NumberFormat('fr-FR').format(
                            weeklyData.datasets[0].data.reduce((a, b) => a + b, 0)
                          )} FCFA
                        </p>
                      </div>
   
                      <div className="h-6 w-px bg-gray-200"></div>
                      
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Meilleur jour</p>
                        <p className="font-bold text-gray-800">
                          {weeklyData.labels[weeklyData.datasets[0].data.indexOf(
                            Math.max(...weeklyData.datasets[0].data)
                          )] || '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tableau des ventes */}
              <div className="bg-white shadow rounded overflow-hidden">
                <div className="bg-white shadow overflow-hidden ">
                  <div className="flex justify-between items-center bg-[#D4AF37] text-black font-semibold px-4 py-2">
                            <h2>Liste des ventes</h2>
                            <span className="text-sm bg-black text-white px-2 py-1 rounded-full">
                                {ventes.length} élément(s)
                            </span>
                        </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-black text-white">
                        <tr>
                          <th className="p-3 text-left">ID</th>
                          <th className="p-3 text-left">Client</th>
                          <th className="p-3 text-left"></th>
                          <th className="p-3 text-left">Prix</th>
                          <th className="p-3 text-left">Date Commande</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ventes.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="p-3 text-center">Aucune vente trouvée</td>
                          </tr>
                        ) : (
                          ventes.map((vente) => (
                            <tr key={vente.id} className="border-b hover:bg-gray-50">
                             
                              <td className="p-3">#{vente.id.toString().padStart(3, '0')}</td>
                              <td className="p-3">{vente.client}</td>
                              <td className="p-3">{vente.produits}</td>
                              <td className="p-3">{vente.prix} FCFA</td>
                              <td className="p-3">{new Date(vente.dateCommande).toLocaleDateString()}</td>
                              <td className="p-3">
                                <button
                                  onClick={() => handleDelete(vente.id)}
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
        </div>
  
        {/* Confirmation de suppression */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg z-50">
              <p className="mb-4">Êtes-vous sûr de vouloir supprimer cette vente ?</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                >
                  Annuler
                </button>
                <button
                  onClick={supprimerVente}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
