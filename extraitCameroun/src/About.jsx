// 📁 src/About.jsx
import React from 'react';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';
import { FaLeaf, FaPlane } from 'react-icons/fa';
import About1 from './assets/images/About1.svg';
import About0 from './assets/images/About0.svg';

export default function About() {
  const countries = [
    {
      year: '2016',
      country: 'TCHAD',
      service: 'Distribution d huile de parfum.',
      image: 'src/assets/icons/maps/Tchad.svg',
    },
    {
      year: '2017',
      country: 'FRANCE',
      service: 'Flirt autour de la parfumerie d intérieur.',
      image: 'src/assets/icons/maps/France.svg',
    },
    {
      year: '2018',
      country: 'USA',
      service: 'Production & tests des prémiers échantillon de produits d intérieur. Bougies, Diffuseurs.etc',
      image: 'src/assets/icons/maps/USA.svg',
    },
    {
      year: '2019',
      country: 'MAURICE',
      service: 'Exploration de la production d huile essentielles',
      image: 'src/assets/icons/maps/Maurice.svg',
    },
    {
      year: '2019',
      country: 'CAMEROUN',
      service: 'Distribution grand public des premiers produits EXTRAITS de parfumerie d intérieur',
      image: 'src/assets/icons/maps/Cameroun.svg',
    },
  ];

  const planeColors = ['text-yellow-500', 'text-yellow-300'];

  return (
    <div className="font-[Montserrat] font-bold text-yellow-600">
      {/* Bandeau doré avec logo et menu */}
      <section className="relative w-full overflow-hidden">
  <div className="w-full h-[300px] md:h-[500px] relative">
    <img
      src={About0}
      alt="Bandeau"
      className="rounded-lg w-full object-cover"
    />
  </div>
  <nav className="absolute top-4 right-6 flex gap-6 text-sm">
    <Link to="/" className="hover:underline">Accueil</Link>
    <Link to="/contact" className="hover:underline">Nous contacter</Link>
  </nav>
</section>


      {/* Présentation */}
      <section className="py-10 px-4 text-center">
        <h2 className="text-3xl mb-4">Présentation</h2>
        <p className="text-yellow-700 max-w-3xl mx-auto">
          Extraits est une marque camerounaise de parfumerie d’intérieur qui se
veut être votre partenaire quotidien pour la santé olfactive de tous vos
espaces de vie.
        </p>
      </section>

      {/* Historique */}
      <section className="bg-white py-8 px-4">
        <h2 className="text-3xl text-center mb-8">Histoire</h2>
        <p className="text-yellow-700 max-w-3xl mx-auto">
         Extraits est le fruit de plusieurs voyages à travers le globe.
Durant notre phase de recherche, 03 continents (Afrique, Amérique &
Europe) nous ont accueilli de nombreuses fois.
        </p>

        {/* Avions - ligne 1 */}
        <div className="flex justify-center items-center gap-2 mb-4">
          {Array.from({ length: 60 }).map((_, i) => (
            <FaPlane key={i} className={`${planeColors[i % 2]} w-5 h-5`} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-items-center">
          {countries.map(({ year, country, service, image }, i) => (
            // <div key={i} className="w-full flex flex-col items-center text-center space-y-2">
            //   <div>
            //     <p className="text-5xl leading-none">{year}</p>
            //     <p className="text-lg mt-2">{country}</p>
            //     <p className="text-sm text-yellow-700 mt-1">{service}</p>
            //   </div>
            //   <img
            //     src={image}
            //     alt={country}
            //     className="w-24 h-24 object-contain"
            //   />
            // </div>
            <div
  key={i}
  className="w-full flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-6"
>
  <div className="max-w-[12rem] text-center md:text-left">
    <p className="text-5xl leading-none">{year}</p>
    <p className="text-lg mt-2">{country}</p>
    <p className="text-sm text-yellow-700 mt-1 break-words">{service}</p>
  </div>
  <img
    src={image}
    alt={country}
    className="w-24 h-24 object-contain transition-transform duration-300 hover:scale-110"
  />
</div>

          ))}
        </div>

        {/* Avions - ligne 2 */}
        <div className="flex justify-center items-center gap-2 my-4">
          {Array.from({ length: 60 }).map((_, i) => (
            <FaPlane key={i} className={`${planeColors[i % 2]} w-5 h-5`} />
          ))}
        </div>

        {/* Avions - ligne 3 (centré bas) */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length:6 }).map((_, i) => (
            <FaPlane key={i} className={`${planeColors[i % 2]} w-5 h-5`} />
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-10 px-4 text-center">
        <h2 className="text-3xl mb-4">Mission</h2>
        <p className="text-yellow-700 max-w-3xl mx-auto">
          Apporter une dimension sensorielle à votre bien être au quotidien.
        </p>
      </section>

      {/* Image décorative avec citation */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto relative">
          <img
            src={About1}
            alt="Atmosphère"
            className="rounded-lg w-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded text-sm">
            Changez votre atmosphère d’intérieur en un claquement de doigts !
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-10 px-4 text-center">
        <h2 className="text-3xl mb-6">Pourquoi nous choisir</h2>
        <div className="max-w-4xl mx-auto text-yellow-700">
          <p className="text-5xl font-bold mb-4">5</p>
          <ul className="space-y-2 text-sm">
            <li>1-  Fabrique artisanale. Parfums faits avec soin et délicatesse.</li>
            <li>2-  Accent porté sur la qualité des matières premières : Cires végétale, fragrances et huile essentielles de très haute qualité.</li>
            <li>3-  Service de personalisation des prduits.</li>
            <li>4-  Toujours à l'écoute des besoins clients.</li>
            <li>5-  Marque 100% camerounaise.</li>
          </ul>
        </div>
      </section>

      {/* Coordonnées (à droite en bas) */}
      <section className="px-4 py-6 flex justify-end">
        <div className="text-right text-sm text-yellow-700">
          <p>EXTRAITS CAMEROUN</p>
          <p>Tél : (+237) 699 273 209</p>
          <p>Email : extraits1104@gmail.com</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
