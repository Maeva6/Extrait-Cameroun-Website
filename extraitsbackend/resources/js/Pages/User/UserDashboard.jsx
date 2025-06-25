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
