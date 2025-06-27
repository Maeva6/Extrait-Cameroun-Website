import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CollapsibleSection from './Collapsible'; 
import AccountInfoForm from './AccountInfoForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import OrderHistory from './OrderHistory';
import FavoriteItems from './FavoriteItems';
import LogoutButton from './LogoutButton';

const ManageAccount = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/user')
      .then(res => setUser(res.data))
      .catch(() => {
        // Optional: redirect to login if not authenticated
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-800 font-[Montserrat] text-gray-900 dark:text-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-black dark:text-white">🎯 Mon Compte</h1>

        <CollapsibleSection title="👤 Informations du Compte">
          <AccountInfoForm user={user} />
        </CollapsibleSection>

        <CollapsibleSection title="🔑 Mettre à jour le mot de passe">
          <UpdatePasswordForm />
        </CollapsibleSection>

        <CollapsibleSection title="📦 Historique des Commandes">
          <OrderHistory />
        </CollapsibleSection>

        <CollapsibleSection title="⭐ Favoris">
          <FavoriteItems />
        </CollapsibleSection>

        <div className="flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
export default ManageAccount;