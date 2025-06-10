import Navbar from './components/navBar';
import Home from './Home';
import About from './About';
import HomeFragrance from './HomeFragrance';
import BodyPerfume from './BodyPerfume';
import CiresGels from './CiresGels';
import Accessories from './Accessories';
import ExtraitsRuches from './ExtraitsRuches';
import BodyCare from './BodyCare';
import ProductPage from "./ProductPage";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import GiftSet from './GiftSet';
import FragranceQuizStep1 from './FragranceQuizStep1';
import FragranceQuizStep2 from './FragranceQuizStep2';
import FragranceQuizStep3 from './FragranceQuizStep3';
import FloatingCart from './components/FloatingCart';
import { useCartStore } from './store/CartStore';
import FragranceQuizStep2Homme from './FragranceQuizStep2Homme'; // Import pour le choix par parfum homme

export default function App() {

  const isCartOpen = useCartStore((state) => state.isCartOpen); // 👈 État du panier
  //  const location = useLocation();
  // const hideCartIcon = location.pathname === '/some-special-header-page'; // ← ajuste le chemin
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          {/* Tu peux réactiver Navbar ici si besoin */}
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notre-histoire" element={<About />} />
            <Route path="/famille/parfums-de-corps" element={<BodyPerfume />} />
            <Route path="/famille/parfums-dambiance" element={<HomeFragrance />} />
            <Route path="/famille/cires-et-gels" element={<CiresGels />} />
            <Route path="/famille/accessoires" element={<Accessories />} />
            <Route path="/famille/extraits-de-ruche" element={<ExtraitsRuches />} />
            <Route path="/famille/body-care" element={<BodyCare />} />
            {/* <Route path="/product/:id" element={<ProductPage />} /> */}
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/services/gift-set" element={<GiftSet />} />  
            {/*paiement*/}
            {/* <Route path="/checkout" element={<Checkout />} /> */}
            <Route path="/Home" element={<Home />} />
            <Route path="/find-my-fragrance" element={<FragranceQuizStep1 />} />
            <Route path="/quiz/ingredients" element={<FragranceQuizStep2 />} />
            <Route path="/quiz/resultat" element={<FragranceQuizStep3 />} />
            <Route path="/quiz/parfum" element={<FragranceQuizStep2 />} /> {/* pour le choix par parfum */}
          <Route path='/cart' element={<FloatingCart />} />
          <Route path="/fragrance-step2-homme" element={<FragranceQuizStep2Homme />} /> {/* pour le choix par parfum homme */}
          </Routes>

          {/* Panier flottant global */}  
          {isCartOpen && <FloatingCart />}
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
    
  );

}
