// components/FloatingCart.jsx
import { useCart } from "../contexts/CartContext";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartIcon from "../assets/icons/cart.svg";

export default function FloatingCart({ fromHeader = false }) {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const cartRef = useRef(null); //détection des clics hors du panier

 //  Fermer si clic à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setOpen(false);
      }
    } 
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const total = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/\D/g, ""));
    return sum + price * item.quantity;
  }, 0);
  const distinctCount = cartItems.length;
  const [animateBadge, setAnimateBadge] = useState(false);

  return (
    <div className={`relative ${fromHeader ? "ml-4" : "fixed top-20 right-4 z-50 font-montserrat md:top-20 md:right-4 top-4 right-2"}`}
      ref={cartRef}>
      <button
        onClick={() => setOpen(!open)}
        //className={`p-0`} // Retrait du cercle gris
      >
        {/* ✅ Icône responsive */}
        <img
          src={CartIcon}
          alt="Panier"
          className="w-5 h-5 object-contain cursor-pointer"
          onMouseEnter={() => setAnimateBadge(true)}
        />
      </button>

      {distinctCount > 0 && (
        // <span
        //   className={`absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full ${
        //     animateBadge ? "animate-bounce-scale" : ""
        //   }`}
        // >
        //   {distinctCount}
        // </span>
        <span
  className={`absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold leading-none px-1.5 py-0.5 rounded-full shadow-md ${
    animateBadge ? "animate-bounce-scale" : ""
  }`}
>
  {distinctCount}
</span>

      )}

      {open && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-[36rem] max-w-[90vw] p-4 max-h-[28rem] overflow-y-auto z-50">
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
                  <li key={item.id} className="flex items-center gap-3 border-b pb-2">
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

