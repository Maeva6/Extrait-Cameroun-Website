import { useState, useEffect } from 'react';
import axios from 'axios';

const AccountInfoForm = () => {
  const [info, setInfo] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get('/api/user-info')
      .then(res => setInfo(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/user-info', info);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white border rounded-md p-6 shadow space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>

      <Input label="Full Name" name="name" value={info.name} onChange={handleChange} />
      <Input label="Email" name="email" value={info.email} onChange={handleChange} />
      <Input label="Phone Number" name="phone" value={info.phone} onChange={handleChange} />

      <div className="pt-2 flex justify-between items-center">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>

        <button
          onClick={() => axios.post('/logout').then(() => window.location.href = '/login')}
          className="text-sm text-red-600 hover:underline"
        >
          Log out
        </button>
      </div>

      {success && (
        <p className="text-sm text-green-600 mt-2">✔️ Info updated successfully!</p>
      )}
    </form>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring focus:ring-indigo-500"
      />
    </div>
  );
}
export default AccountInfoForm;