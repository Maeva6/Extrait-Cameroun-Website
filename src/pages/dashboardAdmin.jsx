import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {User,Bell} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [updates, setUpdates] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Données simulées pour le tableau
    setUpdates([
      {
        date: '24/05/2025',
        user: 'Sophie. M',
        action: 'Stock réduit',
        details: 'Parfum réduit de 5 unités',
      },
      {
        date: '24/05/2025',
        user: 'Sophie. M',
        action: 'Stock réduit',
        details: 'Parfum réduit de 5 unités',
      },
      {
        date: '24/05/2025',
        user: 'Sophie. M',
        action: 'Stock réduit',
        details: 'Parfum réduit de 5 unités',
      },
    ]);

    // Données simulées pour le graphe
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
      {/* Titre */}
      <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
        <h1 className="text-xl font-bold">DASHBOARD</h1>
        <div className="flex items-center gap-4">
          <Link><span className="material-icons"><Bell size={24} color="#D4AF37"/></span></Link>
          <Link><span className="material-icons"> <User size={24} color="#D4AF37"/></span></Link>
          <span className="font-semibold">Admin</span>
        </div>
      </div>

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
