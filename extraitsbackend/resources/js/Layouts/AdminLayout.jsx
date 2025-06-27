import React from 'react';
import Navbar from '../Pages/components/navBar'

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-white">
      <Navbar />
      <div className="w-full p-6">
        {children}
      </div>
    </div>
  );
}
