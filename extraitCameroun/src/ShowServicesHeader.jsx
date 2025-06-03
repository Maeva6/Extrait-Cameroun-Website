import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from './assets/icons/logo.svg';

const links = [
  { name: ' Accueil', to: '/Home' },
  { name: 'Gift set for special occasion', to: '/services/gift-set' },
  { name: 'Customized home fragrances', to: '/services/home-fragrances' },
  { name: 'Personalized Candles', to: '/services/candles' },
 
];

export default function ShowServicesHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#f1e7a1] shadow-md relative">
      <div className="font-bold font-montserrat flex items-center justify-between px-4 py-2 relative">
        {/* Logo à gauche */}
         {/* <nav className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`${
              link.name === activeCategory ? "text-white bg-yellow-600 px-3 py-1 rounded" : "text-black"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav> */}
        <div className="flex items-center gap-2 z-10">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <span className="font-semibold text-sm">
            EXTRAITS<span className="text-xs font-light">CAMEROUN</span>
          </span>
        </div>

        {/* Menu centré en desktop */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-6 text-sm font-semibold">
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? 'text-white'
                  : 'text-black hover:underline transition-colors duration-200'
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Bouton mobile à droite */}
        <button
          className="md:hidden text-black text-xl z-10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start px-4 pb-4 gap-2">
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'text-white font-semibold'
                  : 'text-black hover:underline'
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
