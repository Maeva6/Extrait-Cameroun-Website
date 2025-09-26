// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { usePage, Link } from '@inertiajs/react';
// import { Bell, User } from 'lucide-react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
// } from 'recharts';
// import Navbar from "../components/navBar";

// export default function Contact({user}) {


//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [updates, setUpdates] = useState([]);
//   const [stats, setStats] = useState([]);

//   useEffect(() => {
//     setUpdates([
//       { date: '24/05/2025', user: 'Sophie. M', action: 'Stock réduit', details: 'Parfum réduit de 5 unités' },
//       { date: '24/05/2025', user: 'Sophie. M', action: 'Stock réduit', details: 'Parfum réduit de 5 unités' },
//       { date: '24/05/2025', user: 'Sophie. M', action: 'Stock réduit', details: 'Parfum réduit de 5 unités' },
//     ]);
//   }, []);

//   useEffect(() => {
//     axios.get('/admin/client-stats')
//       .then(response => setStats(response.data))
//       .catch(error => console.error("Erreur lors du chargement des stats clients :", error));
//   }, []);

//   return (
//     <div className="min-h-screen">
//       <div className="flex">
//         <Navbar />
//         <div className="w-0 lg:w-[225px] bg-red"></div>
//         <div className="flex-1 bg-gray-100 w-full">
//           <div className="p-6 space-y-8 min-h-screen">
//             {/* Header */}
//             <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
//               <h1 className="text-xl font-bold">DASHBOARD</h1>
//               <div className="flex items-center gap-4">
//                 <Link href="#"><Bell size={24} color="#D4AF37" /></Link>
//                 <Link href="#"><User size={24} color="#D4AF37" /></Link>
//                 <span className="font-semibold">{user?.name || 'Admin'}</span>
//               </div>
//             </div>

//             {/* Date pickers responsive */}
//             <div className="sm:hidden w-full overflow-x-auto">
//               <div className="flex items-center gap-2 w-full min-w-0">
//                 <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
//                 <DatePicker
//                   selected={startDate}
//                   onChange={(date) => setStartDate(date)}
//                   selectsStart
//                   startDate={startDate}
//                   endDate={endDate}
//                   dateFormat="dd/MM/yyyy"
//                   placeholderText="Sélectionner"
//                   className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md h-[42px] bg-white"
//                   isClearable
//                 />
//                 <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
//                 <DatePicker
//                   selected={endDate}
//                   onChange={(date) => setEndDate(date)}
//                   selectsEnd
//                   startDate={startDate}
//                   endDate={endDate}
//                   minDate={startDate}
//                   dateFormat="dd/MM/yyyy"
//                   placeholderText="Sélectionner"
//                   className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md h-[42px] bg-white"
//                   isClearable
//                 />
//               </div>
//             </div>

//             {/* Date pickers desktop */}
//             <div className="hidden sm:flex items-end gap-4">
//               <div className="flex items-center gap-2">
//                 <label className="text-sm font-medium text-black whitespace-nowrap">De:</label>
//                 <DatePicker
//                   selected={startDate}
//                   onChange={(date) => setStartDate(date)}
//                   selectsStart
//                   startDate={startDate}
//                   endDate={endDate}
//                   dateFormat="dd/MM/yyyy"
//                   placeholderText="Sélectionner"
//                   className="w-40 p-2 border border-gray-300 rounded-md h-[42px] bg-white"
//                   isClearable
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="text-sm font-medium text-black whitespace-nowrap">À:</label>
//                 <DatePicker
//                   selected={endDate}
//                   onChange={(date) => setEndDate(date)}
//                   selectsEnd
//                   startDate={startDate}
//                   endDate={endDate}
//                   minDate={startDate}
//                   dateFormat="dd/MM/yyyy"
//                   placeholderText="Sélectionner"
//                   className="w-40 p-2 border border-gray-300 rounded-md h-[42px] bg-white"
//                   isClearable
//                 />
//               </div>
//             </div>

//             {/* Mises à jour produits */}
//             <div className="bg-white shadow p-4 rounded">
//               <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t">Mises à jour produits</h2>
//               <table className="w-full table-auto mt-2">
//                 <thead className="bg-black text-white text-left">
//                   <tr>
//                     <th className="p-2">Date/heure</th>
//                     <th className="p-2">Utilisateur</th>
//                     <th className="p-2">Action</th>
//                     <th className="p-2">Détails</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {updates.map((u, index) => (
//                     <tr key={index} className="border-b">
//                       <td className="p-2">{u.date}</td>
//                       <td className="p-2">{u.user}</td>
//                       <td className="p-2">{u.action}</td>
//                       <td className="p-2">{u.details}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Graphique dynamique */}
//             <div className="bg-white shadow p-4 rounded">
//               <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t">
//                 Statistiques hebdomadaires du nombre de clients
//               </h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="jour" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="clients" fill="#D4AF37" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { usePage, Link } from '@inertiajs/react';
import { Bell, User } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Navbar from "../components/navBar";

export default function Contact({user}) {


  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setUpdates([
      { date: '24/05/2025', user: 'Sophie. M', action: 'Stock réduit', details: 'Parfum réduit de 2 unités' },
      { date: '24/05/2025', user: 'Sophie. M', action: 'Stock réduit', details: 'Parfum réduit de 5 unités' },
      { date: '24/05/2025', user: 'Sophie. M', action: 'Stock réduit', details: 'Parfum réduit de 5 unités' },
    ]);
  }, []);

  useEffect(() => {
    axios.get('/admin/client-stats')
      .then(response => setStats(response.data))
      .catch(error => console.error("Erreur lors du chargement des stats clients :", error));
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex">
        <Navbar />
        <div className="w-0 lg:w-[225px] bg-red"></div>
        <div className="flex-1 bg-gray-100 w-full">
          <div className="p-6 space-y-8 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
              <h1 className="text-xl font-bold">DASHBOARD</h1>
              <div className="flex items-center gap-4">
                {/* <Link href="#"><Bell size={24} color="#D4AF37" /></Link> */}
                <Link href="#"><User size={24} color="#D4AF37" /></Link>
                <span className="font-semibold">{user?.name || 'Admin'}</span>
              </div>
            </div>

            {/* Date pickers responsive */}
            <div className="sm:hidden w-full overflow-x-auto">
              <div className="flex items-center gap-2 w-full min-w-0">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Sélectionner"
                  className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md h-[42px] bg-white"
                  isClearable
                />
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">À:</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Sélectionner"
                  className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md h-[42px] bg-white"
                  isClearable
                />
              </div>
            </div>

            {/* Date pickers desktop */}
            <div className="hidden sm:flex items-end gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-black whitespace-nowrap">De:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Sélectionner"
                  className="w-40 p-2 border border-gray-300 rounded-md h-[42px] bg-white"
                  isClearable
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-black whitespace-nowrap">À:</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Sélectionner"
                  className="w-40 p-2 border border-gray-300 rounded-md h-[42px] bg-white"
                  isClearable
                />
              </div>
            </div>

            {/* Graphique dynamique */}
            <div className="bg-white shadow rounded ">
              <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t">
                Statistiques hebdomadaires du nombre de clients
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="jour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clients" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
