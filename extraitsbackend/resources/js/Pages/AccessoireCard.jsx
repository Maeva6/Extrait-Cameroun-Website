import React from "react";
import { Link } from "@inertiajs/react";

export default function AccessoireCard({ product, onVoirPlus }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.015] w-full max-w-[400px] mx-auto flex flex-col">
      <div className="w-full h-[300px] sm:h-[350px] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.nomAccessoire}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col justify-between flex-grow">
        <h2 className="text-yellow-700 font-bold text-xl mb-2">
          {product.nomAccessoire}
        </h2>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        {product.capacite && (
          <p className="text-gray-500 text-sm mb-2">
            Contenance : {product.capacite}
          </p>
        )}
        <p className="text-yellow-600 font-semibold text-lg mb-4">
          {product.prixAccessoire}
        </p>
      <Link href={`/accessoire/${product.slug}`}>
  <button className="cursor-pointer w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors duration-200">
    Voir plus
  </button>
</Link>
</div>

    </div>
  );
}
