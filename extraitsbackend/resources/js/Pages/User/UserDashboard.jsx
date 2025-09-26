import React from "react";
import { router, usePage, Link } from "@inertiajs/react";
import Header from "../Header";
import Footer from "../Footer";
import { motion } from "framer-motion";
import { Heart, PackageCheck, LogOut, Lock } from "lucide-react";
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import { useState } from "react";


// const { flash } = usePage().props;


export default function UserDashboard() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { auth, favorites = [], orders = [] } = usePage().props;
const user = auth?.user;
console.log("auth.user =>", auth?.user);

  const handleLogout = () => {
    router.post(route("logout"));
  };

//   useEffect(() => {
//   if (flash?.success) {
//     toast.success(flash.success); // ou une alerte native
//   }
// }, [flash]);
  const truncate = (str, n) =>
    str.length > n ? str.substring(0, n - 1) + "…" : str;
console.log("📦 Données commandes :", orders);
console.log("❤️ Données favoris :", favorites);

  return (
    <div className="min-h-screen flex flex-col pt-24 bg-white">
      <Header />
      <div className="max-w-5xl mx-auto p-6 space-y-6 font-montserrat">
        <h1 className="text-2xl font-bold text-yellow-700">
          Bienvenue, {auth?.user?.name} 👋
        </h1>

        <div>
          <p className="text-sm text-gray-600">Adresse e-mail :</p>
          <p className="font-semibold">{auth?.user?.email}</p>
        </div>

        <div className="space-y-6">
          {/* Favoris */}
          
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  <Link href="/mes-favoris" className="flex items-center text-yellow-700 gap-2 hover:underline text-lg">
   <Heart size={20} />
     Mes favoris
  </Link>
  <div className="flex gap-3 mt-2">
    {favorites.map((fav) => {
      const item = fav.produit || fav.accessoire || fav.service;
      const type = fav.produit
        ? "produit"
        : fav.accessoire
        ? "accessoire"
        : "service";

      if (!item) return null;

      return (
        <Link key={`${type}-${item.id}`} href={`/${type}/${item.id}`} className="text-center">
          <img
            src={item.imagePrincipale || item.imageUrl || item.image || '/images/default.png'}
            alt={item.nomProduit || item.nomAccessoire || item.nom}
            className="w-20 h-20 object-cover rounded-lg shadow"
          />
          {/* <p className="text-sm mt-1">
            {item.nomProduit || item.nomAccessoire || item.nom}
          </p> */}
        </Link>
      );
    })}
  </div>
</motion.div>


          {/* Historique de commandes */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.1 }}
>
  <Link href="/mes-commandes" className="flex items-center text-yellow-700 gap-2 hover:underline text-lg">
    <PackageCheck size={20} />
    Historique de mes commandes
  </Link>

  <div className="flex gap-3 mt-2 flex-wrap">
    {orders.slice(0, 3).flatMap((commande) => {
      const items = [
        ...(commande.produits || []),
        ...(commande.accessoires || []),
        ...(commande.services || [])
      ];

      return items.map((item) => {
        const type = item.nomProduit
          ? 'produit'
          : item.nomAccessoire
          ? 'accessoire'
          : 'service';

        const image =
          item.imagePrincipale || item.imageUrl || item.image || '/images/default.png';

        const nom =
          item.nomProduit || item.nomAccessoire || item.nom;

        return (
          <div key={`${commande.id}-${type}-${item.id}`} className="text-center">
            <img
              src={image}
              alt={nom}
              className="w-20 h-20 object-cover rounded-lg shadow"
            />
            {/* <p className="text-sm mt-1">{nom}</p> */}
          </div>
        );
      });
    })}
  </div>
</motion.div>


          {/* Changer mot de passe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* <Link href={route('profile.update')} className="flex items-center text-yellow-700 gap-2 hover:underline text-lg">
  <Lock size={20} />
  Changer mon mot de passe
</Link> */}
{/* <h2 className="text-lg font-semibold mb-2">Changer le mot de passe</h2> */}

<button
  onClick={() => setShowPasswordForm(!showPasswordForm)}
  className="flex items-center gap-2 text-yellow-700 hover:underline text-lg"
>
  <Lock size={20} />
  {showPasswordForm ? "Changer le mot de passe" : "changer le mot de passe"}
</button>

{showPasswordForm && (
  <div className="mt-4">
    <UpdatePasswordForm />
  </div>
)}




          </motion.div>

          {/* Déconnexion */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-red-600 text-sm hover:underline mt-6"
          >
            <LogOut size={18} />
            Se déconnecter
          </motion.button>
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
