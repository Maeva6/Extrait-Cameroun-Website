import React, { useRef } from 'react';
import { X } from 'lucide-react';

const CommandeDetailsModal = ({ commande, onClose }) => {
    const modalRef = useRef();

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!commande) {
        return null;
    }

    const calculateProductTotal = (produit) => {
        const quantite = produit.quantite;
        const prixUnitaire = produit.prix_unitaire_numeric; // Utilisez le prix actuel
        const total = quantite * prixUnitaire;
        return total.toLocaleString('fr-FR') + ' FCFA';
    };
    
    const calculateCommandeTotal = () => {
        if (!commande.produits || commande.produits.length === 0) return '0 FCFA';
        const total = commande.produits.reduce((sum, produit) => {
            return sum + (produit.quantite * produit.prix_unitaire_numeric); // Utilisez le prix actuel
        }, 0);
        return total.toLocaleString('fr-FR') + ' FCFA';
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-bold">Détails de la commande {commande.display_id}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Fermer"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Informations client */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Informations client</h4>
                        <div className="space-y-3">
                            <p><span className="font-medium">Nom:</span> {commande.nom_client}</p>
                            <p><span className="font-medium">Adresse:</span> {commande.adresse_livraison || 'Non spécifié'}</p>
                        </div>
                    </div>

                    {/* Informations commande */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Informations commande</h4>
                        <div className="space-y-3">
                            <p><span className="font-medium">Date:</span> 
                                {new Date(commande.date_commande).toLocaleDateString('fr-FR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}
                            </p>
                            <p><span className="font-medium">Statut:</span> 
                                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                                    commande.etat === 'payée' ? 'bg-green-100 text-green-800' :
                                    commande.etat === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                                    commande.etat === 'expédiée' ? 'bg-blue-100 text-blue-800' :
                                    commande.etat === 'livrée' ? 'bg-purple-100 text-purple-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {commande.etat}
                                </span>
                            </p>
                            <p><span className="font-medium">Paiement:</span> {commande.paiement}</p>
                            <p><span className="font-medium">Montant total:</span> {commande.montant}</p>
                            <p><span className="font-medium">Origine:</span> {commande.origine || 'Non spécifié'}</p>
                        </div>
                    </div>
                </div>

                {/* Produits de la commande - PARTIE CORRIGÉE */}
                <div className="p-6">
                    <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Produits commandés</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-black text-white">
                                <tr>
                                    <th className="p-3 text-left">Produit</th>
                                    <th className="p-3 text-left">Quantité</th>
                                    <th className="p-3 text-left">Prix unitaire</th>
                                    <th className="p-3 text-left">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commande.produits && commande.produits.length > 0 ? (
                                    commande.produits.map((produit, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-3">{produit.nom}</td>
                                            <td className="p-3">{produit.quantite}</td>
                                            <td className="p-3">{produit.prix}</td>
                                            <td className="p-3">{calculateProductTotal(produit)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-3 text-center text-gray-500">
                                            Aucun produit dans cette commande
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot className="bg-gray-100">
                                <tr>
                                    <td colSpan="3" className="p-3 text-right font-semibold">Total commande:</td>
                                    <td className="p-3 font-semibold">{calculateCommandeTotal()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Commentaires */}
                {commande.commentaire && (
                    <div className="p-6 border-t">
                        <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Commentaire</h4>
                        <p className="bg-gray-50 p-4 rounded-lg">{commande.commentaire}</p>
                    </div>
                )}

                <div className="p-4 border-t flex justify-end bg-gray-50">
                    <button
                        onClick={onClose}
                        className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    ); 
};
 
export default CommandeDetailsModal;