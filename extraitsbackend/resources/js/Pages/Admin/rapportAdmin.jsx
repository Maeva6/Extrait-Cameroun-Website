// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bell, User, Download, HandCoins, ShoppingCart, ShoppingBasket, Package } from 'lucide-react';
// import { Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Navbar from '../components/navBar';
// import { usePage } from '@inertiajs/react';


// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );


// const RapportAdmin = () => {

//    const { props } = usePage();
//       const user = props.user;
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [rapportData, setRapportData] = useState({
//     chiffreAffaires: 0,
//     nombreCommandes: 0,
//     panierMoyen: 0,
//     nombreProduitsVendus: 0,
//   });
//   const [topProduits, setTopProduits] = useState([]);
//   const [ventesParCategorie, setVentesParCategorie] = useState([]);
//   const [detailsVentes, setDetailsVentes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [allData, setAllData] = useState(null);

//   const normalizeDate = (date) => {
//     if (!date) return null;
//     const d = new Date(date);
//     return new Date(d.getFullYear(), d.getMonth(), d.getDate());
//   };

//   const filterDataByDate = () => {
//     if (!allData) return;

//     if (!startDate || !endDate) {
//       setRapportData(allData.rapport);
//       setTopProduits(allData.topProduits);
//       setVentesParCategorie(allData.ventesParCategorie);
//       setDetailsVentes(allData.detailsVentes);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const normalizedStart = normalizeDate(startDate);
//       const normalizedEnd = normalizeDate(endDate);

//       const filteredDetails = allData.detailsVentes.filter(vente => {
//         if (!vente.dateCommande) return false;
//         const venteDate = normalizeDate(new Date(vente.dateCommande));
//         return venteDate >= normalizedStart && venteDate <= normalizedEnd;
//       });

//       const totalCA = filteredDetails.reduce((sum, vente) => sum + (vente.CA || 0), 0);
//       const commandesUniques = [...new Set(filteredDetails.map(v => v.commandeId))].length;
//       const totalProduitsVendus = filteredDetails.reduce((sum, vente) => sum + (vente.quantite || 0), 0);
//       const panierMoyen = commandesUniques > 0 ? totalCA / commandesUniques : 0;

//       setRapportData({
//         chiffreAffaires: totalCA,
//         nombreCommandes: commandesUniques,
//         panierMoyen: panierMoyen,
//         nombreProduitsVendus: totalProduitsVendus
//       });

//       const productMap = {};
//       filteredDetails.forEach(vente => {
//         if (!vente.produit) return;
//         productMap[vente.produit] = (productMap[vente.produit] || 0) + (vente.quantite || 0);
//       });

//       setTopProduits(
//         Object.entries(productMap)
//           .map(([nom, quantite]) => ({ nom, quantite }))
//           .sort((a, b) => b.quantite - a.quantite)
//           .slice(0, 5)
//       );

//       const categoryMap = {};
//       filteredDetails.forEach(vente => {
//         const categorie = vente.categorie || vente.senteur || 'Autre';
//         categoryMap[categorie] = (categoryMap[categorie] || 0) + (vente.quantite || 0);
//       });

//       setVentesParCategorie(
//         Object.entries(categoryMap)
//           .map(([senteur, total_quantite]) => ({ senteur, total_quantite }))
//       );

//       setDetailsVentes(filteredDetails);

//     } catch (error) {
//       console.error('Error filtering data:', error);
//       setError('Erreur lors du filtrage des données');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const [rapportResponse, topProduitsResponse, ventesParCategorieResponse, detailsVentesResponse] = await Promise.all([
//           axios.get('/rapport-data'),
//           axios.get('/top-produits-vendus'),
//           axios.get('/ventes-par-categorie-senteur'),
//           axios.get('/details-ventes')
//         ]);

//         const fullData = {
//           rapport: rapportResponse.data,
//           topProduits: topProduitsResponse.data,
//           ventesParCategorie: ventesParCategorieResponse.data,
//           detailsVentes: detailsVentesResponse.data
//         };
//         setAllData(fullData);

//         setRapportData(rapportResponse.data);
//         setTopProduits(topProduitsResponse.data);
//         setVentesParCategorie(ventesParCategorieResponse.data);
//         setDetailsVentes(detailsVentesResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Erreur lors du chargement des données');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     filterDataByDate();
//   }, [startDate, endDate]);

//   const handleExport = () => {
//     // Fonction pour convertir les données en lignes CSV
//     const convertToCSV = (data, headers) => {
//       return [
//         headers.join(','),
//         ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
//       ].join('\n');
//     };
  
//     // Section 1: Statistiques
//     const statsHeaders = ["Statistique", "Valeur"];
//     const statsData = [
//       { Statistique: "Chiffre d'affaires (FCFA)", Valeur: rapportData.chiffreAffaires },
//       { Statistique: "Commandes", Valeur: rapportData.nombreCommandes },
//       { Statistique: "Panier moyen (FCFA)", Valeur: parseFloat(rapportData.panierMoyen).toFixed(2) },
//       { Statistique: "Quantité de produits vendus", Valeur: rapportData.nombreProduitsVendus }
//     ];
  
//     // Section 2: Détails des ventes
//     const detailsHeaders = ["Produit", "Quantité", "CA (FCFA)", "Date de commande", "Part de marché (%)"];
//     const detailsData = detailsVentes.map(vente => ({
//       "Produit": vente.produit,
//       "Quantité": vente.quantite,
//       "CA (FCFA)": vente.CA,
//       "Date de commande": new Date(vente.dateCommande).toLocaleDateString(),
//       "Part de marché (%)": `${parseFloat(vente.partDeMarche).toFixed(2)}%`
//     }));
  
//     // Section 3: Produits par catégorie
//     const categoryHeaders = ["Catégorie", "Quantité"];
//     const categoryData = ventesParCategorie.map(item => ({
//       "Catégorie": item.senteur,
//       "Quantité": item.total_quantite
//     }));
  
//     // Section 4: Top 5 des produits les plus vendus
//     const topProductsHeaders = ["Produit", "Quantité"];
//     const topProductsData = topProduits.map(item => ({
//       "Produit": item.nom,
//       "Quantité": item.quantite
//     }));
  
//     // Combiner toutes les sections en une seule chaîne CSV
//     const csvContent = [
//       "Statistiques",
//       convertToCSV(statsData, statsHeaders),
//       "\nDétails des ventes",
//       convertToCSV(detailsData, detailsHeaders),
//       "\nProduits par catégorie",
//       convertToCSV(categoryData, categoryHeaders),
//       "\nTop 5 des produits les plus vendus",
//       convertToCSV(topProductsData, topProductsHeaders)
//     ].join('\n');
  
//     // Créer un lien de téléchargement pour le fichier CSV
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.setAttribute('href', url);
//     link.setAttribute('download', `export_ventes_${new Date().toISOString().slice(0, 10)}.csv`);
//     link.style.visibility = 'hidden';
  
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
  
//   const totalCategories = ventesParCategorie.reduce((sum, cat) => sum + cat.total_quantite, 0);
//   const totalProduits = topProduits.reduce((sum, prod) => sum + prod.quantite, 0);

//   const topProductsData = {
//     labels: topProduits.map(produit => produit.nom),
//     datasets: [
//       {
//         label: 'Quantité vendue',
//         data: topProduits.map(produit => produit.quantite),
//         backgroundColor: [
//           'rgba(212, 175, 55, 0.7)',
//           'rgba(54, 162, 235, 0.7)',
//           'rgba(75, 192, 192, 0.7)',
//           'rgba(153, 102, 255, 0.7)',
//           'rgba(255, 159, 64, 0.7)'
//         ],
//         borderColor: [
//           'rgba(212, 175, 55, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)'
//         ],
//         borderWidth: 1
//       }
//     ]
//   };

//   const ventesParCategorieData = {
//     labels: ventesParCategorie.map(item => item.senteur),
//     datasets: [
//       {
//         data: ventesParCategorie.map(item => item.total_quantite),
//         backgroundColor: [
//           'rgba(212, 175, 55, 0.7)',
//           'rgba(54, 162, 235, 0.7)',
//           'rgba(75, 192, 192, 0.7)',
//           'rgba(153, 102, 255, 0.7)',
//           'rgba(255, 159, 64, 0.7)'
//         ],
//         borderColor: [
//           'rgba(212, 175, 55, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)'
//         ],
//         borderWidth: 1
//       }
//     ]
//   };

//   const pieOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'right',
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             const label = context.label || '';
//             const value = context.raw || 0;
//             const percentage = totalCategories > 0
//               ? ((value / totalCategories) * 100).toFixed(2)
//               : '0.00';
//             return `${label}: ${value} (${percentage}%)`;
//           }
//         }
//       }
//     }
//   };

//   const barOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             const label = context.dataset.label || '';
//             const value = context.raw || 0;
//             const percentage = totalProduits > 0
//               ? ((value / totalProduits) * 100).toFixed(2)
//               : '0.00';
//             return `${label}: ${value} (${percentage}%)`;
//           }
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//         {error}
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
//               <h1 className="text-xl font-bold">RAPPORT</h1>
//               <div className="flex items-center gap-4">
//                 <a href="#"><Bell size={24} color="#D4AF37" /></a>
//                 <a href="#"><User size={24} color="#D4AF37" /></a>
//                 <span className="font-semibold">{user?.name || 'Admin'}</span>
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 w-full items-end">
//               <div className="w-full sm:w-auto sm:flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Statut:</label>
//                 <div className="w-full p-2 border border-gray-300 rounded-md h-[42px] bg-white flex items-center">
//                   Vente
//                 </div>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//                 <div className="sm:hidden flex gap-2 w-full">
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">De:</label>
//                     <DatePicker
//                       selected={startDate}
//                       onChange={(date) => setStartDate(date)}
//                       selectsStart
//                       startDate={startDate}
//                       endDate={endDate}
//                       dateFormat="dd/MM/yyyy"
//                       placeholderText="Sélectionner"
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                       isClearable
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">À:</label>
//                     <DatePicker
//                       selected={endDate}
//                       onChange={(date) => setEndDate(date)}
//                       selectsEnd
//                       startDate={startDate}
//                       endDate={endDate}
//                       minDate={startDate}
//                       dateFormat="dd/MM/yyyy"
//                       placeholderText="Sélectionner"
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                       isClearable
//                     />
//                   </div>
//                 </div>
//                 <div className="hidden sm:flex gap-4">
//                   <div className="w-[180px]">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">De:</label>
//                     <DatePicker
//                       selected={startDate}
//                       onChange={(date) => setStartDate(date)}
//                       selectsStart
//                       startDate={startDate}
//                       endDate={endDate}
//                       dateFormat="dd/MM/yyyy"
//                       placeholderText="Sélectionner"
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                       isClearable
//                     />
//                   </div>
//                   <div className="w-[180px]">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">À:</label>
//                     <DatePicker
//                       selected={endDate}
//                       onChange={(date) => setEndDate(date)}
//                       selectsEnd
//                       startDate={startDate}
//                       endDate={endDate}
//                       minDate={startDate}
//                       dateFormat="dd/MM/yyyy"
//                       placeholderText="Sélectionner"
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
//                       isClearable
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <div className="flex items-center">
//                   <HandCoins className="text-[#D4AF37] mr-2" size={20} />
//                   <h3 className="text-gray-500 text-sm">Chiffre d'affaires (FCFA)</h3>
//                 </div>
//                 <p className="mt-2 text-2xl font-bold">{rapportData.chiffreAffaires.toLocaleString()}</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <div className="flex items-center">
//                   <ShoppingCart className="text-[#D4AF37] mr-2" size={20} />
//                   <h3 className="text-gray-500 text-sm">Commandes</h3>
//                 </div>
//                 <p className="mt-2 text-2xl font-bold">{rapportData.nombreCommandes}</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <div className="flex items-center">
//                   <ShoppingBasket className="text-[#D4AF37] mr-2" size={20} />
//                   <h3 className="text-gray-500 text-sm">Panier moyen (FCFA)</h3>
//                 </div>
//                 <p className="mt-2 text-2xl font-bold">{parseFloat(rapportData.panierMoyen).toFixed(2)}</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <div className="flex items-center">
//                   <Package className="text-[#D4AF37] mr-2" size={20} />
//                   <h3 className="text-gray-500 text-sm">Quantité de produits vendus</h3>
//                 </div>
//                 <p className="mt-2 text-2xl font-bold">{rapportData.nombreProduitsVendus}</p>
//               </div>
//             </div>
//             <div className="w-full flex justify-end">
//               <button
//                 onClick={handleExport}
//                 className="w-full sm:w-[150px] bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 h-[42px] transition-colors"
//               >
//                 <Download size={18} />
//                 <span>Exporter</span>
//               </button>
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h2 className="font-semibold">Top 5 des produits les plus vendus</h2>
//                 <div className="h-80">
//                   <Bar
//                     data={topProductsData}
//                     options={barOptions}
//                   />
//                 </div>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h2 className="font-semibold">Ventes par catégorie de senteur</h2>
//                 <div className="h-80">
//                   <Pie
//                     data={ventesParCategorieData}
//                     options={pieOptions}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h2 className="bg-[#D4AF37] text-black font-semibold px-4 py-2 rounded-t">Détails des ventes</h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full table-auto mt-2">
//                   <thead className="bg-black text-white">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs">Produit</th>
//                       <th className="px-6 py-3 text-left text-xs">Quantité</th>
//                       <th className="px-6 py-3 text-left text-xs">CA (FCFA)</th>
//                       <th className="px-6 py-3 text-left text-xs">Date de commande</th>
//                       <th className="px-6 py-3 text-left text-xs">Part de marché (%)</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {detailsVentes.map((vente, index) => (
//                       <tr key={index}>
//                         <td className="px-6 py-4 whitespace-nowrap">{vente.produit}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">{vente.quantite}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">{vente.CA.toLocaleString()}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">{new Date(vente.dateCommande).toLocaleDateString()}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">{parseFloat(vente.partDeMarche).toFixed(2)}%</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RapportAdmin;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, User, Download, HandCoins, ShoppingCart, ShoppingBasket, Package } from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../components/navBar';
import { usePage } from '@inertiajs/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const RapportAdmin = () => {
  const { props } = usePage();
  const user = props.user;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rapportData, setRapportData] = useState({
    chiffreAffaires: 0,
    nombreCommandes: 0,
    panierMoyen: 0,
    nombreProduitsVendus: 0,
  });
  const [topProduits, setTopProduits] = useState([]);
  const [ventesParCategorie, setVentesParCategorie] = useState([]);
  const [detailsVentes, setDetailsVentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState(null);

  const normalizeDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const filterDataByDate = () => {
    if (!allData) return;

    if (!startDate || !endDate) {
      setRapportData(allData.rapport);
      setTopProduits(allData.topProduits);
      setVentesParCategorie(allData.ventesParCategorie);
      setDetailsVentes(allData.detailsVentes);
      return;
    }

    setIsLoading(true);

    try {
      const normalizedStart = normalizeDate(startDate);
      const normalizedEnd = normalizeDate(endDate);
      normalizedEnd.setHours(23, 59, 59, 999);

      // 1. Filtrer par date
      const filteredDetails = allData.detailsVentes.filter(vente => {
        if (!vente.dateCommande) return false;
        const venteDate = new Date(vente.dateCommande);
        return venteDate >= normalizedStart && venteDate <= normalizedEnd;
      });

      // 2. Calculer les métriques principales
      const totalCA = filteredDetails.reduce((sum, vente) => sum + (parseFloat(vente.CA_produit) || 0), 0);
      const commandesUniques = [...new Set(filteredDetails.map(v => v.commandeId))].length;
      const totalProduitsVendus = filteredDetails.reduce((sum, vente) => sum + (parseInt(vente.quantite) || 0), 0);
      const panierMoyen = commandesUniques > 0 ? totalCA / commandesUniques : 0;

      // 3. Préparer les données pour les graphiques
      const productMap = {};
      const categoryMap = {};

      filteredDetails.forEach(vente => {
        // Produits les plus vendus
        if (vente.produit) {
          productMap[vente.produit] = (productMap[vente.produit] || 0) + (parseInt(vente.quantite) || 0);
        }

        // Ventes par catégorie - utiliser la catégorie/senteur si disponible
        const categorie = vente.categorie || vente.senteur || 'Autre';
        categoryMap[categorie] = (categoryMap[categorie] || 0) + (parseInt(vente.quantite) || 0);
      });

      // 4. Mettre à jour tous les états
      const updatedData = {
        rapport: {
          chiffreAffaires: parseFloat(totalCA.toFixed(2)),
          nombreCommandes: commandesUniques,
          panierMoyen: parseFloat(panierMoyen.toFixed(2)),
          nombreProduitsVendus: totalProduitsVendus
        },
        topProduits: Object.entries(productMap)
          .map(([nom, quantite]) => ({ nom, quantite }))
          .sort((a, b) => b.quantite - a.quantite)
          .slice(0, 5),
        ventesParCategorie: Object.entries(categoryMap)
          .map(([senteur, total]) => ({ senteur, total_quantite: total })),
        detailsVentes: filteredDetails.map(v => ({
          ...v,
          CA: parseFloat(v.CA_produit) || 0,
          quantite: parseInt(v.quantite) || 0,
          partDeMarche: totalCA > 0 
            ? parseFloat((parseFloat(v.CA_produit) / totalCA * 100).toFixed(2))
            : 0
        }))
      };

      setRapportData(updatedData.rapport);
      setTopProduits(updatedData.topProduits);
      setVentesParCategorie(updatedData.ventesParCategorie);
      setDetailsVentes(updatedData.detailsVentes);

    } catch (error) {
      console.error('Erreur lors du filtrage:', error);
      setError('Erreur lors du traitement des données');
      
      // Réinitialisation en cas d'erreur
      setRapportData({
        chiffreAffaires: 0,
        nombreCommandes: 0,
        panierMoyen: 0,
        nombreProduitsVendus: 0
      });
      setTopProduits([]);
      setVentesParCategorie([]);
      setDetailsVentes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [rapportResponse, topProduitsResponse, ventesParCategorieResponse, detailsVentesResponse] = await Promise.all([
          axios.get('/rapport-data'),
          axios.get('/top-produits-vendus'),
          axios.get('/ventes-par-categorie-senteur'),
          axios.get('/details-ventes')
        ]);

        const fullData = {
          rapport: rapportResponse.data,
          topProduits: topProduitsResponse.data,
          ventesParCategorie: ventesParCategorieResponse.data,
          detailsVentes: detailsVentesResponse.data
        };
        
        setAllData(fullData);
        setRapportData(rapportResponse.data);
        setTopProduits(topProduitsResponse.data);
        setVentesParCategorie(ventesParCategorieResponse.data);
        setDetailsVentes(detailsVentesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Erreur lors du chargement des données');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterDataByDate();
  }, [startDate, endDate, allData]);

  const handleExport = () => {
    const convertToCSV = (data, headers) => {
      return [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
      ].join('\n');
    };

    // Section 1: Statistiques
    const statsHeaders = ["Statistique", "Valeur"];
    const statsData = [
      { Statistique: "Chiffre d'affaires (FCFA)", Valeur: rapportData.chiffreAffaires },
      { Statistique: "Commandes", Valeur: rapportData.nombreCommandes },
      { Statistique: "Panier moyen (FCFA)", Valeur: parseFloat(rapportData.panierMoyen).toFixed(2) },
      { Statistique: "Quantité de produits vendus", Valeur: rapportData.nombreProduitsVendus }
    ];

    // Section 2: Détails des ventes
    const detailsHeaders = ["Produit", "Quantité", "CA (FCFA)", "Date de commande", "Part de marché (%)"];
    const detailsData = detailsVentes.map(vente => ({
      "Produit": vente.produit,
      "Quantité": vente.quantite,
      "CA (FCFA)": vente.CA,
      "Date de commande": vente.dateCommande ? new Date(vente.dateCommande).toLocaleDateString() : 'N/A',
      "Part de marché (%)": `${parseFloat(vente.partDeMarche).toFixed(2)}%`
    }));

    // Section 3: Produits par catégorie
    const categoryHeaders = ["Catégorie", "Quantité"];
    const categoryData = ventesParCategorie.map(item => ({
      "Catégorie": item.senteur,
      "Quantité": item.total_quantite
    }));

    // Section 4: Top 5 des produits les plus vendus
    const topProductsHeaders = ["Produit", "Quantité"];
    const topProductsData = topProduits.map(item => ({
      "Produit": item.nom,
      "Quantité": item.quantite
    }));

    // Combiner toutes les sections
    const csvContent = [
      "Statistiques",
      convertToCSV(statsData, statsHeaders),
      "\nDétails des ventes",
      convertToCSV(detailsData, detailsHeaders),
      "\nProduits par catégorie",
      convertToCSV(categoryData, categoryHeaders),
      "\nTop 5 des produits les plus vendus",
      convertToCSV(topProductsData, topProductsHeaders)
    ].join('\n');

    // Créer le lien de téléchargement
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `export_ventes_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalCategories = ventesParCategorie.reduce((sum, cat) => sum + cat.total_quantite, 0);
  const totalProduits = topProduits.reduce((sum, prod) => sum + prod.quantite, 0);

  const topProductsData = {
    labels: topProduits.map(produit => produit.nom),
    datasets: [
      {
        label: 'Quantité vendue',
        data: topProduits.map(produit => produit.quantite),
        backgroundColor: [
          'rgba(212, 175, 55, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(212, 175, 55, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const ventesParCategorieData = {
    labels: ventesParCategorie.map(item => item.senteur),
    datasets: [
      {
        data: ventesParCategorie.map(item => item.total_quantite),
        backgroundColor: [
          'rgba(212, 175, 55, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(212, 175, 55, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const categorie = ventesParCategorie[context.dataIndex];
            const percentage = categorie.pourcentage || 0; // Utiliser le pourcentage calculé côté serveur
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const produit = topProduits[context.dataIndex];
            const percentage = produit.pourcentage || 0; // Utiliser le pourcentage calculé côté serveur
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {error}
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
              <h1 className="text-xl font-bold">RAPPORT</h1>
              <div className="flex items-center gap-4">
                <a href="#"><User size={24} color="#D4AF37" /></a>
                <span className="font-semibold">{user?.name || 'Admin'}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full items-end">
              <div className="w-full sm:w-auto sm:flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut:</label>
                <div className="w-full p-2 border border-gray-300 rounded-md h-[42px] bg-white flex items-center">
                  Vente
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="sm:hidden flex gap-2 w-full">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">De:</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Sélectionner"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                      isClearable
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">À:</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Sélectionner"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                      isClearable
                    />
                  </div>
                </div>
                <div className="hidden sm:flex gap-4">
                  <div className="w-[180px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">De:</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Sélectionner"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                      isClearable
                    />
                  </div>
                  <div className="w-[180px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">À:</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Sélectionner"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                      isClearable
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <HandCoins className="text-[#D4AF37] mr-2" size={20} />
                  <h3 className="text-gray-500 text-sm">Chiffre d'affaires (FCFA)</h3>
                </div>
                <p className="mt-2 text-2xl font-bold">{rapportData.chiffreAffaires.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <ShoppingCart className="text-[#D4AF37] mr-2" size={20} />
                  <h3 className="text-gray-500 text-sm">Commandes</h3>
                </div>
                <p className="mt-2 text-2xl font-bold">{rapportData.nombreCommandes}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <ShoppingBasket className="text-[#D4AF37] mr-2" size={20} />
                  <h3 className="text-gray-500 text-sm">Panier moyen (FCFA)</h3>
                </div>
                <p className="mt-2 text-2xl font-bold">{parseFloat(rapportData.panierMoyen).toFixed(2)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <Package className="text-[#D4AF37] mr-2" size={20} />
                  <h3 className="text-gray-500 text-sm">Quantité de produits vendus</h3>
                </div>
                <p className="mt-2 text-2xl font-bold">{rapportData.nombreProduitsVendus}</p>
              </div>
            </div>

            <div className="w-full flex justify-end">
              <button
                onClick={handleExport}
                className="w-full sm:w-[150px] bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 h-[42px] transition-colors"
              >
                <Download size={18} />
                <span>Exporter</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="font-semibold">Top 5 des produits les plus vendus</h2>
                <div className="h-80">
                  <Bar
                    data={topProductsData}
                    options={barOptions}
                  />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="font-semibold">Ventes par catégorie de senteur</h2>
                <div className="h-80">
                  <Pie
                    data={ventesParCategorieData}
                    options={pieOptions}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
              <h2 className="bg-[#D4AF37] text-black font-semibold px-4 py-2 rounded-t">Détails des ventes</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs">Produit</th>
                      <th className="px-6 py-3 text-left text-xs">Quantité</th>
                      <th className="px-6 py-3 text-left text-xs">CA (FCFA)</th>
                      <th className="px-6 py-3 text-left text-xs">Date de commande</th>
                      <th className="px-6 py-3 text-left text-xs">Part de marché (%)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {detailsVentes.map((vente, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{vente.produit}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{vente.quantite}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{vente.CA.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {vente.dateCommande ? new Date(vente.dateCommande).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{parseFloat(vente.partDeMarche).toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RapportAdmin;