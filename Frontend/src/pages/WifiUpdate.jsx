import { useState } from 'react';
import axios from 'axios';

export default function WifiUpdate() {
  const [wifiName, setWifiName] = useState('MyWiFi');
  const [wifiPassword, setWifiPassword] = useState('password123');
  const [message, setMessage] = useState('');

  const handleChange = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        '/api/selfservice/wifi',
        { wifiUsername: wifiName, wifiPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || 'Wi-Fi credentials updated!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update Wi-Fi credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Update Wi-Fi Credentials</h2>
      <form onSubmit={handleChange} className="space-y-4 bg-blue-50 rounded-lg shadow p-6">
        <div>
          <label className="block text-left font-semibold text-blue-800 mb-1">Wi-Fi Username</label>
          <input
            type="text"
            value={wifiName}
            onChange={e => setWifiName(e.target.value)}
            className="w-full px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-left font-semibold text-blue-800 mb-1">Wi-Fi Password</label>
          <input
            type="text"
            value={wifiPassword}
            onChange={e => setWifiPassword(e.target.value)}
            className="w-full px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-full shadow transition-colors"
        >
          Update Wi-Fi
        </button>
        {message && <p className="mt-4 text-blue-700 font-semibold">{message}</p>}
      </form>
    </div>
  );
}
