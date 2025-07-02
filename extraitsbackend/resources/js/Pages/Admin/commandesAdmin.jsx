import { Link, usePage } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ConfirmDialog from '../reutilisable/popUpSuppressionProduit';
import { useEffect, useState } from 'react';
import {Bell,Download,PiggyBank,ShoppingCart,User,UserPlus, Percent,Search, Trash,ChevronDown,Plus} from 'lucide-react';
import Navbar from '../components/navBar';

export default function commandeAdmin({ user, commandes = [] }) {
   console.log('Commandes reçues :', commandes);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [produitASupprimer, setProduitASupprimer] = useState(null);
  const [valeur, setValeur] = useState('');

  

    // const filteredUpdates = commandes.filter((cmd) =>
    // cmd.nom_client.toLowerCase().includes(searchTerm.toLowerCase()) &&
    // (!valeur || cmd.paiement === valeur)
  // );
  const supprimerProduit = (index) => {
    if (index !== null && index >= 0 && index < commandes.length) {
      commandes.splice(index, 1);
    }
    setShowConfirm(false);
    setProduitASupprimer(null);
  };

  const filteredUpdates = commandes.filter((u) =>
    u.nom_client?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    if (filteredUpdates.length === 0) {
      alert("Aucune donnée à exporter !");
      return;
    }

    const headers = ['ID', 'Nom du client', 'Paiement', 'Montant', 'Etat'];
    const data = filteredUpdates.map(item => [
      item.id,
      item.nom_client,
      item.paiement,
      item.montant,
      item.etat
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + data.map(row => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `commandes_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        <Navbar/>
        <div className="w-0 lg:w-[225px] bg-red"></div>

        <div className="flex-1 bg-gray-100 w-full">
          <div className="p-6 space-y-8 min-h-screen">
            <div className="flex items-center justify-between border-b border-yellow-400 pb-2">
              <h1 className="text-xl font-bold">COMMANDES</h1>
              <div className="flex items-center gap-4">
                <Link href="#"><Bell size={24} color="#D4AF37" /></Link>
                <Link href="#"><User size={24} color="#D4AF37" /></Link>
                <span className="font-semibold">{user?.name || 'Admin'}</span>
              </div>
            </div>

            <div className="relative w-full mb-6">
              <input
                type="text"
                placeholder="Rechercher une commande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent bg-white"
              />
              <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-col gap-4 mb-6 mt-10">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
                <Link href="/formulairecommande/admin" className="w-full sm:w-auto">
                  <button className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full transition-colors">
                    <Plus size={18} />
                    <span>Ajouter une commande</span>
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

            <div className="bg-white shadow p-4 rounded">
              <h2 className="bg-[#D4AF37] text-black font-semibold px-2 py-1 rounded-t w-full">Liste des commandes</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto mt-2">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Nom du client</th>
                      <th className="p-3 text-left">Paiement</th>
                      <th className="p-3 text-left">Montant</th>
                      <th className="p-3 text-left">Etat</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUpdates.map((u, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">{u.id}</td>
                        <td 
                          className="p-3" 
                          dangerouslySetInnerHTML={{
                            __html: u.nom_client.replace(
                              new RegExp(`(${searchTerm})`, 'gi'),
                              '<span class="font-bold text-[#D4AF37]">$1</span>'
                            )
                          }} 
                        />
                        <td className="p-3">{u.paiement}</td>
                        <td className="p-3">{u.montant}</td>
                        <td className="p-3">{u.etat}</td>
                        <td className="p-3">
                          <button 
                            onClick={() => {
                              setProduitASupprimer(index);
                              setShowConfirm(true);
                            }}
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

          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={() => supprimerProduit(produitASupprimer)}
        onCancel={() => setShowConfirm(false)}
        message="Êtes-vous sûr de vouloir supprimer ce produit ?"
      />
    </div>
  );
}
