// import React, { useEffect, useState } from 'react';
// import { Bell, Download, Search, Trash, ChevronDown, Plus, Upload, User, Settings, Shield } from 'lucide-react';
// import { Link, usePage } from '@inertiajs/react';
// import Navbar from "../components/navBar";

// export default function AccesUtilisateurAdmin() {
//     const { props } = usePage();
//     const user = props.user;
    
//     const [loading, setLoading] = useState(false);
//     const [permissions, setPermissions] = useState(user.permissions || []);
//     const [availablePermissions, setAvailablePermissions] = useState([
//         'dashboard',
//         'clients',
//         'commandes',
//         'produits',
//         'ventes',
//         'rapports',
//         'historique',
//         'employes',
//         'fournisseurs',
//         'reapprovisionnement',
//         'productions',
//         'ingredients',
//         'formules'
//     ]);

//     const togglePermission = (permission) => {
//         setPermissions(prev => 
//             prev.includes(permission)
//                 ? prev.filter(p => p !== permission)
//                 : [...prev, permission]
//         );
//     };

//     const savePermissions = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch('/admin/save-permissions', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
//                 },
//                 body: JSON.stringify({ permissions })
//             });

//             if (response.ok) {
//                 alert('Permissions sauvegardées avec succès!');
//                 window.location.href = '/admin/dashboard';
//             } else {
//                 alert('Erreur lors de la sauvegarde');
//             }
//         } catch (error) {
//             console.error('Erreur:', error);
//             alert('Erreur de connexion');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen">
//             <div className="flex w-full">
//                 <Navbar />
//                 <div className="w-0 lg:w-[225px] bg-red"></div>
//                 <div className="flex-1 bg-gray-100 w-full">
//                     <div className="p-6 space-y-8 min-h-screen">
//                         {/* En-tête */}
//                         <div className="flex items-center justify-between border-b border-yellow-400 pb-4">
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-800">
//                                     Configuration des Accès Utilisateur
//                                 </h1>
//                                 <p className="text-gray-600 mt-1">
//                                     Configurez vos permissions d'accès à l'administration
//                                 </p>
//                             </div>
//                             <div className="flex items-center gap-4">
//                                 <div className="bg-yellow-100 p-2 rounded-full">
//                                     <Settings size={24} className="text-yellow-600" />
//                                 </div>
//                                 <span className="font-semibold">{user?.name || 'Utilisateur'}</span>
//                             </div>
//                         </div>

//                         {/* Message d'information */}
//                         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                             <div className="flex items-start gap-3">
//                                 <Shield className="text-blue-600 mt-1 flex-shrink-0" size={20} />
//                                 <div>
//                                     <h3 className="font-semibold text-blue-800">Configuration requise</h3>
//                                     <p className="text-blue-700 text-sm mt-1">
//                                         En tant qu'employé, vous devez configurer vos permissions d'accès avant 
//                                         de pouvoir utiliser le tableau de bord administrateur.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Section des permissions */}
//                         <div className="bg-white rounded-lg shadow p-6">
//                             <h2 className="text-xl font-semibold mb-6 text-gray-800">
//                                 Sélectionnez vos permissions
//                             </h2>
                            
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//                                 {availablePermissions.map((permission) => (
//                                     <div key={permission} className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             id={permission}
//                                             checked={permissions.includes(permission)}
//                                             onChange={() => togglePermission(permission)}
//                                             className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
//                                         />
//                                         <label 
//                                             htmlFor={permission}
//                                             className="ml-3 block text-sm font-medium text-gray-700 capitalize"
//                                         >
//                                             {permission.replace('_', ' ')}
//                                         </label>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Boutons d'action */}
//                             <div className="flex gap-4 pt-6 border-t border-gray-200">
//                                 <button
//                                     onClick={savePermissions}
//                                     disabled={loading || permissions.length === 0}
//                                     className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
//                                 >
//                                     {loading ? (
//                                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                                     ) : (
//                                         <Shield size={16} />
//                                     )}
//                                     {loading ? 'Sauvegarde...' : 'Sauvegarder les permissions'}
//                                 </button>
                                
//                                 <Link 
//                                     href="/dashboard"
//                                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
//                                 >
//                                     Retour au tableau de bord
//                                 </Link>
//                             </div>

//                             {permissions.length === 0 && (
//                                 <p className="text-red-600 text-sm mt-3">
//                                     Veuillez sélectionner au moins une permission
//                                 </p>
//                             )}
//                         </div>

//                         {/* Informations supplémentaires */}
//                         <div className="bg-gray-50 rounded-lg p-4">
//                             <h3 className="font-semibold text-gray-800 mb-2">Informations importantes</h3>
//                             <ul className="text-sm text-gray-600 space-y-1">
//                                 <li>• Les permissions sélectionnées déterminent les sections auxquelles vous aurez accès</li>
//                                 <li>• Vous pourrez modifier ces paramètres ultérieurement dans votre profil</li>
//                                 <li>• Contactez l'administrateur si vous avez besoin d'accès supplémentaires</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Navbar from "../components/navBar";

export default function AccesUtilisateur() {
    const { props } = usePage();
    const user = props.user;

    return (
        <div className="min-h-screen">
            <div className="flex w-full">
                <Navbar />
                <div className="w-0 lg:w-[225px] bg-red"></div>
                <div className="flex-1 bg-gray-100 w-full">
                    <div className="p-6 space-y-8 min-h-screen flex flex-col items-center justify-center">
                        <div className="text-center max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                            {/* Icône ou illustration */}
                            <div className="mb-6">
                                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                                    <svg 
                                        className="w-12 h-12 text-yellow-600" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                                        />
                                    </svg>
                                </div>
                            </div>
                            
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                Configuration des droits d'accès requise
                            </h1>
                            
                            <p className="text-gray-600 mb-6">
                                Votre compte employé a été créé avec succès, mais aucun droit d'accès n'a encore été configuré.
                            </p>
                            
                            <p className="text-gray-500 text-sm mb-8">
                                Un administrateur doit définir vos permissions avant que vous puissiez accéder aux fonctionnalités du système.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    href="/logout" 
                                    method="post"
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded transition-colors"
                                >
                                    Se déconnecter
                                </Link>
                                
                                <Link 
                                    href="/contact-admin" 
                                    className="bg-[#D4AF37] hover:bg-yellow-600 text-white px-6 py-2 rounded transition-colors"
                                >
                                    Contacter l'administrateur
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}