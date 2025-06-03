import { useParams } from "react-router-dom";
import ShowProductHeader from "./ShowProductHeader";
import Footer from "./Footer";
import { useCart } from "./contexts/CartContext";
import { useFavorites } from "./contexts/FavoritesContext";
import { ShoppingCart } from "lucide-react"; // Si tu utilises Lucide ou une autre lib d'icônes
import FloatingCart from "./components/FloatingCart";
import { products } from "./data/Products";



export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const { addToFavorites } = useFavorites();

  if (!product) {
    return <div className="text-center py-20 text-red-600">Produit introuvable</div>;
  }

  return (
    <>
      <ShowProductHeader activeCategory={product.category} />
      <div className="fixed top-24 right-4 z-50">
  <FloatingCart />
</div>
      <div className="font-bold font-montserrat px-4 py-8 max-w-4xl mx-auto text-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mx-auto w-72 h-auto rounded-lg shadow-md mb-6"
        />
        <h2 className="text-yellow-700 font-bold text-xl">{product.category} : {product.name}</h2>
        <p className="text-yellow-600 text-lg">{product.price}</p>
        <p className="text-yellow-600 mb-6">{product.size}</p>

        <p className="font-bold font-montserrat text-sm text-gray-800 leading-relaxed max-w-2xl mx-auto mb-6">
          {product.description}
        </p>
        <p className=" font-bold font-montserrat text-yellow-600 mb-6">{product.utilisation}</p>
        
        <p className="font-bold font-montserrat text-sm text-gray-800 leading-relaxed max-w-xl mx-auto mb-6">
          {product.particularité}
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => addToCart(product)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 shadow flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Ajouter au panier
          </button>
          <button
            onClick={() => addToFavorites(product)}
            className="border border-red-400 text-red-500 px-4 py-2 rounded-full hover:bg-red-50 shadow"
          >
            ❤️ Ajouter au favoris
          </button>
        </div>
      </div>
       
      <Footer />
    </>
  );
}
