// components/FloatingCart.jsx
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import {useEffet} from "react";
import CartIcon from "../assets/icons/cart.svg"; // Vérifie le chemin selon ton projet

export default function FloatingCart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  


  const total = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/\D/g, ""));
    return sum + price * item.quantity;
  }, 0);
  // Calcul du nombre de produits distincts dans le panier
const distinctCount = cartItems.length;
const [animateBadge, setAnimateBadge] = useState(false);
//  useEffect(() => {
//   if (cartItems.length > 0) {
//     setAnimateBadge(true);
//     const timeout = setTimeout(() => setAnimateBadge(false), 300); // Durée = durée de l’animation
//     return () => clearTimeout(timeout);
//   }
// }, [cartItems]);

  return (
    <div className="font-bold font-montserrat fixed top-20 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-yellow-500 p-3 rounded-full shadow-xl hover:bg-yellow-600"
      >
        <img src={CartIcon} alt="Panier" className="w-6 h-6 text-white" />
      </button>
      
 {/* Badge de notification */}
 {distinctCount > 0 && (
  <span
    className={`absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full ${
      animateBadge ? "animate-bounce-scale" : ""
    }`}
  >
    {distinctCount}
  </span>
)}

      {open && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-96 p-4 max-h-[28rem] overflow-y-auto relative">
          {/* Bouton de fermeture en haut à droite */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-3 text-red-500 text-xl font-bold"
          >
            ✕
          </button>

          <h3 className="text-lg font-bold mb-3 text-yellow-600">Panier</h3>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">Votre panier est vide.</p>
          ) : (
            <>
              <ul className="space-y-3">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-2"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex flex-col flex-grow">
                      <p className="font-semibold">
                        {item.name} × {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">{item.size}</p>
                      <p className="text-sm text-yellow-600">{item.price}</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="text-lg bg-gray-200 rounded px-2 hover:bg-gray-300"
                      >
                        +
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="text-lg bg-gray-200 rounded px-2 hover:bg-gray-300"
                      >
                        −
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 text-sm ml-2"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              <div className="border-t mt-3 pt-3 text-right">
                <p className="font-semibold text-yellow-700">
                  Total : {total.toLocaleString()} Fcfa
                </p>
                <button
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => navigate("/checkout")}
                >
                  Commander maintenant
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
