import React from "react";
import { usePage } from "@inertiajs/react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "@inertiajs/react";


export default function SpecialGiftSet() {
    const { services } = usePage().props;
    return (
        <section className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <div className="font-bold font-montserrat max-w-4xl mx-auto text-center px-4 pt-32 pb-12">
                {/* <h1 className="text-3xl text-yellow-600 md:text-5xl mb-6">Ensembles de cadeaux spéciaux</h1> */}
                <p className="text-lg md:text-xl text-black mb-8">
                    Offrez un cadeau unique avec nos ensembles personnalisés, parfaits pour toutes les occasions.
                </p>

                {services.length === 0 ? (
                    <p className="text-red-500">Aucun service disponible pour le moment.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {services.map(service => (
  <Link
    key={service.id}
    href={`/services/${service.slug}`}
    className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
  >
    <h2 className="text-xl font-semibold text-yellow-700 mb-2">{service.nom}</h2>
    {/* <p className="text-black font-bold">{service.image} </p> */}
    <img
  src={service.image}
  alt={service.nom}
  className="w-full h-64 object-cover rounded-lg mb-4"
/>
    <p className="text-gray-700 mb-2">{service.description.slice(0, 80)}...</p>
    <p className="text-black font-bold">{service.prix} FCFA</p>
  </Link>
))}
                    </div>
                )}
            </div>
            <Footer />
        </section>
    );
}
