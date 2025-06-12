import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useCart } from "./contexts/CartContext";
import { useFavorites } from "./contexts/FavoritesContext";
import { ShoppingCart } from "lucide-react";
import { products } from "./data/Products";
import { Heart } from "lucide-react";


export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const { addToFavorites } = useFavorites();
  const navigate = useNavigate();

  if (!product) {
    return <div className="text-center py-20 text-red-600">Produit introuvable</div>;
  }

  return (
    <>
      <Header activeCategory={product.category} />

      <div className="pt-28 px-8 md:px-16 lg:px-24 font-montserrat font-bold bg-white min-h-screen my-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Image colonne gauche */}
          {/* <div className="flex w-full md:w-1/2 sticky top-28 self-start justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full max-w-sm mx-auto md:mx-0 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 will-change-transform"
            />
          </div> */}
          <div className="flex w-full md:w-1/2 sticky top-28 self-start justify-center">
  <div className="bg-amber-800 p-4 rounded-lg">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-full max-w-sm mx-auto md:mx-0 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 will-change-transform"
    />
  </div>
</div>


          {/* Infos colonne droite */}
          <div className="w-full md:w-1/2 space-y-6 overflow-y-auto">
            <h2 className="text-yellow-700 text-2xl">{product.category} : {product.name}</h2>
            <p className="text-yellow-600 text-lg">{product.price}</p>
            <p className="text-yellow-600">{product.size}</p>

            <p className="text-gray-800 text-sm leading-relaxed">
              {product.description}
            </p>

            <p className="text-yellow-600">{product.utilisation}</p>

            <p className="text-gray-800 text-sm leading-relaxed">
              {product.particularité}
            </p>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => addToCart(product)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 shadow flex items-center gap-2"
              >
                <ShoppingCart size={20} />
                Ajouter au panier
              </button>
             <button
  onClick={() => {
    addToFavorites(product);
    setTimeout(() => navigate("/favoris"), 100);
  }}
  className="border border-red-400 text-red-500 px-4 py-2 rounded-full hover:bg-red-50 shadow flex items-center gap-2"
>
  <Heart size={20} fill="currentColor" />
  Ajouter aux favoris
</button>

 

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
