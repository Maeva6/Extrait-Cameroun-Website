import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ShowProductHeader from "./ShowProductHeader";
import Footer from "./Footer";

export default function BodyPerfume() {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [categoryPages, setCategoryPages] = useState({});

  const itemsPerPage = 6;

  const products = [
    // [... mêmes produits ...]
    {
      id: 1,
      name: "Black Orchid",
      slug : "black-orchid",
      price: "15000 Fcfa",
      size: "120ml",
      category:"Extrait de parfum",
      imageUrl: "https://i.imgur.com/4q3h9JN.jpeg",
    },
    {
      id: 2,
      name: "Nina red",
      slug: "nina-red",
      price: "15000 Fcfa",
      size: "120ml",
      category:"Extrait de parfum",
      imageUrl: "https://i.imgur.com/aBMWVfV.jpeg",
    },
    {
      id: 3,
      name: "Tobacco Vanilla",
      slug: "tobacco-vanilla",
      price: "15000 Fcfa",
      size: "120ml",
      category:"Extrait de parfum",
      imageUrl: "https://i.imgur.com/fVasoSi.jpeg",
    },
    {
      id: 4,
      name: "Chance eau tendre",
      slug: "chance-eau-tendre",
      price: "15000 Fcfa",
      size: "120ml",
      category:"Extrait de parfum",
      imageUrl: "https://i.imgur.com/SEOKOAe.jpeg",
    },
    {
      id: 5,
      name: "Pink chiffon BBW",
      slug:"pink-chiffon-bbw",
      price: "15000 Fcfa",
      size: "120ml",
      category:"Extrait de parfum",
      imageUrl: "https://i.imgur.com/HwgyhCJ.jpeg",
    },

    
    {
      id: 6,
      name: "L'eau par Kenza",
      slug: "leau-par-kenza",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/Ix0zOol.jpeg",
    },
    {
      id: 7,
      name: "One million",
      slug: "one-million",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/jiz0Ih3.jpeg",
    },
    {
      id: 8,
      name: "Golden Dust",
      slug: "golden-dust",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/BRyWZic.jpeg",
    },
    {
      id: 14,
      name: "Sekushi Nat",
      slug: "sekushi-nat-eau-de-parfum",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/G7VMMms.jpeg",
    },
    {
      id: 15,
      name: "Terre d'Hermes",
      slug:"terre-dhermes-eau-de-parfum",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/sRGcaUJ.jpeg",
    },
    {
      id: 16,
      name: "Invictus",
      slug: "invictus-eau-de-parfum",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/G7VMMms.jpeg",
    },
    {
      id: 17,
      name: "Issey Miyake",
      slug: "issey-miyake-eau-de-parfum",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/7jVBCPr.jpeg",
    },
    {
      id: 18,
      name: "Bad boy carolina herrera",
      slug:"bad-boy-carolina-herrera-eau-de-parfum",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/mcAyI4D.jpeg",
    },
     {
      id: 9,
      name: "La nuit de l'Homme",
      slug:"la-nuit-de-lhomme-eau-de-parfum",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/DsjTCUD.jpeg",
    },
    {
      id: 10,
      name: "Sensual Amber",
      slug:"sensual-amber-body-mist",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/uGykVto.jpeg",
    },
    {
      id: 11,
      name: "Vanilla lace",
      slug:"vanilla-lace-body-mist",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/laqVRGF.jpeg",
    },
    {
      id: 19,
      name: "Amber romance",
      slug:"amber-romance-body-mist",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/kDmpaB1.jpeg",
    },
    {
      id: 20,
      name: "Warm vanilla sugar",
      slug:"warm-vanilla-sugar",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/5oYLMkH.jpeg",
    },
    {
      id: 21,
      name: "Love spell",
      slug:"love-spell",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/h2d5Pby.jpeg",
    },
    {
      id: 26,
      name: "Japanese Cherry Blossom",
      slug:"japanese-cherry-blossom-body-mist",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/Jb6eV93.jpeg",
    },
    {
      id: 27,
      name: "Basil",
      slug:"basil",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/jtRTZGZ.jpeg",
    },
    {
      id: 28,
      name: "Géranium",
      slug:"geranium",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/SSvQxIO.jpeg",
    },
    {
      id: 29,
      name: "Ylang Ylang",
      slug:"ylang-ylang",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/zWhs3cB.jpeg",
    },
    {
      id: 22,
      name: "Spearmint",
      slug:"spearmint",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/5a4jdD0.jpeg",
    },
    {
      id: 23,
      name: "Cedarwood",
      slug: "cedarwood",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/DFRt0U6.jpeg",
    },
    {
      id: 24,
      name: "Ravintsara",
      slug:"ravintsara",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/wVcFcMA.jpeg",
    },
    {
      id: 25,
      name: "Lemongrass",
      slug:"lemongrass",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/oRTbKef.jpeg",
    },
  ];

  const categories = [...new Set(products.map((p) => p.category))];
  const sizes = [...new Set(products.map((p) => p.size))];

  const handlePageChange = (category, direction, totalPages) => {
    setCategoryPages((prev) => {
      const currentPage = prev[category] || 1;
      let newPage = currentPage + direction;
      newPage = Math.max(1, Math.min(newPage, totalPages));
      return { ...prev, [category]: newPage };
    });
  };

// ...

const scrollRefs = useRef({});

const isDraggingRef = useRef(false);
const startXRef = useRef(0);
const scrollLeftRef = useRef(0);

const startDrag = (e, category) => {
  isDraggingRef.current = true;
  startXRef.current = e.pageX - scrollRefs.current[category].offsetLeft;
  scrollLeftRef.current = scrollRefs.current[category].scrollLeft;
};

const onDrag = (e, category) => {
  if (!isDraggingRef.current) return;
  e.preventDefault();
  const x = e.pageX - scrollRefs.current[category].offsetLeft;
  const walk = (x - startXRef.current) * 1.5; // vitesse
  scrollRefs.current[category].scrollLeft = scrollLeftRef.current - walk;
};

const stopDrag = () => {
  isDraggingRef.current = false;
};


  return (
    <>
      <ShowProductHeader />
      <div className="px-6 py-4">
        {categories.map((category) => {
          const selectedSize = selectedSizes[category] || "";
const filteredByCategory = products.filter((p) => p.category === category);
const filtered = filteredByCategory.filter(
  (p) => !selectedSize || p.size === selectedSize
);



          const totalPages = Math.ceil(filtered.length / itemsPerPage);
          const currentPage = categoryPages[category] || 1;

          const paginatedProducts = filtered.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          );

          return (
            <div key={category} className="mb-12">
              <h2 className="text-lg font-bold text-yellow-600 mb-2">
                {category}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <label className="font-medium text-yellow-600">Contenance :</label>
                <select
  value={selectedSizes[category] || ""}
  onChange={(e) =>
    setSelectedSizes((prev) => ({
      ...prev,
      [category]: e.target.value,
    }))
  }
  className="border border-gray-300 rounded px-3 py-1 text-sm"
>
  <option value="">Toutes</option>
  {[...new Set(filteredByCategory.map((p) => p.size))].map((size) => (

    <option key={size} value={size}>
      {size}
    </option>
  ))}
</select>

              </div>

              <div className="flex items-center gap-2">
  <button
    onClick={() => handlePageChange(category, -1, totalPages)}
    className="text-yellow-600 disabled:opacity-30"
    disabled={currentPage === 1}
  >
    <FaChevronLeft size={20} />
  </button>

  <div
    className="overflow-x-auto cursor-grab active:cursor-grabbing flex-1"
    ref={(el) => (scrollRefs.current[category] = el)}
    onMouseDown={(e) => startDrag(e, category)}
    onMouseMove={(e) => onDrag(e, category)}
    onMouseUp={stopDrag}
    onMouseLeave={stopDrag}
  >
    <div className="flex gap-6 w-max pb-4 select-none">
      {paginatedProducts.map((product) => (
        <div
          key={product.slug}
          className="min-w-[150px] sm:min-w-[200px] text-center"
        >
          <Link to={`/product/${product.slug}`}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-[180px] h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
            />
            <h3 className="mt-2 font-semibold text-yellow-600">
              {product.name}
            </h3>
            <p className="text-yellow-600">{product.price}</p>
             <p className="text-yellow-500 text-sm">{product.size}</p> {/* Ajout de la contenance */}
          </Link>
        </div>
      ))}
    </div>
  </div>

  <button
    onClick={() => handlePageChange(category, 1, totalPages)}
    className="text-yellow-600 disabled:opacity-30"
    disabled={currentPage === totalPages}
  >
    <FaChevronRight size={20} />
  </button>
</div>

            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
