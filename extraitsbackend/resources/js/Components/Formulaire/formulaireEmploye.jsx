import { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

export default function FormulaireEmploye() {
    const [employe, setEmploye] = useState({
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
        role: 'employe',
        username: '',
        password: ''
    });

    const roles = [
        "admin",
        "manager", 
        "employe"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmploye(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Employé soumis:', employe);
        // Ici vous ajouterez la logique pour envoyer les données à votre API Laravel
    };

    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[300px]">
            <h1 className="text-2xl font-bold mb-6">Ajouter un employé</h1>
            
            <form onSubmit={handleSubmit}>
                {/* Nom de l'employé */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input
                        type="text"
                        name="nom"
                        value={employe.nom}
                        onChange={handleChange}
                        placeholder="Entrer le nom complet..."
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                        required
                    />
                </div>

                {/* Email et Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
                        <input
                            type="email"
                            name="email"
                            value={employe.email}
                            onChange={handleChange}
                            placeholder="email@exemple.com"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                        <input
                            type="tel"
                            name="telephone"
                            value={employe.telephone}
                            onChange={handleChange}
                            placeholder="+237 6 00 00 00 00"
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                {/* Adresse */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <textarea
                        name="adresse"
                        value={employe.adresse}
                        onChange={handleChange}
                        placeholder="Adresse complète..."
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Rôle */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                    <select
                        name="role"
                        value={employe.role}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    >
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Nom d'utilisateur et Mot de passe */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
                        <input
                            type="text"
                            name="username"
                            value={employe.username}
                            onChange={handleChange}
                            placeholder="Nom d'utilisateur"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={employe.password}
                            onChange={handleChange}
                            placeholder="Mot de passe sécurisé"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
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
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
}