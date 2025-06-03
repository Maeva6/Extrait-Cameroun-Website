import { useState } from 'react';
import { Home, Package, ShoppingCart, Users, User, History, FileText, Settings } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> },
  { id: 'produits', label: 'Produits', icon: <Package size={18} /> },
  { id: 'ventes', label: 'Ventes', icon: <ShoppingCart size={18} /> },
  { id: 'employes', label: 'Employes', icon: <Users size={18} /> },
  { id: 'clients', label: 'Clients', icon: <User size={18} /> },
  { id: 'historique', label: 'Historique', icon: <History size={18} /> },
  { id: 'rapports', label: 'Rapports', icon: <FileText size={18} /> },
  { id: 'parametres', label: 'Parametres', icon: <Settings size={18} /> },
];

export default function Navbar() {
  const [active, setActive] = useState('dashboard');

  return (
    <nav className="bg-black text-white h-screen w-56 p-4 flex flex-col items-start shadow-md">
      {/* Logo + Titre */}
      <div className="flex items-center mb-6">
       
        <span className="text-lg font-semibold">Admin Panel</span>
      </div>
      <div className="h-1 bg-yellow-500 w-full mb-8 rounded" />

      {/* Menu items */}
      <ul className="space-y-2 w-full">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActive(item.id)}
              className={`flex items-center w-full px-3 py-2 rounded text-left gap-3 transition-all
                ${active === item.id ? 'bg-yellow-400 text-white font-semibold' : 'hover:bg-gray-800'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
