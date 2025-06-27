import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify'; // Si vous utilisez des notifications
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function FormulaireFournisseur() {
    const navigate = useNavigate();
    
    const [fournisseur, setFournisseur] = useState({
        nomFournisseur: '',
        contactTel: '',
        adresseMail: '',
        adresseBoutique: '',
        categorieProduit: '',
        siteWeb: '',
        note: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const categoriesProduits = [
        "Alimentaire",
        "Boissons",
        "Épicerie",
        "Produits frais",
        "Matériel",
        "Équipement",
        "Services",
        "Autres"
    ];

    const notes = [1, 2, 3, 4, 5];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFournisseur(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/fournisseurs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(fournisseur)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de l'enregistrement");
            }
            toast.success('Fournisseur enregistré avec succès!');
    
            // Redirection vers une page spécifique après 1.5 secondes
            setTimeout(() => {
                navigate('/laboratoire/fournisseurs'); // Remplacez par le chemin souhaité
            }, 1500);
        } catch (error) {
            console.error('Erreur:', error);
            toast.error(error.message || "Une erreur est survenue");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleAnnuler = () => {
        // Réinitialisation du formulaire + redirection
        setFournisseur({
            nomFournisseur: '',
            contactTel: '',
            adresseMail: '',
            adresseBoutique: '',
            categorieProduit: '',
            siteWeb: '',
            note: ''
        });
        navigate('/laboratoire/fournisseurs'); // Redirige vers la liste des fournisseurs
    };

    const handleOpenWebsite = () => {
        if (fournisseur.siteWeb) {
            const url = !/^https?:\/\//i.test(fournisseur.siteWeb) 
                ? 'http://' + fournisseur.siteWeb 
                : fournisseur.siteWeb;
            window.open(url, '_blank');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[300px]">
            <h1 className="text-2xl font-bold mb-6">Ajouter un fournisseur</h1>
            
            <form onSubmit={handleSubmit}>
                {/* Nom du fournisseur */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du fournisseur*</label>
                    <input
                        type="text"
                        name="nomFournisseur"
                        value={fournisseur.nomFournisseur}
                        onChange={handleChange}
                        placeholder="Entrer le nom complet du fournisseur..."
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                        required
                    />
                </div>

                {/* Contact téléphonique et Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact téléphonique</label>
                        <input
                            type="tel"
                            name="contactTel"
                            value={fournisseur.contactTel}
                            onChange={handleChange}
                            placeholder="+237 XX XX XX XX"
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
                        <input
                            type="email"
                            name="adresseMail"
                            value={fournisseur.adresseMail}
                            onChange={handleChange}
                            placeholder="email@fournisseur.com"
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                {/* Adresse boutique */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse de la boutique</label>
                    <textarea
                        name="adresseBoutique"
                        value={fournisseur.adresseBoutique}
                        onChange={handleChange}
                        placeholder="Adresse complète du fournisseur..."
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Catégorie produit et Site web */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie de produits</label>
                        <select
                            name="categorieProduit"
                            value={fournisseur.categorieProduit}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        >
                            <option value="">Sélectionner une catégorie</option>
                            {categoriesProduits.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Site web</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="siteWeb"
                                value={fournisseur.siteWeb}
                                onChange={handleChange}
                                placeholder="www.exemple.com"
                                className="flex-1 p-3 border border-gray-300 rounded-md"
                            />
                            <button
                                type="button"
                                onClick={handleOpenWebsite}
                                disabled={!fournisseur.siteWeb}
                                className={`flex items-center gap-2 px-4 rounded-md ${fournisseur.siteWeb ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 cursor-not-allowed'}`}
                            >
                                <ExternalLink className="h-4 w-4" />
                                Visiter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Note */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Note du fournisseur</label>
                    <div className="flex items-center gap-2">
                        {notes.map((n) => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => setFournisseur(prev => ({ ...prev, note: n }))}
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${fournisseur.note >= n ? 'bg-[#D4AF37] text-white' : 'bg-gray-100 text-gray-700'}`}
                            >
                                {n}
                            </button>
                        ))}
                        <input
                            type="hidden"
                            name="note"
                            value={fournisseur.note}
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        {fournisseur.note ? `Note actuelle: ${fournisseur.note}/5` : "Sélectionnez une note"}
                    </p>
                </div>

                {/* Boutons */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                    <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        onClick={handleAnnuler}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#C4A235] disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer le fournisseur'}
                    </button>
                </div>
            </form>
        </div>
    );
}