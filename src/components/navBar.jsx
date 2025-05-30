import { useState, useEffect } from 'react';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  User,
  History,
  FileText,
  Settings,
} from 'lucide-react';
import logoExtrait from '../assets/logoExtrait.svg';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Met à jour automatiquement selon la taille d'écran
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderMenuContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo + titre */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src={logoExtrait} alt="Logo" className="w-10 h-10 mr-2 rounded-full" />
          <span className="text-lg font-semibold">Admin Panel</span>
        </div>
        {!isDesktop && (
          <button onClick={() => setIsOpen(false)} className="text-white text-xl">✕</button>
        )}
      </div>
      <div className="h-1 bg-[#D4AF37] w-full mb-8 rounded" />

      {/* Menu items */}
      <ul className="space-y-2 w-full">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActive(item.id)}
              className={`flex items-center w-full px-3 py-2 rounded text-left gap-3 transition-all
                ${active === item.id ? 'bg-[#D4AF37] text-white font-semibold' : 'hover:bg-gray-800'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* Bouton hamburger (mobile seulement) */}
      {!isDesktop && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 text-black"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Sidebar desktop */}
      {isDesktop && (
        <nav className="bg-black text-white h-screen w-56 p-4 shadow-md fixed left-0 top-0 z-40">
          {renderMenuContent()}
        </nav>
      )}

      {/* Sidebar mobile (overlay) */}
      {!isDesktop && isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fond sombre cliquable pour fermer */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Menu mobile */}
          <nav className="relative bg-black text-white w-64 h-screen p-4 shadow-md z-50">
            {renderMenuContent()}
          </nav>
        </div>
      )}
    </>
  );
}
