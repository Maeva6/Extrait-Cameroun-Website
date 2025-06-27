import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  User, ChevronDown, ChevronUp, Lock, Unlock,
  CreditCard, Users, Package, FileText, Settings, AlertCircle, UserCircle, Search, Home, ShoppingCart, History,
  SprayCan, Truck, Sigma, Bell
} from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { Link } from 'react-router-dom';

const availablePages = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={16} /> },
  { id: 'commandes', label: 'Commandes', icon: <ShoppingCart size={16} /> },
  { id: 'ventes', label: 'Ventes', icon: <CreditCard size={16} /> },
  { id: 'clients', label: 'Clients', icon: <User size={16} /> },
  { id: 'employe', label: 'Employe', icon: <Users size={16} /> },
  { id: 'produits', label: 'Produits', icon: <Package size={16} /> },
  { id: 'Historique', label: 'Historique', icon: <History size={16} /> },
  { id: 'rapports', label: 'Rapports', icon: <FileText size={16} /> },
  { id: 'Acces Utilisateur', label: 'Acces Utilisateur', icon: <Settings size={16} /> },
  { id: 'Ingredient', label: 'Ingredient', icon: <SprayCan size={16} /> },
  { id: 'Fournisseur', label: 'Fournisseur', icon: <Truck size={16} /> },
  { id: 'Formule', label: 'Formule', icon: <Sigma size={16} /> },
];

export default function ParametreAdmin() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const togglePermission = (userId, pageId) => {
    setPendingAction({ userId, pageId });
    setConfirmOpen(true);
  };

  const confirmToggle = () => {
    const { userId, pageId } = pendingAction;
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          permissions: user.permissions.includes(pageId)
            ? user.permissions.filter(p => p !== pageId)
            : [...user.permissions, pageId],
        };
      }
      return user;
    }));
    setConfirmOpen(false);
  };

  return (
    <div className="p-6 bg-[#F3F4F6] min-h-screen w-full lg:ml-[225px]">
      <div className="flex items-center justify-between border-b border-yellow-400 pb-2 mb-6">
        <h1 className="text-xl font-bold">ACCES UTILISATEUR</h1>
        <div className="flex items-center gap-4">
          <Link to="/notifications"><Bell size={24} color="#D4AF37" /></Link>
          <Link to="/profile"><User size={24} color="#D4AF37" /></Link>
          <span className="font-semibold">Admin</span>
        </div>
      </div>
      <div className="mb-6 relative w-full">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="border p-2 w-full pr-10 rounded focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="space-y-4">
        {users
          .filter(user => user.username && user.username.toLowerCase().includes(search.toLowerCase()))
          .map(user => (
            <div key={user.id} className="bg-white rounded-lg shadow overflow-hidden">
              <button
                onClick={() => toggleUserExpand(user.id)}
                className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <UserCircle size={20} className="text-[#D4AF37]" />
                  <span className="font-medium">{user.username}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {user.permissions ? user.permissions.length : 0} accès
                  </span>
                </div>
                {expandedUser === user.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {expandedUser === user.id && (
                <div className="p-4 border-t">
                  <h3 className="text-sm font-semibold mb-3 text-gray-500">Autorisations accordées :</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {availablePages.map(page => {
                      const isAllowed = user.permissions && user.permissions.includes(page.id);
                      return (
                        <div
                          key={page.id}
                          onClick={() => togglePermission(user.id, page.id)}
                          className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                            isAllowed
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {isAllowed ? <Unlock size={16} /> : <Lock size={16} />}
                          {page.icon}
                          <span className="text-sm">{page.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} className="fixed z-50 inset-0 flex items-center justify-center bg-black/30">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle size={24} className="text-[#D4AF37] mt-0.5" />
            <div>
              <Dialog.Title className="text-lg font-semibold">Modifier les permissions</Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600 mt-1">
                {pendingAction && users.length > 0 && (
                  `Êtes-vous sûr de vouloir ${
                    users.find(u => u.id === pendingAction.userId)?.permissions.includes(pendingAction.pageId) ? 'retirer' : 'ajouter'
                  } l'accès à "${availablePages.find(p => p.id === pendingAction.pageId)?.label}" ?`
                )}
              </Dialog.Description>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setConfirmOpen(false)}
              className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              onClick={confirmToggle}
              className="px-4 py-2 text-sm bg-[#D4AF37] text-white rounded-lg hover:bg-[#C4A235]"
            >
              Confirmer
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
