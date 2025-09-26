import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const EmployeDetailsModal = ({ employeId, onClose }) => {
    const [employe, setEmploye] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const modalRef = useRef();
  
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };
  
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
  
    useEffect(() => {
        const fetchEmployeDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/recupeemploye/${employeId}`);
                
                console.log("Réponse complète:", response); // Pour le débogage
                
                if (response.data.success && response.data.data) {
                    setEmploye(response.data.data);
                } else {
                    setError("Aucune donnée valide reçue");
                }
            } catch (err) {
                console.error("Erreur détaillée:", err);
                setError(err.response?.data?.message || 'Erreur de chargement des données');
            } finally {
                setLoading(false);
            }
        };
  
        if (employeId) {
            fetchEmployeDetails();
        }
    }, [employeId]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Non spécifié';
        try {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('fr-FR', options);
        } catch {
            return dateString; // Retourne la date brute si le formatage échoue
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
            </div>
        );
    }
  
    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-md">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={onClose}
                        className="bg-[#D4AF37] text-white px-4 py-2 rounded"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }
  
    if (!employe) {
        return null;
    }
  
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-bold">Détails de l'employé</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Fermer"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Informations personnelles</h4>
                        <div className="space-y-3">
                            <p><span className="font-medium">ID:</span> {employe.id}</p>
                            <p><span className="font-medium">Nom complet:</span> {employe.name}</p>
                            <p><span className="font-medium">Email:</span> {employe.email}</p>
                            <p><span className="font-medium">Téléphone:</span> {employe.phone || 'Non spécifié'}</p>
                            <p><span className="font-medium">Rôle:</span> 
                                {employe.role === 'employe' ? 'Employé' :
                                 employe.role === 'admin' ? 'Administrateur' : 'Client'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Détails professionnels</h4>
                        <div className="space-y-3">
                            <p><span className="font-medium">Date d'embauche:</span> 
                                {formatDate(employe.created_at)}
                            </p>
                            <p><span className="font-medium">Adresse:</span> {employe.address || 'Non spécifié'}</p>
                            <p><span className="font-medium">Dernière mise à jour:</span> 
                                {formatDate(employe.updated_at)}
                            </p>
                        </div>
                    </div>
                </div>
                
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

export default EmployeDetailsModal;