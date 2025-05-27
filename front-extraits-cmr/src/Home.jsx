import React from 'react';
import { ReactComponent as CartIcon } from './assets/icons/cart.svg';
import { ReactComponent as UserIcon } from './assets/icons/user.svg';
import logo from './assets/logo.svg';
import font from './assets/icons/font.svg';

const App = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 shadow-md">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-sm font-semibold">EXTRAITS Cameroun</span>
        </div>
        <nav className="hidden md:flex gap-4 text-sm">
          <a href="#">Famille</a>
          <a href="#">Services</a>
          <a href="#">Collection</a>
          <a href="#">Notre Histoire</a>
        </nav>
        <div className="flex items-center gap-2">
          <input type="text" placeholder="Rechercher..." className="border px-2 py-1 rounded" />
          <UserIcon className="w-5 h-5" />
          <CartIcon className="w-5 h-5" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <img src={font} alt="Hero" className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-2xl md:text-4xl font-bold">Sentez la différence, Vivez l'élégance.</h1>
          <p className="text-lg mt-2">Nous sélectionnons nos fragrances avec délicatesse...</p>
        </div>
      </section>

      {/* Find Scent */}
      <section className="text-center my-8 px-4">
        <h2 className="text-xl font-semibold mb-2">Find Your Perfect Scent</h2>
        <p className="mb-4 text-sm">Answer a few simple questions to discover your fragrance...</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Find My Fragrance</button>
      </section>

      {/* Product Carousel */}
      <section className="px-4 my-8">
        <h3 className="text-lg font-semibold mb-4">Explore Our Collections</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Repeat as needed */}
          <div className="text-center">
            <img src="https://drive.google.com/uc?export=view&id=ID_IMAGE1" alt="Parfum 1" className="w-full h-32 object-cover mb-2" />
            <p className="text-sm font-medium">Nom du produit</p>
            <p className="text-xs text-gray-600">Référence</p>
          </div>
          {/* ... autres produits */}
        </div>
      </section>

      {/* Accessories */}
      <section className="px-4 my-8">
        <h3 className="text-lg font-semibold mb-4">Discover Our Accessories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Repeat as needed */}
          <img src="https://drive.google.com/uc?export=view&id=ID_ACCESSORY1" alt="Accessoire" className="w-full h-32 object-cover" />
          {/* ... autres accessoires */}
        </div>
      </section>

      {/* Delivery Banner */}
      <section className="bg-yellow-100 py-6 px-4 text-center">
        <h4 className="text-md font-bold mb-2">Où que vous soyez, notre fragrance vous rejoint.</h4>
        <p className="text-sm mb-4">Vous êtes indisponible en ce moment ? Pas de souci...</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Commander maintenant</button>
      </section>

      {/* Promotion Banner */}
      <section className="text-center my-8">
        <img src="https://drive.google.com/uc?export=view&id=ID_PROMO" alt="Promo" className="mx-auto mb-4 w-full max-w-md" />
        <p className="font-semibold mb-2">Rejoignez notre univers parfumé dès maintenant.</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">S'inscrire</button>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-sm px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h5 className="font-semibold mb-2">EXTRAITS</h5>
            <p>L'art du parfum camerounais...</p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Boutique</h5>
            <ul>
              <li>Tous les parfums</li>
              <li>Nouveautés</li>
              <li>Offres spéciales</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Aide</h5>
            <ul>
              <li>Contactez-nous</li>
              <li>Livraison</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Légal</h5>
            <ul>
              <li>Conditions</li>
              <li>Confidentialité</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-6">© 2025 Extraits Cameroun. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default App;
