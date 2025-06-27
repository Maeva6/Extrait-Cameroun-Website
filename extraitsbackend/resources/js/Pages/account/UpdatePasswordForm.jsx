import { useState } from 'react';
import axios from 'axios';

export default function UpdatePasswordForm() {
  const [form, setForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.put('/api/user-password', form);
      setMessage('Mot de passe mis à jour avec succès !');
      setForm({
        current_password: '',
        password: '',
        password_confirmation: '',
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Erreur lors de la mise à jour du mot de passe.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block font-medium mb-1">Mot de passe actuel</label>
        <input
          type="password"
          name="current_password"
          value={form.current_password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Nouveau mot de passe</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Confirmer le mot de passe</label>
        <input
          type="password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {message && <p className="text-green-600 text-sm">{message}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-gold-500 text-white rounded hover:bg-gold-600 transition"
      >
        Mettre à jour
      </button>
    </form>
  );
}