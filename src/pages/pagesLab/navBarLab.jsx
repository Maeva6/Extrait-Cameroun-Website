import { useState, useEffect } from 'react';
import { Home, SprayCan, Settings, Cherry,Truck,Sigma } from 'lucide-react';
import logoExtrait from '../../assets/logoExtrait.svg';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', icon: <Home size={18} />, path: '/laboratoire/dashboard' },
  { label: 'Ingredients', icon: <Cherry size={18} />, path: '/laboratoire/ingredients' },
  { label: 'Produits', icon: <SprayCan size={18} />, path: '/laboratoire/produits' },
  { label: 'Fournisseurs', icon: <Truck size={18} />, path: '/laboratoire/fournisseurs' },
  { label: 'Formules', icon: <Sigma size={18} />, path: '/laboratoire/formules' },
  { label: 'Parametres', icon: <Settings size={18} />, path: '/laboratoire/parametres' },
];

export default function NavbarLaboratoir() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [active, setActive] = useState('Dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1024;
      setIsDesktop(newIsDesktop);
      if (newIsDesktop && isOpen) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const renderMenuContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo + titre */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src={logoExtrait} alt="Logo" className="w-10 h-10 mr-2 rounded-full" />
          <span className="text-lg font-semibold">Vendor Panel</span>
        </div>
      </div>
      <div className="h-1 bg-[#D4AF37] w-full mb-8 rounded" />

      {/* Menu items */}
      <ul className="space-y-2 w-full">
        {menuItems.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => {
                setActive(item.label);
                navigate(item.path);
                if (!isDesktop) setIsOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 rounded text-left gap-3 transition-all
                ${active === item.label ? 'bg-[#D4AF37] text-white font-semibold' : 'hover:bg-gray-800'}
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
          className="lg:hidden fixed top-4 left-4 z-50 text-black p-2 bg-white rounded-md shadow-lg"
          aria-label="Ouvrir le menu"
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
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          ></div>
          <nav className="relative bg-black text-white w-64 h-screen p-4 shadow-md z-50">
            {renderMenuContent()}
          </nav>
        </div>
      )}
    </>
  );
}
