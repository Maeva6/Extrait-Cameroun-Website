import {Bell, User, RefreshCcw, Warehouse, ShieldAlert, Star, Download} from 'lucide-react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import {useState,useEffect} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement, 
    LineElement, 
    PointElement,
    Title, 
    Tooltip,
    Legend
} from 'chart.js';
import { useNavigate,useLocation } from 'react-router-dom';

// Enregistrer les composants nécessaires
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

export default function RapportProduitAdmin (){

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

     // Données pour les graphiques
     const stockData = {
        labels: ['Électronique', 'Vêtements', 'Alimentation', 'Cosmétiques'],
        datasets: [{
            label: 'Quantité en stock',
            data: [120, 85, 156, 62],
            backgroundColor: [
                'rgba(212, 175, 55, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ],
            borderColor: [
                'rgba(212, 175, 55, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    const rotationData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'Rotation du stock (unités/mois)',
                data: [65, 59, 80, 81, 56, 72],
                borderColor: 'rgba(212, 175, 55, 1)',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                tension: 0.3,
                fill: true
            },
            {
                label: 'Seuil critique',
                data: [30, 30, 30, 30, 30, 30],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderDash: [5, 5],
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                pointRadius: 0
            }
        ]
    };

    return (

    <div className="p-6 space-y-8 bg-gray-100 min-h-screen w-full lg:ml-[225px]">
        <div className="flex items-center justify-between border-b border-yellow-400 pb-2 mb-6">
            <h1 className="text-xl font-bold">RAPPORT</h1>
            <div className="flex items-center gap-4">
                <Link><Bell size={24} color="#D4AF37"/></Link>
                <Link><User size={24} color="#D4AF37"/></Link>
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
                        <option value="Produits">Produits</option>
                        <option value="Employe">Employe</option>
                        <option value="Vente">Vente</option>
                        <option value="Client">Client</option>
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
                <div className="w-full sm:w-auto">
                                <button 
                                    className="w-full sm:w-[150px] bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 h-[42px] transition-colors"
                                >
                                    <RefreshCcw size={18} />
                                    <span>Actualiser</span>
                                </button>
                </div>

            </div>
                {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Carte Chiffre d'affaires */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <Warehouse className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">En stock</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">1,000 FCFA</p>
                </div>

                {/* Carte Commandes */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <ShieldAlert className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">En rupture de stock</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">1,000</p>
                </div>

                {/* Carte Nouveaux clients */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <RefreshCcw className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">Seuil critique</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">1,000</p>
                </div>

                {/* Carte Liste des produits */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <Star  className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">Nouveaux produits</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">1,000</p>
                </div>
            </div>

            {/* Bouton Exporter */}
            <div className="w-full flex justify-end">
                    <button 
                        className="w-full sm:w-[150px] bg-black hover:bg-black-40 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 h-[42px] transition-colors"
                    >
                        <Download size={18} />
                        <span>Exporter</span>
                    </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> 
                {/* Graphique de rotation des stocks */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Rotation des stocks</h2>
                    <div className="h-80">
                        <Line 
                            data={rotationData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Unités vendues/mois'
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                 {/* Graphique des stocks par catégorie */}
                 <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Stock par catégorie</h2>
                    <div className="h-80">
                        <Bar 
                            data={stockData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Quantité en stock'
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>           
            </div>
            
      {/* Tableau des produits à réapprovisionner */}
      <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Produits à réapprovisionner</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto mt-2">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Produit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Catégorie</th>
                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Stock actuel</th>
                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Seuil minimum</th>
                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">Smartphone X</td>
                                <td className="px-6 py-4 whitespace-nowrap">Électronique</td>
                                <td className="px-6 py-4 whitespace-nowrap">8</td>
                                <td className="px-6 py-4 whitespace-nowrap">15</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        Critique
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">Smartphone X</td>
                                <td className="px-6 py-4 whitespace-nowrap">Électronique</td>
                                <td className="px-6 py-4 whitespace-nowrap">8</td>
                                <td className="px-6 py-4 whitespace-nowrap">15</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        Critique
                                    </span>
                                </td>
                            </tr>
                            {/* Ajoutez d'autres lignes selon vos besoins */}
                        </tbody>
                    </table>
                </div>
            </div>
      
    </div>
    );
}