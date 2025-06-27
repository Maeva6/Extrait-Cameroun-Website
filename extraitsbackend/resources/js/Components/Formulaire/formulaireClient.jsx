import { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

export default function FormulaireClient() {
    const [client, setClient] = useState({
        nom: '',
        email: '',
        adresse: '',
        numero:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Client soumis:', client);
        // Ici vous ajouterez la logique pour envoyer les données à votre API Laravel
    };

    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[300px]">
            <h1 className="text-2xl font-bold mb-6">Ajouter un client</h1>
            
            <form onSubmit={handleSubmit}>
                {/* Nom du client */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du client</label>
                    <input
                        type="text"
                        name="nom"
                        value={client.nom}
                        onChange={handleChange}
                        placeholder="Entrer le nom du client..."
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
                        value={client.email}
                        onChange={handleChange}
                        placeholder="email@exemple.com"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Numero de telephone</label>
                    <input
                        type="tel"
                        name="numero"
                        value={client.numero}
                        onChange={handleChange}
                        placeholder="+237 6 99 99 99 99"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Adresse */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <textarea
                        name="adresse"
                        value={client.adresse}
                        onChange={handleChange}
                        placeholder="Adresse complète du client..."
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Boutons */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                    <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#C4A235]"
                    >
                        Enregistrer le client
                    </button>
                </div>
            </form>
        </div>
    );
}