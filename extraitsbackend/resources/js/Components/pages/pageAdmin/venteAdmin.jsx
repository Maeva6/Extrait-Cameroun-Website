import { User, Bell, Box, ShoppingCart, Users, List, BarChart2, PieChart,Download, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function VenteAdmin() {
  // Données pour le diagramme hebdomadaire
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const weeklyData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Ventes (FCFA)',
        data: [120000, 190000, 150000, 200000, 180000, 95000, 140000],
        backgroundColor: '#D4AF37',
        borderRadius: 4
      }
    ]
  };

  // Données pour le diagramme par groupe
  const groupData = {
    labels: ['Parfums', 'Encens', 'Brumes', 'Diffuseurs','diffuseur'],
    datasets: [
      {
        data: [45, 25, 20, 10,9],
        backgroundColor: [
          '#D4AF37',
          '#B7950B',
          '#9C7C00',
          '#806400',
          '#000000'
        ],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full lg:ml-[225px] relative">
      {/* En-tête */}
      <div className="flex items-center justify-between border-b border-yellow-400 pb-2 mb-6">
        <h1 className="text-xl font-bold">VENTES</h1>
        <div className="flex items-center gap-4">
          <Link><Bell size={24} color="#D4AF37"/></Link>
          <Link><User size={24} color="#D4AF37"/></Link>
          <span className="font-semibold">Admin</span>
        </div>
      </div>


      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between w-full mb-12">
              {/* Sélecteurs de date */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Mobile */}
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
                      className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
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
                      className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                      isClearable
                    />
                  </div>
                </div>

                {/* Desktop */}
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
                      className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
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
                      className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                      isClearable
                    />
                  </div>
                </div>
              </div>

              {/* Bouton */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto transition-colors"
                >
                  <Download size={18} />
                  <span>Exporter</span>
                </button>
              </div>
            </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Carte Chiffre d'affaires */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <Box className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">Chiffre d'affaires</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">1,000 FCFA</p>
                </div>

                {/* Carte Commandes */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <List className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">Commandes</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">1,000</p>
                </div>

                {/* Carte Nouveaux clients */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <ShoppingCart className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">Panier moyen</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">1,000</p>
                </div>

                {/* Carte Liste des produits */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <User className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">Clients</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">1,000</p>
                </div>
      </div>

      {/* Section des diagrammes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Diagramme hebdomadaire */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <BarChart2 className="text-[#D4AF37] mr-2" size={20}/>
            <h3 className="font-semibold">Ventes hebdomadaires</h3>
          </div>
          <div className="h-64">
            <Bar 
              data={weeklyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return value/1000 + 'k';
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Diagramme par groupe */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <PieChart className="text-[#D4AF37] mr-2" size={20}/>
            <h3 className="font-semibold">Répartition vente par groupe</h3>
          </div>
          <div className="h-64">
            <Pie
              data={groupData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Tableau des ventes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        
            {/* Tableau des ventes */}
            <div className="bg-white rounded-lg shadow overflow-hidden p-4">
                <h2 className="bg-[#D4AF37] text-black font-semibold px-4 py-2  rounded-t">Liste des ventes</h2>
                
                <div className="overflow-x-auto">
                    <table className="w-full table-auto mt-2">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Client</th>
                                <th className="p-3 text-left">produit</th>
                                <th className="p-3 text-left">Prix</th>
                                <th className="p-3 text-left">Date Commande</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Ligne 1 */}
                            <tr className="border-b hover:bg-gray-50">
                                <td className="p-3">#CMD-01</td>
                                <td className="p-3">Light Yagami</td>
                                <td className="p-3">Parfum Homme</td>
                                <td className="p-3">1500 FCFA</td>
                                <td className="p-3">21/05/2025</td>
                            </tr>
                            
                            {/* Ligne 2 */}
                            <tr className="border-b hover:bg-gray-50">
                                <td className="p-3">#CMD-02</td>
                                <td className="p-3">Light Yagami</td>
                                <td className="p-3">Parfum Homme</td>
                                <td className="p-3">1500 FCFA</td>
                                <td className="p-3">21/05/2025</td>
                            </tr>
                            
                            {/* Ligne 3 */}
                            <tr className="border-b hover:bg-gray-50">
                                <td className="p-3">#CMD-03</td>
                                <td className="p-3">Light Yagami</td>
                                <td className="p-3">Parfum Homme</td>
                                <td className="p-3">1500 FCFA</td>
                                <td className="p-3">21/05/2025</td>
                            </tr>
                            
                            {/* Ligne 4 */}
                            <tr className="hover:bg-gray-50">
                                <td className="p-3">#CMD-04</td>
                                <td className="p-3">Light Yagami</td>
                                <td className="p-3">Parfum Homme</td>
                                <td className="p-3">1500 FCFA</td>
                                <td className="p-3">21/05/2025</td>
                            </tr>

                            {/* Ligne 4 */}
                            <tr className="hover:bg-gray-50">
                                <td className="p-3">#CMD-05</td>
                                <td className="p-3">Light Yagami</td>
                                <td className="p-3">Parfum Homme</td>
                                <td className="p-3">1500 FCFA</td>
                                <td className="p-3">21/05/2025</td>
                            </tr>

                            {/* Ligne 4 */}
                            <tr className="hover:bg-gray-50">
                                <td className="p-3">#CMD-06</td>
                                <td className="p-3">Light Yagami</td>
                                <td className="p-3">Parfum Homme</td>
                                <td className="p-3">1500 FCFA</td>
                                <td className="p-3">21/05/2025</td>
                            </tr>

                            {/* Ligne 4 */}
                            <tr className="hover:bg-gray-50">
                                <td className="p-3">#CMD-07</td>
                                <td className="p-3">Light Yagami</td>
                                <td className="p-3">Parfum Homme</td>
                                <td className="p-3">1500 FCFA</td>
                                <td className="p-3">21/05/2025</td>
                            </tr>

                            {/* Ligne 4 */}
                            <tr className="hover:bg-gray-50">
                                <td className="p-3">#CMD-08</td>
                                <td className="p-3">Light Yagami</td>
                                <td className="p-3">Parfum Homme</td>
                                <td className="p-3">1500 FCFA</td>
                                <td className="p-3">21/05/2025</td>
                            </tr>                            
                        </tbody>
                    </table>
                </div>
            </div>
      </div>
    </div>
  )
}