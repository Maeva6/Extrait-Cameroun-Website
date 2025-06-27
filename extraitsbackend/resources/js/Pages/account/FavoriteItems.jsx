import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FavoriteItems() {
  const [favorites, setFavorites] = useState([]);
  const [newFav, setNewFav] = useState({ title: '', preview: '' });

  useEffect(() => {
    axios.get('/api/favorites').then(res => setFavorites(res.data));
  }, []);

  const handleAdd = async () => {
    if (!newFav.title) return;
    const res = await axios.post('/api/favorites', newFav);
    setFavorites(prev => [res.data, ...prev]);
    setNewFav({ title: '', preview: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/favorites/${id}`);
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 bg-white border p-6 rounded shadow">
      <h2 className="text-lg font-semibold text-gray-800">⭐ Vos Favoris</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Titre du favori"
          value={newFav.title}
          onChange={e => setNewFav({ ...newFav, title: e.target.value })}
          className="flex-1 border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Aperçu"
          value={newFav.preview}
          onChange={e => setNewFav({ ...newFav, preview: e.target.value })}
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
        >
          Ajouter
        </button>
      </div>

      <ul className="space-y-4">
        {favorites.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucun favori ajouté.</p>
        ) : (
          favorites.map(fav => (
            <li key={fav.id} className="border rounded p-3 flex justify-between items-start">
              <div>
                <div className="font-medium">{fav.title}</div>
                <div className="text-sm text-gray-600">{fav.preview}</div>
              </div>
              <button
                onClick={() => handleDelete(fav.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Supprimer
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}