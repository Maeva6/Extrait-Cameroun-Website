import React from "react";
import { router, usePage, Link } from "@inertiajs/react";
import Header from "../Header";
import Footer from "../Footer";

export default function UserDashboard() {
  const { auth } = usePage().props;

  const handleLogout = () => {
    router.post("/logout");
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 bg-white">
      <Header />
      <div className="max-w-4xl mx-auto p-6 space-y-6 font-montserrat">
        <h1 className="text-2xl font-bold text-yellow-700">Bienvenue, {auth?.user?.name} 👋</h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Adresse e-mail :</p>
            <p className="font-semibold">{auth?.user?.email}</p>
          </div>

          <div className="space-y-2">
            <Link href="/mes-favoris" className="block text-yellow-600 hover:underline">
              ❤️ Mes favoris
            </Link>
            <Link href="/mes-commandes" className="block text-yellow-600 hover:underline">
              📦 Historique de mes commandes
            </Link>
          </div>

          {/* <button
            onClick={handleLogout}
            className="mt-4 text-red-600 hover:underline text-sm"
          >
            🔐 Se déconnecter
          </button> */}
          <button
  onClick={() => router.post(route('logout'))}
  className="mt-4 text-red-600 hover:underline text-sm"
>
  🔐 Se déconnecter
</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CollapsibleSection from '../account/Collapsible'; 
// import AccountInfoForm from '../account/AccountInfoForm';
// import UpdatePasswordForm from '../account/UpdatePasswordForm';
// import OrderHistory from '../account/OrderHistory';
// import FavoriteItems from '../account/FavoriteItems';
// import LogoutButton from '../account/LogoutButton';

// const ManageAccount = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     axios.get('/api/user')
//       .then(res => setUser(res.data))
//       .catch(() => {
//         // Optional: redirect to login if not authenticated
//       });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-800 font-[Montserrat] text-gray-900 dark:text-gray-100 px-6 py-10">
//       <div className="max-w-3xl mx-auto space-y-6">
//         <h1 className="text-3xl font-bold text-center text-black dark:text-white">🎯 Mon Compte</h1>

//         <CollapsibleSection title="👤 Informations du Compte">
//           <AccountInfoForm user={user} />
//         </CollapsibleSection>

//         <CollapsibleSection title="🔑 Mettre à jour le mot de passe">
//           <UpdatePasswordForm />
//         </CollapsibleSection>

//         <CollapsibleSection title="📦 Historique des Commandes">
//           <OrderHistory />
//         </CollapsibleSection>

//         <CollapsibleSection title="⭐ Favoris">
//           <FavoriteItems />
//         </CollapsibleSection>

//         <div className="flex justify-center">
//           <LogoutButton />
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ManageAccount;
