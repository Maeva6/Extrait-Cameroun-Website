import { Bell, User, RefreshCcw, Users, Heart, Percent, UserPlus, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useState, useRef, useEffect } from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate,useLocation } from 'react-router-dom';

// Enregistrer les composants nécessaires de Chart.js
Chart.register(BarController, BarElement, LinearScale, CategoryScale, PieController, ArcElement, Tooltip, Legend);

export default function RapportClientAdmin() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

     // Synchroniser le statut avec l'URL actuelle
     const [status, setStatus] = useState(() => {
        const path = location.pathname;
        if (path.includes('Produit')) return 'Produits';
        if (path.includes('Employe')) return 'Employe';
        if (path.includes('Client')) return 'Client';
        return 'Vente'; // Par défaut
      });

       // Synchronisation supplémentaire au cas où l'URL change sans rechargement
        useEffect(() => {
          const path = location.pathname;
          if (path.includes('Produit')) setStatus('Produits');
          else if (path.includes('Employe')) setStatus('Employe');
          else if (path.includes('Client')) setStatus('Client');
          else setStatus('Vente');
      }, [location]);
    

      //Gestion des transitions entre les rapports
    const handleStatusChange = (e) => {
        const selectedValue = e.target.value;
        setStatus(selectedValue);
  
        // Redirection en fonction de la valeur sélectionnée
        switch(selectedValue) {
            case 'Vente':
                navigate('/Rapport/Vente');
                break;
            case 'Produits':
                navigate('/Rapport/Produit');
                break;
            case 'Employe':
                navigate('/Rapport/Employe');
                break;
            case 'Client':
                navigate('/Rapport/Client');
                break;
        }
    };

    
    // Références pour les canvas des graphiques
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const barChartInstance = useRef(null);
    const pieChartInstance = useRef(null);

    // Données pour les graphiques
    const clientData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        nouveauxClients: [12, 19, 8, 15, 12, 15],
        clientsFideles: [30, 29, 32, 31, 35, 34]
    };

    const retentionData = {
        labels: ['Retenus', 'Perdus'],
        values: [72, 28],
        backgroundColor: ['#D4AF37', '#E5E7EB']
    };

    // Initialiser les graphiques
    useEffect(() => {
        // Détruire les anciennes instances si elles existent
        if (barChartInstance.current) {
            barChartInstance.current.destroy();
        }
        if (pieChartInstance.current) {
            pieChartInstance.current.destroy();
        }

        // Créer le graphique à barres
        if (barChartRef.current) {
            const ctx = barChartRef.current.getContext('2d');
            barChartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: clientData.labels,
                    datasets: [
                        {
                            label: 'Nouveaux clients',
                            data: clientData.nouveauxClients,
                            backgroundColor: '#D4AF37',
                            borderRadius: 4
                        },
                        {
                            label: 'Clients fidèles',
                            data: clientData.clientsFideles,
                            backgroundColor: '#1F2937',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Créer le graphique circulaire
        if (pieChartRef.current) {
            const ctx = pieChartRef.current.getContext('2d');
            pieChartInstance.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: retentionData.labels,
                    datasets: [{
                        data: retentionData.values,
                        backgroundColor: retentionData.backgroundColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.raw}%`;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Nettoyage lors du démontage du composant
        return () => {
            if (barChartInstance.current) {
                barChartInstance.current.destroy();
            }
            if (pieChartInstance.current) {
                pieChartInstance.current.destroy();
            }
        };
    }, []); // Tableau de dépendances vide pour ne s'exécuter qu'au montage/démontage

    return (
        <div className="p-6 space-y-8 bg-gray-100 min-h-screen w-full lg:ml-[225px]">
            {/* En-tête */}
            <div className="flex items-center justify-between border-b border-yellow-400 pb-2 mb-6">
                <h1 className="text-xl font-bold">RAPPORT</h1>
                <div className="flex items-center gap-4">
                    <Link><Bell size={24} color="#D4AF37" /></Link>
                    <Link><User size={24} color="#D4AF37" /></Link>
                    <span className="font-semibold">Admin</span>
                </div>
            </div>


                     {/* Conteneur principal pour les contrôles de filtre */}
         <div className="flex flex-col sm:flex-row gap-4 w-full items-end">
             {/* Dropdown Statut - prend toute la largeur sur mobile, ajusté sur desktop */}
             <div className="w-full sm:w-auto sm:flex-1">
             <label className="block text-sm font-medium text-gray-700 mb-1">Statut:</label>
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                    >
                        <option value="Client">Client</option>
                        <option value="Produits">Produits</option>
                        <option value="Vente">Vente</option>
                        <option value="Employe">Employe</option>
                    </select>
             </div>

             {/* Conteneur pour les dates */}
             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {/* Version mobile - dates sur la même ligne */}
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
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
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
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                                isClearable
                            />
                        </div>
                    </div>

                    {/* Version desktop */}
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
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
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
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                                isClearable
                            />
                        </div>
                    </div>
                </div>

                {/* Bouton Actualiser */}
                {/* <div className="w-full sm:w-auto">
                                <button 
                                    className="w-full sm:w-[150px] bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 h-[42px] transition-colors"
                                >
                                    <RefreshCcw size={18} />
                                    <span>Actualiser</span>
                                </button>
                </div> */}
         </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Client actif */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <Users className="text-[#D4AF37] mr-2" size={20} />
                        <h3 className="text-gray-500 text-sm">Client actif</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">120</p>
                </div>

                {/* Fidélité moyenne */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <Heart className="text-[#D4AF37] mr-2" size={20} />
                        <h3 className="text-gray-500 text-sm">Fidélité moyenne</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">21 ans</p>
                </div>

                {/* Taux de rétention */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <Percent className="text-[#D4AF37] mr-2" size={20} />
                        <h3 className="text-gray-500 text-sm">Taux de rétention</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">72%</p>
                </div>

                {/* Nouveaux clients */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <UserPlus className="text-[#D4AF37] mr-2" size={20} />
                        <h3 className="text-gray-500 text-sm">Nouveaux clients</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">15</p>
                </div>
            </div>
              {/* Bouton Exporter */}
              <div className="w-full flex justify-end mt-4">
                    <button
                        className="w-full sm:w-[150px] bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 h-[42px] transition-colors"
                    >
                        <Download size={18} />
                        <span>Exporter</span>
                    </button>
                </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Graphique à barres - Nouveaux vs clients fidèles */}
                <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
                    <div className="flex items-center mb-4">
                    <UserPlus className="text-[#D4AF37] mr-2" size={20}/>
                    <h3 className="font-semibold">Nouveaux vs clients fidèles</h3>
                    </div>
                    <div className="h-64">
                        <canvas ref={barChartRef}></canvas>
                    </div>
                </div>

                {/* Graphique circulaire - Taux de rétention */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center mb-4">
                       <Percent className="text-[#D4AF37] mr-2" size={20}/>
                    <h3 className="font-medium">Taux de rétention</h3>
                    </div>
                    <div className="h-64">
                        <canvas ref={pieChartRef}></canvas>
                    </div>
                </div>
            </div>

            {/* Tableau des commandes */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Nombre de commandes</h3>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto mt-2">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-2 text-left ">Client</th>
                                <th className="px-4 py-2 text-left ">CA Total</th>
                                <th className="px-4 py-2 text-left ">Date</th>
                                <th className="px-4 py-2 text-left ">Nombre de commandes</th>
                                <th className="px-4 py-2 text-left ">Panier moyen</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-4 py-2 whitespace-nowrap">Sarah K.</td>
                                <td className="px-4 py-2 whitespace-nowrap">15000 XFA</td>
                                <td className="px-4 py-2 whitespace-nowrap">23/05/2025</td>
                                <td className="px-4 py-2 whitespace-nowrap">25</td>
                                <td className="px-4 py-2 whitespace-nowrap">1500 XFA</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 whitespace-nowrap">Sophie M.</td>
                                <td className="px-4 py-2 whitespace-nowrap">15000 XFA</td>
                                <td className="px-4 py-2 whitespace-nowrap">23/05/2025</td>
                                <td className="px-4 py-2 whitespace-nowrap">25</td>
                                <td className="px-4 py-2 whitespace-nowrap">1500 XFA</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}