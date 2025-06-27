import { router } from '@inertiajs/react';
import axios from 'axios';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      router.push('/connexion');
    } catch (err) {
      console.error('Failed to log out', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 px-4 py-2 text-sm bg-black text-white rounded hover:bg-gold-600 transition"
    >
      Se déconnecter
    </button>
  );
}

export default LogoutButton;