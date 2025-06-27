import { Bell, User, Search, Plus, Download, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
 
export default function ClientAdmin() {
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('Tous');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);

    const [data, setData] = useState([
        { id: '#PDR-01', name: 'Jean duperit', status: 'Actif', date: '2025-05-21', price: '15' },
        { id: '#PDR-02', name: 'Parlant oui', status: 'Actif', date: '2025-05-21', price: '11' },
        { id: '#PDR-03', name: 'Parlant oui', status: 'Inactif', date: '2025-05-21', price: '10' },
        { id: '#PDR-04', name: 'Parlant oui', status: 'Actif', date: '2025-05-21', price: '1500' },
        { id: '#PDR-05', name: 'Parlant oui', status: 'Inactif', date: '2025-05-21', price: '13' },
    ]);

    const filteredData = data.filter(item => {
        const matchesStatus = status === 'Tous' || item.status === status;
        const itemDate = new Date(item.date);
        const matchesStartDate = !startDate || itemDate >= startDate;
        const matchesEndDate = !endDate || itemDate <= endDate;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             item.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesStartDate && matchesEndDate && matchesSearch;
    });

    const exportToCSV = () => {
        if (filteredData.length === 0) {
            alert("Aucune donnée à exporter !");
            return;
        }

        const headers = ['ID', 'Nom client', 'Date', 'Prix'];
        const csvData = filteredData.map(item => [
            item.id,
            item.name,
            new Date(item.date).toLocaleDateString('fr-FR'),
            item.price
        ]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + csvData.map(row => row.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `clients_export_${new Date().toISOString().slice(0,10)}.csv`);
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
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen w-full lg:ml-[225px]">
            {/* En-tête */}
            <div className="flex items-center justify-between border-b border-yellow-400 pb-2 mb-6">
                <h1 className="text-xl font-bold">CLIENTS</h1>
                <div className="flex items-center gap-4">
                    <Link><Bell size={24} color="#D4AF37"/></Link>
                    <Link><User size={24} color="#D4AF37"/></Link>
                    <span className="font-semibold">Admin</span>
                </div>
            </div>

            {/* Barre de recherche */}
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Rechercher un client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
                <Search
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
            </div>

        {/* Version mobile - inline sur une ligne */}
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
                className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
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
                className="min-w-0 flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                isClearable
                />
            </div>
        </div>


                {/* Version desktop - tout sur une ligne */}
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
                        className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
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
                        className="w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[42px]"
                        isClearable
                    />
                    </div>
                </div>

               <div className="flex flex-col gap-4 mb-6 mt-10">
                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
                    <Link to="/ajouter-client" className="w-full sm:w-auto">
                        <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                            <Plus size={18} />
                            <span>Ajouter un client</span>
                        </button>
                    </Link>

                    <button 
                        onClick={exportToCSV}
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto transition-colors"
                    >
                        <Download size={18} />
                        <span>Exporter</span>
                    </button>
                </div>
            </div>

            {/* Tableau des clients */}
            <div className="bg-white shadow p-4 rounded">
                <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des clients</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto mt-2">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Nom client</th>
                                <th className="p-3 text-left">Date d'inscription</th>
                                <th className="p-3 text-left">Nombre de commandes</th>
                                <th className="p-3 text-left">Statut</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{item.id}</td>
                                    <td 
                                        className="p-3" 
                                        dangerouslySetInnerHTML={{
                                            __html: item.name.replace(
                                                new RegExp(`(${searchTerm})`, 'gi'),
                                                '<span class="font-bold text-[#D4AF37]">$1</span>'
                                            )
                                        }} 
                                    />
                                    <td className="p-3">{new Date(item.date).toLocaleDateString('fr-FR')}</td>
                                    <td className="p-3">{item.price}</td>
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
                        <p className="mb-6">Êtes-vous sûr de vouloir supprimer ce client ?</p>
                        <div className="flex justify-end gap-4">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                            >
                                Annuler
                            </button>
                            <button 
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 "
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>   
    );
}