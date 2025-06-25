import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from './assets/icons/logo.svg';

const Connexion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        setLoading(true);

        try {
            // D'abord, récupérer le cookie CSRF de Laravel Breeze/Sanctum
            await fetch("http://localhost:8000/sanctum/csrf-cookie", {
                credentials: "include"
            });

            // Puis envoyer la requête de login
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert("✅ Connexion réussie !");
                console.log("Utilisateur connecté :", data);
                // Redirection possible ici (ex: navigate('/dashboard'))
            } else {
                const errorData = await response.json();
                alert(errorData.message || "❌ Identifiants incorrects.");
            }
        } catch (error) {
            alert("❌ Une erreur est survenue.");
            console.error("Erreur:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-4 py-6 w-full min-h-screen flex flex-col items-center justify-center bg-yellow-100">
            <div className="py-4 w-full max-w-md flex flex-col justify-center items-center bg-white rounded-lg shadow-lg space-y-4">
                <header className="flex justify-center items-center p-1 bg-white">
                    <img src={logo} alt="logo" className="h-16" />
                </header>
                <form className="flex flex-col space-y-4 px-6 w-full" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-left font-semibold">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre email"
                        className="p-2 border rounded-md w-full placeholder-yellow-500"
                        required
                    />

                    <label htmlFor="password" className="text-left font-semibold">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe"
                        className="p-2 border rounded-md w-full placeholder-yellow-500"
                        required
                    />

                    <button 
                        type="submit" 
                        className="mt-5 bg-black text-white py-2 rounded-md hover:bg-yellow-700 w-full"
                        disabled={loading}
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>

                    <div className="flex justify-center gap-x-4 text-xs text-yellow-500 mt-4">
                        <Link to="/register" className="hover:underline">Pas de compte ? S'en créer un</Link>
                        <Link to="/forgot-password" className="hover:underline">Mot de passe oublié</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Connexion;
