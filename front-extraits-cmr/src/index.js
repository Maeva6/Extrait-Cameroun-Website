import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import './Home.css'; // Import de Tailwind + styles locaux

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
