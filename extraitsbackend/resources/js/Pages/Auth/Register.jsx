// 📁 src/Register.jsx
import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import logo from "./assets/icons/logo.svg";

export default function Register() {
  const { props } = usePage();
  const csrfToken = props.csrf_token;

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
    password_confirmation: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 px-4">
      <Head title="Inscription" />
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4 text-center">
        <img src={logo} alt="Logo" className="h-16 mx-auto" />
        <h2 className="text-lg font-bold">Créez votre compte</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input type="hidden" name="_token" value={csrfToken} />

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
              onChange={(e) => setData("password", e.target.value)}
              className="p-2 border rounded-md w-full placeholder-yellow-500"
              placeholder="********"
              required
            />
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
