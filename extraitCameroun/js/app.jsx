import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Connexion from "./components/Connexion";
import Home from "./components/Home";

// 👉 Importe ton CartProvider
import { CartProvider } from "./components/contexts/CartContext"; // Assure-toi que le fichier existe à ce chemin

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Connexion />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
