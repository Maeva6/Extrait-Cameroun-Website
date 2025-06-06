import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    title: 'Senteurs d’ambiance',
    description: 'Créez une atmosphère chaleureuse et accueillante avec nos diffuseurs et parfums d’intérieur aux essences naturelles.',
    image: 'https://i.imgur.com/r1hFT0a.jpeg',
    link: '/famille/parfums-dambiance',
  },
  {
    title: 'Senteurs corporelles',
    description: 'Laissez votre peau s’imprégner de fragrances envoûtantes, raffinées et conçues pour sublimer votre identité olfactive.',
    image: 'https://i.imgur.com/cKWMwMI.jpeg',
    link: '/famille/parfums-de-corps',
  },
  {
    title: 'Cosmétiques',
    description: 'Prenez soin de votre peau avec notre gamme cosmétique à base d’extraits de ruche et soins hydratants naturels.',
    image: 'https://i.imgur.com/ftmpqSr.jpeg',
    link: '/famille/cosmetiques',
  },
];

const ProductCarousel = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
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
    </section>
  );
};

export default ProductCarousel;
