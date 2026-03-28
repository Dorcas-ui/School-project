import { useState } from 'react';
import axios from 'axios';

export default function WifiReboot() {
  const [message, setMessage] = useState('');
  const [rebooting, setRebooting] = useState(false);

  const handleReboot = async () => {
    setRebooting(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/selfservice/reboot',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || 'Router rebooted successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to reboot router.');
    }
    setRebooting(false);
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-yellow-700 mb-6 text-center">Reboot Router</h2>
      <div className="bg-yellow-50 rounded-lg shadow p-6 text-center">
        <p className="text-gray-700 mb-4">Restart your Wi-Fi router for troubleshooting.</p>
        <button
          onClick={handleReboot}
          disabled={rebooting}
          className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow transition-colors ${rebooting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {rebooting ? 'Rebooting...' : 'Reboot Router'}
        </button>
        {message && <p className="mt-4 text-yellow-700 font-semibold">{message}</p>}
      </div>
    </div>
  );
}
