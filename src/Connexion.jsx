
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/Ellipse.svg';

const Connexion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="px-4 py-6 w-full min-h-screen flex flex-col items-center justify-center bg-yellow-100">
            <div className="py-4 w-full max-w-md flex flex-col justify-center items-center bg-white rounded-lg shadow-lg space-y-4">
                <header className=" flex justify-center items-center p-1 bg-white">
                    <img src={logo} alt="logo" className = "h-16"></img>
                </header>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-left font-semibold">Email ou numéro de téléphone</label>
                    <input 
                        type="text" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre email ou numéro"
                        className="p-2 border rounded-md w-full placeholder-yellow-500"
                    />

                    <label htmlFor="password" className="text-left font-semibold">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe"
                        className="p-2 border rounded-md w-full placeholder-yellow-500"
                    />

                    <button type="submit" className="mt-5 bg-black text-white py-2 rounded-md hover:bg-yellow-700 w-full">
                        Se connecter
                    </button>
                    <div className="flex justify-center gap-x-4 text-xs text-yellow-500 mt-4">
                        <Link to="/register" className="hover:underline">Pas de compte? S'en creer un</Link>
                        <Link to="/forgot-password" className="hover:underline">Mot de Passe oublie</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Connexion;