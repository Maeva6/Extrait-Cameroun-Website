import { useState } from 'react';
import { ExternalLink, Check, X } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Navbar from '../components/navBar';

export default function FormulaireFournisseur() {
    
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
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('success'); // 'success' ou 'error'

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

// Configure Axios to include the CSRF token in the headers
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    router.post('/fournisseurs', fournisseur, {
        onSuccess: () => {
            setPopupMessage('Fournisseur enregistré avec succès!');
            setPopupType('success');
            setShowPopup(true);
            
            setTimeout(() => {
                router.visit('/fournisseurs/admin');
            }, 1500);
        },
        onError: (errors) => {
            const errorMessage = Object.values(errors).join('\n') || "Une erreur est survenue";
            setPopupMessage(errorMessage);
            setPopupType('error');
            setShowPopup(true);
        },
        onFinish: () => {
            setIsSubmitting(false);
        }
    });
};

    const handleAnnuler = () => {
        setFournisseur({
            nomFournisseur: '',
            contactTel: '',
            adresseMail: '',
            adresseBoutique: '',
            categorieProduit: '',
            siteWeb: '',
            note: ''
        });
        router.visit('/fournisseurs/admin');
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
    <div className="min-h-screen">
      <div className="flex">
        {/* <Navbar/> */}
        {/* Espace réservé pour la navbar */}
        <div className="w-0 lg:w-[15px] bg-red"></div>

        {/* Contenu principal */}
        <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[220px]">
            <h1 className="text-2xl font-bold mb-6">Ajouter un fournisseur</h1>
            
            <form onSubmit={handleSubmit}>
                {/* Nom du fournisseur */}
                <div className="mb-6">
                    <label className="block text-m font-medium text-gray-700 mb-1">Nom du fournisseur <span className='text-red-500'> *</span></label>
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
                        <label className="block text-m font-medium text-gray-700 mb-1">Contact téléphonique</label>
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
                        <label className="block text-m font-medium text-gray-700 mb-1">Adresse email</label>
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
                    <label className="block text-m font-medium text-gray-700 mb-1">Adresse de la boutique</label>
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
                        <label className="block text-m font-medium text-gray-700 mb-1">Catégorie de produits</label>
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
                        <label className="block text-m font-medium text-gray-700 mb-1">Site web</label>
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
                    <label className="block text-m font-medium text-gray-700 mb-1">Note du fournisseur</label>
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

            {/* Popup de confirmation */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className={`flex items-center mb-4 ${popupType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {popupType === 'success' ? (
                                <Check className="h-6 w-6 mr-2" />
                            ) : (
                                <X className="h-6 w-6 mr-2" />
                            )}
                            <h2 className="text-xl font-bold">
                                {popupType === 'success' ? 'Succès' : 'Erreur'}
                            </h2>
                        </div>
                        <p className="mb-4 whitespace-pre-line">{popupMessage}</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    setShowPopup(false);
                                    if (popupType === 'success') {
                                        // Réinitialisations supplémentaires si nécessaire
                                    }
                                }}
                                className={`px-4 py-2 rounded-md ${
                                    popupType === 'success' 
                                        ? 'bg-[#D4AF37] hover:bg-[#C4A235] text-white'
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                }`}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}