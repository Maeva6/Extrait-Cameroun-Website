import React from 'react';
import ReactDOM from 'react-dom/client';
import './Home.css'; // ✅ Tailwind CSS global
import Home from './Home'; // 🔗 Page d'accueil

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
