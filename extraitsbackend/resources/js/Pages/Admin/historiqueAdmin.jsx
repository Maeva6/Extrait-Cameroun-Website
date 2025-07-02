import React, { useState } from "react";
import { Link, usePage } from '@inertiajs/react';
import { Bell, User, Plus, Download, Search, Trash } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/navBar";

export default function Contact() {
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('Tous');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);

  const { props } = usePage();
   const user = props.user;

    const [data, setData] = useState([
        { date: '2025-05-21 08:15', name: 'Jean duperit', status: 'Actif', action: 'Stock réduit', detail: 'Stock réduit de 5 parfum' },
        { date: '2025-05-21 08:15', name: 'Parlant oui', status: 'Actif', action: 'Stock réduit', detail: 'Stock réduit de 5 parfum' },
        { date: '2025-05-21 08:15', name: 'Parlant oui', status: 'Inactif', action: 'Stock réduit', detail: 'Stock réduit de 5 parfum' },
        { date: '2025-05-21 08:15', name: 'Parlant oui', status: 'Actif', action: 'Stock réduit', detail: 'Stock réduit de 5 parfum' },
    ]);

    const filteredData = data.filter(item => {
        const matchesStatus = status === 'Tous' || item.status === status;
        const itemDate = new Date(item.date);
        const matchesStartDate = !startDate || itemDate >= startDate;
        const matchesEndDate = !endDate || itemDate <= endDate;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             item.date.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesStartDate && matchesEndDate && matchesSearch;
    });

    const exportToCSV = () => {
        if (filteredData.length === 0) {
            alert("Aucune donnée à exporter !");
            return;
        }

        const headers = ['ID', 'Nom client', 'Date', 'Prix', 'Statut'];
        const csvData = filteredData.map(item => [
            item.date,
            item.name,
            item.action,
            item.detail,
            item.status
        ]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + csvData.map(row => row.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `historique_export_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = (index) => {
        setClientToDelete(index);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        const newData = [...data];
        newData.splice(clientToDelete, 1);
        setData(newData);
        setShowConfirm(false);
    };

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Espace réservé pour la navbar */}
        <Navbar/>
        <div className="w-0 lg:w-[225px] bg-red"></div>

        {/* Contenu principal */}
        <div className="flex-1 bg-gray-100 w-full">
          <div className="p-6 space-y-8 min-h-screen">
            <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
              <h1 className="text-xl font-bold">HISTORIQUE</h1>
              <div className="flex items-center gap-4">
                <Link href="#"><Bell size={24} color="#D4AF37" /></Link>
                <Link href="#"><User size={24} color="#D4AF37" /></Link>
                <span className="font-semibold">{user?.name || 'Admin'}</span>
              </div>
            </div>

            {/* Barre de recherche */}
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Rechercher l'historique..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
                />
                <Search
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />             
            </div>

                        {/* Filtres et boutons */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                    {/* Filtres */}
                    <div className="grid grid-cols-1 sm:flex gap-4 flex-1">
                        <div className="w-full sm:w-52">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Statut:</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                            >
                                <option value="Tous">Tous</option>
                                <option value="Actif">Actif</option>
                                <option value="Inactif">Inactif</option>
                            </select>
                        </div>

                                      {/* Sélecteurs de date */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Mobile */}
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
                      className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
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
                      className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                      isClearable
                    />
                  </div>
                </div>

                {/* Desktop */}
                <div className="hidden sm:flex items-end gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">De:</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Sélectionner"
                      className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                      isClearable
                    />
                  </div>
                  <div className="flex items-center gap-2">
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
                      className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px] bg-white"
                      isClearable
                    />
                  </div>
                </div>
                 </div>
              
                    </div>

                    {/* Boutons */}
                    <div className="grid grid-cols-1 sm:flex gap-3 w-full sm:w-auto">
                        <button 
                            onClick={exportToCSV}
                            className="w-full sm:w-[150px] bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 h-[42px] transition-colors"
                        >
                            <Download size={18} />
                            <span>Exporter</span>
                        </button>
                    </div>
                </div>

                       {/* Tableau des historiques */}
                       <div className="bg-white shadow p-4 rounded">
                <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des historiques</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto mt-2">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="p-3 text-left">Date/Heure</th>
                                <th className="p-3 text-left">Utisateur</th>
                                <th className="p-3 text-left">Action</th>
                                <th className="p-3 text-left">Details</th>
                                <th className="p-3 text-left">Statut</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{item.date}</td>
                                    <td 
                                        className="p-3" 
                                        dangerouslySetInnerHTML={{
                                            __html: item.name.replace(
                                                new RegExp(`(${searchTerm})`, 'gi'),
                                                '<span class="font-bold text-[#D4AF37]">$1</span>'
                                            )
                                        }} 
                                    />
                                    <td className="p-3">{item.action}</td>
                                    <td className="p-3">{item.detail}</td>
                                    <td className="p-3">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${item.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button 
                                            onClick={() => handleDelete(index)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de confirmation */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Confirmer la suppression</h3>
                        <p className="mb-6">Êtes-vous sûr de vouloir supprimer cet historique ?</p>
                        <div className="flex justify-end gap-4">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                            >
                                Annuler
                            </button>
                            <button 
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
             
          </div>
          
        </div>

        

      </div>
    </div>
  );
}