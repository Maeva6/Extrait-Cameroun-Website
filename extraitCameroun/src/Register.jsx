// 📁 src/Register.jsx
import React, { useState } from "react";
import logo from './assets/icons/logo.svg';
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!emailOrUsername || !user || !password || !passwordConfirmation) {
  //     alert("Veuillez remplir tous les champs !");
  //     return;
  //   }

  //   if (password !== passwordConfirmation) {
  //     alert("Les mots de passe ne correspondent pas !");
  //     return;
  //   }

  //   // Simule une inscription
  //   console.log("Email ou Nom d'utilisateur:", emailOrUsername);
  //   console.log("Nom d'utilisateur:", user);
  //   console.log("Mot de passe:", password);
  //   alert("Inscription réussie !");
  // };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!emailOrUsername || !user || !password || !passwordConfirmation) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  if (password !== passwordConfirmation) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nomUtilisateur: user,
        adresseEmail: emailOrUsername,
        motDePasse: password,
        motDePasse_confirmation: passwordConfirmation
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Inscription réussie !");
    } else {
      alert("Erreur : " + data.error);
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
    alert("Erreur réseau : " + error.message);
  }
  navigate("/famille/parfums-de-corps");
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4 text-center">
        <img src={logo} alt="Logo" className="h-16 mx-auto" />
        <h2 className="text-lg font-bold">Créez votre compte</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block font-semibold mb-1">
              Email ou nom d'utilisateur
            </label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="exemple@email.com ou nom"
              className="p-2 border rounded-md w-full placeholder-yellow-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Nom d'utilisateur</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Votre pseudo"
              className="p-2 border rounded-md w-full placeholder-yellow-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="p-2 border rounded-md w-full placeholder-yellow-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Confirmation du mot de passe</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="********"
              className="p-2 border rounded-md w-full placeholder-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 rounded-md hover:bg-yellow-700 w-full mt-4"
          >
            S'inscrire 
          </button>
        </form>
      </div>
    </div>
  );
}
