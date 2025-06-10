import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function SpecialGiftSet() {
    return(
        <section className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <div className="font-bold font-montserrat max-w-4xl mx-auto text-center px-4 pt-32 pb-12">
                <h1 className="text-3xl text-yellow-600 md:text-5xl mb-6">Ensembles de cadeaux spéciaux</h1>
                <p className="text-lg md:text-xl text-black">
                    Offrez un cadeau unique avec nos ensembles de parfums personnalisés, parfaits pour toutes les occasions.
                </p>
            </div>
            <Footer />
        </section>
    );
}