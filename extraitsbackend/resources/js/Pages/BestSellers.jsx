import React from "react";
import Header from "./Header";
import Footer from "./Footer";
// import { bestSellers } from "./data/Products";
import { products } from "./data/Products"; // ou une fonction pour filtrer
import ProductCard from "./ProductCard"; // à créer si nécessaire

export default function BestSellers() {
  return (
    <div className="font-montserrat">
      <Header />

      <section className="py-10 px-4 md:px-20 bg-white">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-yellow-700 mb-8">
          Nos Meilleures Ventes
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* {bestSellers.map((product) => ( */}
             {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
