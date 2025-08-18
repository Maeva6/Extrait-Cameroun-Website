
//bodyperfume
return (
    <>
     <div className="min-h-screen flex flex-col">
      <Header />
      <div className="font-montserrat font-bold pt-28 px-6 py-4 bg-gray-50">
        {filteredProducts.length === 0 && (
  <div className="text-center text-yellow-600 font-semibold py-10">
    Aucun produit ne correspond à votre recherche.
  </div>
)}
{/* {categoriesWithResults.length > 0 ? (
  categoriesWithResults.map(category => {
    const productsInCategory = filteredProducts.filter(p => p.categorie?.name === category);
    return (
      <div key={category}>
        <h2>{category}</h2>
        <div className="product-list">
          {productsInCategory.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    );
  })
) : (
  <p>Aucun produit trouvé</p>
)} */}

        {categories.map((category) => {
          const selectedSize = selectedSizes[category] || "";
// const filteredByCategory = products.filter((p) => p.category === category);
// const filteredByCategory = products.filter((p) => p.categorie?.name === category);
const filteredByCategory = filteredProducts.filter((p) => p.categorie?.name === category);

const filtered = filteredByCategory.filter(
  (p) => !selectedSize || p.contenanceProduit === selectedSize
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
  {[...new Set(filteredByCategory.map((p) => p.contenanceProduit))].map((size) => (

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
          key={product.id}
          className="min-w-[150px] sm:min-w-[200px] text-center"
        >
          <Link href={`/product/${product.id}`}>
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
      </div>
      <Footer />
    </>
  );

