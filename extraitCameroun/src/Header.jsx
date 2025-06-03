// 📁 src/Header.jsx
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import cartIcon from './assets/icons/cart.svg';
import userIcon from './assets/icons/user.svg';
import menuIcon from './assets/icons/menu.svg';
import closeIcon from './assets/icons/close.svg';
import logo from './assets/icons/logo.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    {
      label: 'Famille',
      sub: [
        { label: 'Parfums de corps', link: '/famille/parfums-de-corps' },
      { label: "Parfums d'ambiance", link: '/famille/parfums-dambiance' },
      { label: 'Cires et gels', link: '/famille/cires-et-gels' },
      { label: 'Accessoires', link: '/famille/accessoires' },
      { label: 'Extraits de ruche', link: '/famille/extraits-de-ruche' },
      { label: 'Body care', link: '/famille/body-care' },
      ],
    },
    {
      label: 'Services',
      sub: [
        { label: 'Gift set for special occasion', link: '/services/gift-set' },
      { label: 'Customized home fragrances', link: '/services/home-fragrances' },
      { label: 'Personnalized Candles', link: '/services/candles' },
      ],
    },
    {
      label: 'Collection',
      sub: [{ label: 'Classiques', link: '/collection/classiques' },
      { label: 'Nouveautés', link: '/collection/nouveautes' },],
    },
    {
      label: 'Notre Histoire',
      link: '/notre-histoire',
    },
  ];

  return (
    <header className=" font-montserrat px-4 py-2 shadow-md bg-white relative z-50">
      {/* Ligne principale */}
      <div className="font-bold font-montserrat flex items-center justify-between gap-4">
        {/* Menu hamburger (mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <img
              src={menuOpen ? closeIcon : menuIcon}
              alt="Menu"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-sm font-semibold">EXTRAITS Cameroun</span>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6 text-sm ml-4">
          {menuItems.map((item, i) => (
            <div key={i} className="group relative cursor-pointer">
              <div className="flex items-center gap-1 hover:underline">
                {item.link ? (
                  <Link to={item.link} className="hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {item.sub && <FaChevronDown className="w-3 h-3" />}
              </div>
              {item.sub && (
                <ul className="absolute hidden group-hover:block bg-white shadow-md mt-1 text-black text-sm py-2 px-4 z-50 min-w-max">
                 {item.sub.map((sublink, j) => (
  <li key={j} className="py-1">
    <Link
      to={sublink.link}
      className="block hover:underline"
      onClick={() => setMenuOpen(false)}
    >
      {sublink.label}
    </Link>
  </li>
))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Recherche + icônes */}
        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Rechercher..."
            className="border px-2 py-1 rounded text-sm w-full md:w-48"
          />
          <img src={userIcon} alt="User" className="w-5 h-5" />
          <img src={cartIcon} alt="Cart" className="w-5 h-5" />
        </div>
      </div>

      {/* Menu Mobile étendu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-white border-t pt-4 w-full">
          {menuItems.map((item, i) => (
            <div key={i} className="mb-2">
              {item.link ? (
                <Link
                  to={item.link}
                  className="block px-4 py-2 text-sm font-medium hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    className="w-full flex justify-between items-center text-left px-4 py-2 text-sm font-medium hover:bg-gray-100"
                    onClick={() =>
                      setOpenDropdown(openDropdown === i ? null : i)
                    }
                  >
                    <span>{item.label}</span>
                    {item.sub && <FaChevronDown className="w-3 h-3" />}
                  </button>
                  {item.sub && openDropdown === i && (
  <ul className="bg-gray-50 pl-6 py-1">
    {item.sub.map((sublink, j) => (
      <li key={j} className="py-1 text-sm">
        <Link
          to={sublink.link}
          className="block hover:underline"
          onClick={() => setMenuOpen(false)}
        >
          {sublink.label}
        </Link>
      </li>
    ))}
  </ul>
)}

                </>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
