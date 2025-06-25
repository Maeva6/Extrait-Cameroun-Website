import React, { useState } from "react";
import logo from './assets/icons/logo.svg';
import background from './assets/images/bg-login.jpg';
import { router, Link } from '@inertiajs/react';
import axios from "axios";


export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            await axios.get("/sanctum/csrf-cookie"); // Laravel Sanctum
            const res = await axios.post("/login", data);

            // Rediriger avec Inertia
            router.visit("/dashboard");
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: "Erreur inconnue lors de la connexion." });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg space-y-6">
                <div className="flex justify-center">
                    <img src={logo} alt="Logo" className="h-16" />
                </div>

                {errors.general && (
                    <div className="text-red-600 text-sm text-center">{errors.general}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md placeholder-yellow-500"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-semibold mb-1">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={data.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md placeholder-yellow-500"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            checked={data.remember}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-600">Se souvenir de moi</label>
                    </div>

                    {/* <div className="flex items-center justify-between text-sm">
                        <a href="/forgot-password" className="text-yellow-600 hover:underline">
                            Mot de passe oublié ?
                        </a>
                        <a href="/register" className="text-yellow-600 hover:underline">
                            Pas de compte ?
                        </a>
                    </div> */}
                    {/* import { Link } from '@inertiajs/react'; */}

{/* ... */}

<Link href="/forgot-password" className="text-yellow-600 hover:underline">
  Mot de passe oublié ?
</Link>
<Link href="/register" className="text-yellow-600 hover:underline">
  Pas de compte ?
</Link>

                    <button
  type="submit"
  disabled={processing}
  className={`bg-black text-white py-2 rounded-md w-full transition duration-300 ${
    processing ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-700"
  }`}
>
  {processing ? "Connexion..." : "Se connecter"}
</button>
{/* <button
  type="submit"
  disabled={processing}
  className={`bg-black text-white py-2 rounded-md w-full transition duration-300 ${
    processing ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-700"
  }`}
>
  {processing ? (
    <span className="flex items-center">
      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
      </svg>
      Connexion...
    </span>
  ) : (
    "Se connecter"
  )}
</button> */}

                </form>
            </div>
        </div>
    );
}
