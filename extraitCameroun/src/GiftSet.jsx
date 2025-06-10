import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

export default function GiftSet(){
  const navigate = useNavigate();
const categories = [
  {
    title: 'Specials gifts set',
    description: 'Offrez un cadeau unique avec nos ensembles de parfums personnalisés, parfaits pour toutes les occasions.',
    image: 'https://i.imgur.com/p8FSpph.jpeg',
    link: '/services/ensembles-cadeaux',
  },
  {
    title: 'Customized Home fragrance',
    description: 'Personnalisez votre espace avec nos parfums d’ambiance uniques, créés par vous pour évoquer des souvenirs et des émotions.',
    image: 'https://i.imgur.com/DflBjmi.jpeg',
    link: '/services/senteurs-personnalisées',
  },
  {
    title: 'Personalized candles',
    description: 'Découvrez nos bougies parfumées artisanales, conçues par vous pour apporter chaleur et sérénité à votre intérieur.',
    image: 'https://i.imgur.com/oSJElh3.jpeg',
    link: '/services/bougies-personnalisées',
  },
];

//   return (
//     <section className="flex flex-col min-h-screen ">
//     <Header />
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pt-28 my-8">
//         {categories.map((item, index) => (
//           <div
//             key={index}
//             onClick={() => navigate(item.link)}
//             className="relative cursor-pointer group h-[400px] rounded-2xl overflow-hidden shadow-lg"
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4 transition-opacity duration-300 group-hover:bg-opacity-60">
//               <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
//               <p className="text-sm">{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Footer />
//     </section>
//   );
// };
return (
    <section className=" bg-gray-50 min-h-screen flex flex-col">
      <Header />

      {/* Texte d’introduction */}
      <div className="font-bold font-montserrat max-w-4xl mx-auto text-center px-4 pt-32 pb-12">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">Nos Services</h1>
        <p className="text-black text-base">
          Chez <strong>Extraits</strong>, chaque service est pensé pour sublimer votre quotidien à travers des expériences olfactives uniques.
          Que ce soit pour offrir un coffret personnalisé, parfumer votre intérieur ou créer une ambiance sur mesure, notre savoir-faire artisanal
          s’allie à vos envies pour transformer chaque instant en émotion.
          <br />
          <br />
          Découvrez nos services exclusifs, conçus pour répondre à vos besoins les plus subtils avec élégance, soin et authenticité.
        </p>
      </div>

      {/* Grille des services */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-12">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.link)}
            className="relative cursor-pointer group h-[400px] rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4 transition-opacity duration-300 group-hover:bg-opacity-60">
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </section>
  );
}

