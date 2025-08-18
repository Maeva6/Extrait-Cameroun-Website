import React from "react";
import { Link } from "@inertiajs/react";

export default function ProductCard({ product }) {
  console.log(product.ingredients)
  return (
    <div className="bg-yellow-100 rounded-lg shadow-md p-4 w-[250px] flex flex-col items-center relative">
      {!product.estDisponible && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          INDISPONIBLE
        </span>
      )}
      {product.limited && product.estDisponible && (
        <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 rounded uppercase">
          Limited Time
        </span>
      )}

      <img
        src={product.imagePrincipale}
        alt={product.name}
        className="w-[180px] h-[210px] object-contain"
      />

      <h3 className="text-center font-semibold mt-2 text-[#b07643] uppercase">{product.nomProduit}</h3>
      <p className="text-sm text-gray-600">{product.familleOlfactive}</p>
      <p className="text-sm font-semibold text-gray-800 mt-1">{product.prixProduit} FCFA</p>
      <p className="text-sm font-semibold text-gray-800 mt-1">{product.contenanceProduit}</p>

      {/* <div className="flex justify-center gap-3 my-2">
        {product.ingredients?.map((ing) => (
          <div key={ing.id} className="flex flex-col items-center text-xs text-gray-600">
            <img src={ing.imageIngredient} alt={ing.name} 
  className="w-24 h-24 rounded-full border border-gray-300 shadow" />
            <span>{ing.name}</span>
          </div>
        ))}
      </div> */}
   {product.ingredients?.length > 0 && (
  <div className="mt-3 w-full">
    <h4 className="text-xs font-semibold text-gray-700 mb-2">Ingrédients clés :</h4>
    <ul className="flex flex-wrap gap-3">
      {product.ingredients.map((ingredient) => (
        <li key={ingredient.id} className="flex flex-col items-center w-16">
          <img
            src={ingredient.imageIngredient}
            alt={ingredient.nomIngredient}
            className="w-12 h-12 object-cover rounded-full border border-gray-300 shadow-sm"
          />
          <span className="text-[10px] text-center mt-1 text-gray-600">{ingredient.nomIngredient}</span>
        </li>
      ))}
    </ul>
  </div>
)}
      <p className="text-xs text-gray-600 text-center line-clamp-3">
        {product.description}
      </p>

      {/* <Link
        href={`/product/${product.id}`}
        className="mt-3 bg-black text-white text-xs font-bold py-2 px-4 rounded hover:bg-gray-800"
      >
       Voir le produit
      </Link> */}
      <span  className="mt-3 bg-black text-white text-xs font-bold py-2 px-4 rounded hover:bg-gray-800">
  Voir le produit
</span>

    </div>
  );
}
