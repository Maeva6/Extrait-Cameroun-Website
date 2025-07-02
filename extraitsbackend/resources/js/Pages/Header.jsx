import React, { useState } from 'react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import cartIcon from './Auth/assets/icons/cart.svg';
import userIcon from './Auth/assets/icons/user.svg';
import menuIcon from './Auth/assets/icons/menu.svg';
import closeIcon from './Auth/assets/icons/close.svg';
import logo from './Auth/assets/icons/logo.svg';

import { Link, router, usePage } from '@inertiajs/react';
import { useCartStore } from './store/CartStore';
import FloatingCart from './components/FloatingCart';
import Notifications from './Notifications';

export default function Header() {
  const { url } = usePage();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const menuItems = [
    { label: 'Home', link: '/dashboard' },
    { label: 'Senteurs d\'ambiance', link: '/famille/parfums-dambiance' },
    // { label: "Senteurs corporelles", link: '/famille/parfums-de-corps' },
    { label: "Senteurs corporelles", link: route('body.perfume') },
    { label: 'Cosmétiques', link: '/famille/cosmetiques' },
    { label: 'Accessoires', link: '/famille/accessoires' },
    { label: 'Services', link: '/services/gift-set' },
    { label: 'Notre Histoire', link: '/notre-histoire' },
  ];

  return (
    <header className="font-montserrat font-bold px-4 py-4 shadow-md bg-white fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between gap-4">
        {/* Menu hamburger (mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <img src={menuOpen ? closeIcon : menuIcon} alt="Menu" className="w-6 h-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 object-contain" />
          <span className="text-sm font-semibold">EXTRAITS Cameroun</span>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 text-sm">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className={`transition-colors ${
                url === item.link ? 'text-yellow-500' : 'hover:text-yellow-500'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Recherche & icônes */}
        <div className="flex items-center gap-4">
          <div className="relative w-28 sm:w-40 md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher..."
              title="Recherche"
              className="pl-10 pr-3 py-2 border rounded text-sm sm:text-base w-full"
            />
          </div>

          {/* <Notifications /> */}
         
          <img
            src={userIcon}
            alt="User"
            className="w-5 h-5 cursor-pointer"
            onClick={() => router.visit('/user-dashboard')}
            title="Mon compte"
          />
      <FloatingCart fromHeader />
          
        </div>
      </div>

      {/* Menu mobile étendu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-white border-t pt-4 w-full">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className={`block px-4 py-2 text-sm font-medium ${
                url === item.link ? 'text-yellow-600' : ''
              } hover:bg-gray-100`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
