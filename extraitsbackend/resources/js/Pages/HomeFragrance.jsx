
import { Link } from "@inertiajs/react";
  import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import { generateSlug } from "./utils/generateSlug";

export default function HomeFragrance() {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [categoryPages, setCategoryPages] = useState({});

  const itemsPerPage = 4;

  const products = [
    // [... mêmes produits ...]
    {
      id: 1,
      name: "Vanille Lemon",
      slug:"vanille-lemon",
      price: "15000 Fcfa",
      size: "120ml",
      category: "Diffuseurs de parfum à tiges aromatiques",
      imageUrl: "https://i.imgur.com/4riXP2u.jpeg",
      ingredients: [
    { name: "Vanille", image: "https://i.imgur.com/mpiJ8gA.jpeg" },
    { name: "Citron", image: "https://i.imgur.com/iRdkexs.jpeg" }
  ],
  olfactoryFamily: "Fruité gourmand",
  limited: true, // ou false
  available: true // ou false
},
    {
      id: 2,
      name: "Twilight",
      slug: "twilight",
      price: "15000 Fcfa",
      size: "120ml",
      category: "Diffuseurs de parfum à tiges aromatiques",
      imageUrl: "https://i.imgur.com/TbstkG0.jpeg",
    },
    {
      id: 3,
      name: "Lavender Bouquet",
      slug: "lavender-bouquet-diffuseurs-de-parfum-a-tiges-aromatiques",
      price: "15000 Fcfa",
      size: "120ml",
      category: "Diffuseurs de parfum à tiges aromatiques",
      imageUrl: "https://i.imgur.com/YyvEELQ.jpeg",
    },
    {
      id: 4,
      name: "Fruits rouges",
      slug:"fruits-rouges-diffuseurs-de-parfum-a-tiges-aromatiques",
      price: "15000 Fcfa",
      size: "120ml",
      category: "Diffuseurs de parfum à tiges aromatiques",
      imageUrl: "https://i.imgur.com/7zsDJks.jpeg",
    },
    {
      id: 4,
      name: "Very Vanilla",
      slug:"very-vanilla",
      price: "15000 Fcfa",
      size: "120ml",
      category: "Diffuseurs de parfum à tiges aromatiques",
      imageUrl: "https://i.imgur.com/6pfGY2e.jpeg",
    },

    
    {
      id: 5,
      name: "Tea Tree",
      slug:"tea-tree",
      price: "3500 Fcfa",
      size: "12ml",
      category: "Huile Essentielles",
      imageUrl: "https://i.imgur.com/SVOE0mI.jpeg",
    },
    {
      id: 6,
      name: "Clove",
      slug: "clove",
      price: "3500 Fcfa",
      size: "12ml",
      category: "Huile Essentielles",
      imageUrl: "https://i.imgur.com/sRLIIEX.jpeg",
    },
    {
      id: 7,
      name: "Patchouli",
      slug: "patchouli",
      price: "3500 Fcfa",
      size: "12ml",
      category: "Huile Essentielles",
      imageUrl: "https://i.imgur.com/nu0pQl2.jpeg",
    },
    
    {
      id: 8,
      name: "Fruits Rouges",
      slug: "fruits-rouges-brume-parfumee",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Brume parfumée",
      imageUrl: "https://i.imgur.com/Aes9NpI.jpeg",
    },
    {
      id: 9,
      name: "Lemon Vanille",
      slug:"lemon-vanille",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Brume parfumée",
      imageUrl: "https://i.imgur.com/BZDxhAq.jpeg",
    },
    {
      id: 10,
      name: "Lavender Bouquet",
      slug:"lavender-bouquet-brume-parfumee",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Brume parfumée",
      imageUrl: "https://i.imgur.com/lodJd7a.jpeg",
    },
    {
      id: 11,
      name: "Car perfume",
      slug:"car-perfume",
      price: "2500 Fcfa",
      size: "8ml",
      category: "Parfum de voiture",
      imageUrl: "https://i.imgur.com/8pJ1gnY.jpeg",
    },
    {
      id: 12,
      name: "Car Diffuseur",
      slug:"car-diffuseur",
      price: "20000 Fcfa",
      size: "coffret",
      category: "Parfum de voiture",
      imageUrl: "https://i.imgur.com/nJlAYj0.jpeg",
    },
    {
      id: 13,
      name: "Car perfume refill",
      slug:"car-perfume-refill",
      price: "5000 Fcfa",
      size: "30ml",
      category: "Parfum de voiture",
      imageUrl: "https://i.imgur.com/mzrSZ8D.jpeg",
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
      <Header />
      <div className="px-6 py-4 pt-28 font-montserrat font-bold">
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
            {/* <img
              src={product.imageUrl}
              alt={product.name}
              className="w-[180px] h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
            />
            <h3 className="mt-2 font-semibold text-yellow-600">
              {product.name}
            </h3>
            <p className="text-yellow-600">{product.price}</p>
             <p className="text-yellow-500 text-sm">{product.size}</p> Ajout de la contenance */}
          <ProductCard product={product} />

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
