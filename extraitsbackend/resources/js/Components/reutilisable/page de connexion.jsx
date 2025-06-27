import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function Login({ setIsAuthenticated }) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://localhost:8000/api/simple-login', {
                username: credentials.username,
                password: credentials.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });
    
            if (response.data.success) {
                localStorage.setItem('isAuthenticated', 'true'); // Modifié ici
                localStorage.setItem('authToken', 'simple-auth-token'); // Optionnel
                setIsAuthenticated(true); // Important: met à jour l'état
                navigate('/dashboard', { replace: true });
            } else {
                setError(response.data.message || 'Authentification échouée');
            }
        } catch (err) {
            console.error('Détails erreur:', err.response);
            setError(err.response?.data?.message || 
                   err.response?.data?.error || 
                   'Erreur de connexion au serveur');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Nettoyage plus complet
        if (localStorage.getItem('isAuthenticated') === 'false') {
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('authToken');
        }
        
        // Vérification plus robuste
        const authStatus = localStorage.getItem('isAuthenticated') === 'true' || 
                          localStorage.getItem('authToken') !== null;
        
        if (authStatus) {
          navigate('/dashboard');
        }
      }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Connexion</h2>
                        <p className="text-gray-600 mt-2">Accédez à votre tableau de bord</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Nom d'utilisateur
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Entrez votre nom d'utilisateur"
                                value={credentials.username}
                                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                value={credentials.password}
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Connexion...
                                    </span>
                                ) : 'Se connecter'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}