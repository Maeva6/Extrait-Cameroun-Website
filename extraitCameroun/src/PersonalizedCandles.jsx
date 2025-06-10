import React from 'react';
import Header from './Header';  
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function PersonalizedCandles() {
    return (
        <section className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <div className="font-bold font-montserrat max-w-4xl mx-auto text-center px-4 pt-32 pb-12">
                <h1 className="text-3xl text-yellow-600 md:text-5xl mb-6">Bougies Personnalisées</h1>
                <p className="text-lg md:text-xl text-black">
                    Créez une ambiance unique avec nos bougies personnalisées. Choisissez vos senteurs préférées et créez une bougie qui reflète votre style et vos émotions. Parfaites pour la maison ou comme cadeau spécial.
                </p>
            </div>
            <Footer />
        </section>
    );
}
