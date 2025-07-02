import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import logo from "./assets/icons/logo.svg";

export default function Register() {
  const [passwordErrors, setPasswordErrors] = useState([]);

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("Le mot de passe doit contenir au moins 8 caractères.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Il doit contenir au moins une majuscule.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Il doit contenir au moins une minuscule.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Il doit contenir au moins un chiffre.");
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]/.test(password)) {
      errors.push("Il doit contenir au moins un caractère spécial.");
    }

    return errors;
  };

  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset
  } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "client"
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.imgur.com/p8FSpph.jpeg')" // 👈 Remplace ce lien ici
      }}
    >
      <Head title="Inscription" />
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-md space-y-4 text-center">
        <img src={logo} alt="Logo" className="h-16 mx-auto" />
        <h2 className="text-lg font-bold">Créez votre compte</h2>

        {Object.keys(errors).length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
            <ul className="list-disc list-inside">
              {Object.values(errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block font-semibold mb-1" htmlFor="name">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="p-2 border rounded-md w-full placeholder-yellow-500"
              placeholder="Votre nom"
              required
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="email">
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="p-2 border rounded-md w-full placeholder-yellow-500"
              placeholder="exemple@email.com"
              required
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="password">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={(e) => {
                setData("password", e.target.value);
                setPasswordErrors(validatePassword(e.target.value));
              }}
              className="p-2 border rounded-md w-full placeholder-yellow-500"
              placeholder="********"
              required
            />
            {passwordErrors.length > 0 && (
              <ul className="text-red-600 text-sm mt-1 list-disc list-inside">
                {passwordErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              className="block font-semibold mb-1"
              htmlFor="password_confirmation"
            >
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              id="password_confirmation"
              value={data.password_confirmation}
              onChange={(e) =>
                setData("password_confirmation", e.target.value)
              }
              className="p-2 border rounded-md w-full placeholder-yellow-500"
              placeholder="********"
              required
            />
            {errors.password_confirmation && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password_confirmation}
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link
              href={route("login")}
              className="text-sm text-gray-600 underline hover:text-yellow-600"
            >
              Déjà inscrit ?
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-yellow-700"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
