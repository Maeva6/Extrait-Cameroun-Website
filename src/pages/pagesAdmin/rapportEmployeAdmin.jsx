import {Bell, ChartColumn, Clock10, CupSoda, User, Download, Trophy, RefreshCcw, Percent} from 'lucide-react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import {useState,useEffect,useRef} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer
  } from 'recharts';
import { useNavigate, useLocation } from 'react-router-dom';
  


export default function RapportEmployeAdmin (){

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

    // Données simulées pour les graphiques
    const barData = [
        { name: 'Sophie M.', ventes: 10 },
        { name: 'John D.', ventes: 20 },
        { name: 'Marie L.', ventes: 30 }
    ];
    
    const radarData = [
        { subject: 'Sophie M.', taux: 20 },
        { subject: 'John D.', taux: 30 },
        { subject: 'Marie L.', taux: 40 }
    ];
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
                        <option value="Employe">Employe</option>
                        <option value="Produits">Produits</option>
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
                        <Trophy className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">Meilleur vendeur</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">Sophie M.</p>
                </div>

                {/* Carte Commandes */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <ChartColumn className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">CA moyen/vendeur</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">1,000</p>
                </div>

                {/* Carte Nouveaux clients */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <Percent className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">Taux de conversion</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">1,000</p>
                </div>

                {/* Carte Liste des produits */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <Clock10  className="text-[#D4AF37] mr-2" size={20}/>
                        <h3 className="text-gray-500 text-sm">Temps de travail</h3>
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

            {/* Histogramme des performances */}
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-md font-semibold mb-4 text-black border-b pb-2 border-black">
      Performance des vendeurs
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="ventes" fill="#D4AF37" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Radar taux de conversion */}
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-md font-semibold mb-4 text-black border-b pb-2 border-black">
      Taux de conversion
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Taux de conversion" dataKey="taux" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  </div>
        </div>
    );

}