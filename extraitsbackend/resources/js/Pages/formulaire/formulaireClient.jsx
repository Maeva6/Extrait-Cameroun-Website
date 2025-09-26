import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Navbar from '../components/navBar';

export default function CreateClient() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'client' // Valeur fixe pour les clients
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        router.post(route('clients.store'), {
            ...user,
            role: 'client' // Explicitement défini
        }, {
            onSuccess: () => {
                setUser({ name: '', email: '', password: '' });
                alert('Client créé avec succès!');
                router.visit('/clients/admin');
            },
            onError: (errors) => {
                console.error('Erreur:', errors);
            }
        });
    };

    return (
        <div className="min-h-screen">
            <div className="flex">
                <div className="w-0 lg:w-[15px] bg-red"></div>

                <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[240px]">
                    <h1 className="text-2xl font-bold mb-6">Ajouter un client</h1>
                    
                    <form onSubmit={handleSubmit}>
                        {/* Nom complet */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                placeholder="Entrer le nom complet..."
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="email@exemple.com"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Champ rôle caché (valeur fixe) */}
                        <input type="hidden" name="role" value="client" />

                        {/* Affichage du rôle (lecture seule) */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type de compte</label>
                            <input
                                type="text"
                                value="Client"
                                className="w-full p-3 border border-gray-300 rounded-md bg-[#D4AF37] focus:ring-amber-200 focus:border-amber-300"
                                readOnly
                            />
                        </div>

                        {/* Mot de passe */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Mot de passe sécurisé"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Boutons */}
                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <button
                                type="button"
                                onClick={() => router.visit('/clients/admin')}
                                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#C4A235]"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}



 