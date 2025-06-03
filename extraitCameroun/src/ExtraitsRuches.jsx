
import { Link } from "react-router-dom";
  import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ShowProductHeader from "./ShowProductHeader";
import Footer from "./Footer";

export default function ExtraitsRuches() {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [categoryPages, setCategoryPages] = useState({});

  const itemsPerPage = 4;

  const products = [
    // [... mêmes produits ...]
    {
      id: 1,
      name: "BEESWAX Lip Balm",
      slug: "beeswax-lip-balm",
      price: "1000 Fcfa",
      size: "5g",
      category: "Tube lip balm",
      imageUrl: "https://i.imgur.com/dwsPUxE.jpeg",
    },
    {
      id: 2,
      name: "BEESWAX Lip Balm",
      slug: "beeswax-lip-balm",
      price: "1000 Fcfa",
      size: "5g",
      category: "Tube lip balm",
      imageUrl: "https://i.imgur.com/fReUPEB.jpeg",
    },
    {
      id: 3,
      name: "BEESWAX Lip Balm",
      slug: "beeswax-lip-balm",
      price: "1000 Fcfa",
      size: "5g",
      category: "Tube lip balm",
      imageUrl: "https://i.imgur.com/eyLEIDY.jpeg",
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
              className="w-[300px] h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
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
