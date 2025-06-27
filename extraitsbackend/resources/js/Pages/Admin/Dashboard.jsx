import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { User, Bell } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import DatePicker from 'react-datepicker';

export default function Dashboard({ user }) {
  const [updates, setUpdates] = useState([]);
  const [stats, setStats] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setUpdates([
      { date: '24/05/2025', user: 'Sophie. M', action: 'Stock réduit', details: 'Parfum réduit de 5 unités' },
      { date: '24/05/2025', user: 'Sophie. M', action: 'Stock réduit', details: 'Parfum réduit de 5 unités' },
      { date: '24/05/2025', user: 'Sophie. M', action: 'Stock réduit', details: 'Parfum réduit de 5 unités' },
    ]);

    setStats([
      { jour: 'Lundi', clients: 10 },
      { jour: 'Mardi', clients: 15 },
      { jour: 'Mercredi', clients: 22 },
      { jour: 'Jeudi', clients: 14 },
      { jour: 'Vendredi', clients: 18 },
      { jour: 'Samedi', clients: 50 },
      { jour: 'Dimanche', clients: 12 },
    ]);
  }, []);

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen w-full lg:ml-[225px]">
      <Head title="Dashboard" />

      {/* Titre */}
      <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
        <h1 className="text-xl font-bold">DASHBOARD</h1>
        <div className="flex items-center gap-4">
          <Link href="#"><Bell size={24} color="#D4AF37" /></Link>
          <Link href="#"><User size={24} color="#D4AF37" /></Link>
          <span className="font-semibold">{user?.name || 'Admin'}</span>
        </div>
      </div>

     {/* Version mobile - inline sur une ligne */}
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


                {/* Version desktop - tout sur une ligne */}
              <div className="hidden sm:flex items-end gap-4">
                    <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-black whitespace-nowrap">De:</label>
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
                    <label className="text-sm font-medium text-black whitespace-nowrap">À:</label>
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

             {/* <div className="flex flex-col gap-4 mb-6 mt-10">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
                    <button 
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto transition-colors"
                    >
                        <Download size={18} />
                        <span>Exporter</span>
                    </button>
                </div>
            </div> */}
          
      {/* Section Mises à jour */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t">Mises à jour produits</h2>
        <table className="w-full table-auto mt-2">
          <thead className="bg-black text-white text-left">
            <tr>
              <th className="p-2">Date/heure</th>
              <th className="p-2">Utilisateur</th>
              <th className="p-2">Action</th>
              <th className="p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {updates.map((u, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{u.date}</td>
                <td className="p-2">{u.user}</td>
                <td className="p-2">{u.action}</td>
                <td className="p-2">{u.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section Graphique */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t">Statistiques hebdomadaires du nombre de clients</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="clients" fill="#D4AF37" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
