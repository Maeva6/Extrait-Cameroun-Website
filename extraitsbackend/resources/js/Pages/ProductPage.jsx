import { usePage, router } from "@inertiajs/react";
import Header from "./Header";
import Footer from "./Footer";
// import { useCart } from "./contexts/CartContext";
import { useCartStore } from "./store/CartStore";
// import { useFavorites } from "./contexts/FavoritesContext";
import { useFavoritesStore } from "./store/FavoriteStore";
import { ShoppingCart, Heart } from "lucide-react";

export default function ProductPage() {
  const { props } = usePage();
  const product = props.product;

  const  addToCart  = useCartStore((state) => state.addToCart);
  const  addToFavorites  = useFavoritesStore((state) => state.addToFavorites);

  if (!product) {
    return <div className="text-center py-20 text-red-600">Produit introuvable</div>;
  }

  return (
    <>
      <Header activeCategory={product?.categorie?.name || ""} />

      <div className="pt-28 px-8 md:px-16 lg:px-24 font-montserrat font-bold bg-white min-h-screen my-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="flex w-full md:w-1/2 sticky top-28 self-start justify-center">
            <div className="bg-amber-800 p-4 rounded-lg">
              <img
                src={product.imagePrincipale}
                alt={product.nomProduit}
                className="w-full max-w-sm mx-auto md:mx-0 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6 overflow-y-auto">
            <h2 className="text-yellow-700 text-2xl">
              {product.categorie?.name || "Catégorie"} : {product.nomProduit}
            </h2>
            <p className="text-yellow-600 text-lg">{product.prixProduit} Fcfa</p>
            <p className="text-yellow-600">{product.contenanceProduit}</p>

            <p className="text-gray-800 text-sm leading-relaxed">
              {product.descriptionProduit}
            </p>

            {product.modeUtilisation && (
              <p className="text-yellow-600">{product.modeUtilisation}</p>
            )}

            {product.particularite && (
              <p className="text-gray-800 text-sm leading-relaxed">{product.particularite}</p>
            )}

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => addToCart({
  id: product.id,
  name: product.nomProduit,
  price: product.prixProduit?.toString() ?? "0",
  imageUrl: product.imagePrincipale,
  size: product.contenanceProduit,
  quantity: 1,
})}

                className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 shadow flex items-center gap-2"
              >
                <ShoppingCart size={20} />
                Ajouter au panier
              </button>
              <button
                // onClick={() => {
                //   addToFavorites(product);
                //   setTimeout(() => router.visit("/mes-favoris"), 100);
                // }}
                onClick={() => {
  router.post('/favorites', { produit_id: product.id }, {
    onSuccess: () => router.visit('/mes-favoris'),
    onError: () => alert("Erreur lors de l'ajout aux favoris"),
  });
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
