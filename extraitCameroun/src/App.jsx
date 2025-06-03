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
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GiftSet from './GiftSet';

export default function App() {
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
          </Routes>
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
    
  );
}
