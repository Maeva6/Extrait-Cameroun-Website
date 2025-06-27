// 📁 src/About.jsx
import React from 'react';
import Footer from './Footer.jsx';
import { Link } from '@inertiajs/react';
import { FaLeaf, FaPlane } from 'react-icons/fa';
import About1 from './Auth/assets/images/About1.svg';
import About0 from './Auth/assets/images/About0.svg';
import TchadIcon from './Auth/assets/icons/maps/Tchad.svg';
import FranceIcon from './Auth/assets/icons/maps/France.svg';
import USAIcon from './Auth/assets/icons/maps/USA.svg';
import MauriceIcon from './Auth/assets/icons/maps/Maurice.svg';
import CamerounIcon from './Auth/assets/icons/maps/Cameroun.svg';


export default function About() {
   const countries = [
  {
    year: '2016',
    country: 'TCHAD',
    service: "Distribution d'huile de parfum.",
    image: TchadIcon,
  },
  {
    year: '2017',
    country: 'FRANCE',
    service: 'Flirt autour de la parfumerie d’intérieur.',
    image: FranceIcon,
  },
  {
    year: '2018',
    country: 'USA',
    service: 'Production & tests des premiers échantillons de produits.',
    image: USAIcon,
  },
  {
    year: '2019',
    country: 'MAURICE',
    service: 'Exploration de la production d’huile essentielle.',
    image: MauriceIcon,
  },
  {
    year: '2019',
    country: 'CAMEROUN',
    service: 'Distribution des premiers produits EXTRAITS.',
    image: CamerounIcon,
  },
];


  const planeColors = ['text-yellow-500', 'text-yellow-300'];

  return (
    <div className="font-[Montserrat] font-bold text-yellow-600 bg-yellow-50">
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
    <Link href="/dashboard" className="hover:underline">Accueil</Link>
    <Link href="/contact" className="hover:underline">Nous contacter</Link>
  </nav>
</section>


      {/* Présentation */}
      <section className="py-16 px-6 text-center bg-yellow-50">
  <h2 className="text-4xl mb-6 tracking-wide">Présentation</h2>
  <p className="text-yellow-700 max-w-5xl mx-auto text-justify leading-relaxed text-lg">
    Extraits est une marque camerounaise de parfumerie d’intérieur qui se veut être votre partenaire quotidien pour la santé olfactive de tous vos espaces de vie. Nos produits apportent une touche sensorielle, authentique et naturelle dans votre quotidien.
  </p>
</section>


      {/* Historique */}
      <section className="bg-white py-16 px-6 bg-yellow-50">
  <h2 className="text-4xl text-center mb-10">Histoire</h2>
  <p className="text-yellow-700 max-w-5xl mx-auto text-justify leading-relaxed text-lg mb-10">
    Extraits est le fruit de plusieurs voyages à travers le globe. Durant notre phase de recherche, trois continents (Afrique, Amérique & Europe) nous ont accueilli de nombreuses fois. Chaque escale a marqué une étape clé de notre évolution.
  </p>

  <div className="flex justify-center items-center gap-2 mb-6 flex-wrap">
    {Array.from({ length: 40 }).map((_, i) => (
      <FaPlane key={i} className={`${planeColors[i % 2]} w-5 h-5`} />
    ))}
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center px-4">
    {countries.map(({ year, country, service, image }, i) => (
      <div key={i} className="flex flex-col items-center text-center space-y-3 p-4  bg-yellow-80 hover:scale-[1.02] transition">
        <img src={image} alt={country} className="w-20 h-20 object-contain" />
        <p className="text-3xl font-semibold">{year}</p>
        <p className="text-xl">{country}</p>
        <p className="text-sm text-yellow-700">{service}</p>
      </div>
    ))}
  </div>

  <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
    {Array.from({ length: 40 }).map((_, i) => (
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
      <section className="py-16 px-6 text-center bg-yellow-50">
  <h2 className="text-4xl mb-8">Pourquoi nous choisir</h2>
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-yellow-700 text-left">
    <div className="text-6xl font-bold text-center md:text-right md:pr-8">5</div>
    <ul className="space-y-4 text-base leading-relaxed">
      <li><strong>1.</strong> Fabrique artisanale. Parfums faits avec soin et délicatesse.</li>
      <li><strong>2.</strong> Accent porté sur la qualité des matières premières : cires végétales, fragrances et huiles essentielles de très haute qualité.</li>
      <li><strong>3.</strong> Service de personnalisation des produits.</li>
      <li><strong>4.</strong> Toujours à l'écoute des besoins clients.</li>
      <li><strong>5.</strong> Marque 100% camerounaise.</li>
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
