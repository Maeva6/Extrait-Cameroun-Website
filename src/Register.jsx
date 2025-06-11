import React, { useState } from "react";
import logo from '../assets/Ellipse.svg';
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [user, setUser] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password || !user) {
            alert("Veuillez remplir tous les champs !");
            return;
        }
        if (password != passwordConfirmation) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        console.log("Email:", email);
        console.log("Password:", password);
        console.log("User:", user);
    }; 

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden items-center justify-center bg-yellow-100">
            <div className="space-y-4 bg-white p-6 rounded-lg shadow-lg w-96 text-center flex flex-col items-center justify-center">
                <header className="className= flex justify-center items-center p-1 bg-white">
                    <img src={logo} alt="logo" className = "h-16"></img>
                </header>
                <h2 className="flex flex-col font-bold">Creez votre compte</h2>
                <form className="flex flex-col space-y-4 " onSubmit = {handleSubmit}>
                    <label className="text-left font-semibold" htmlFor="email">Email ou numéro de telephone</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemple@domaine.com ou +237..."
                        className="p-2 border rounded-md w-full placeholder-yellow-500"
                    />
                    <label className="text-left font-semibold" htmlFor="password">Nom d'utilisateur</label>
                    <input
                        type="text"
                        id="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        placeholder="Choississez votre pseudonyme"
                        className="p-2 border rounded-md w-full placeholder-yellow-500"
                    />
                    <label className="text-left font-semibold" htmlFor="password">Mot de passe</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="****************"
                        className="p-2 border rounded-md w-full placeholder-yellow-500"
                    />
                    <label className="text-left font-semibold" htmlFor="passwordConfirmation">Confirmation de Mot de Passe</label>
                    <input
                        type="text"
                        id="passwordConfirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder="****************"
                        className="p-2 border rounded-md w-full placeholder-yellow-500"
                    />
                </form>
                <button type="submit" className="mt-5 bg-black text-white py-2 rounded-md hover:bg-yellow-700 w-full">S'inscrire</button>
            </div>
        </div>
    );
}

export default Register;