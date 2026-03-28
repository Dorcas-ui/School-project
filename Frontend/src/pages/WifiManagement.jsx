import { useState } from 'react';

export default function WifiManagement() {
  const [wifiName, setWifiName] = useState('MyWiFi');
  const [wifiPassword, setWifiPassword] = useState('password123');
  const [message, setMessage] = useState('');
  const [rebooting, setRebooting] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setMessage('Wi-Fi credentials updated!');
    // Here you would call backend API to update credentials
  };

  const handleReboot = () => {
    setRebooting(true);
    setMessage('Rebooting router...');
    setTimeout(() => {
      setRebooting(false);
      setMessage('Router rebooted successfully!');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Wi-Fi Management</h2>
      <div className="bg-blue-50 rounded-lg shadow p-6 text-center">
        <p className="text-gray-700 mb-4">Change your Wi-Fi username and password, or reboot your router.</p>
        <form onSubmit={handleChange} className="mb-6 space-y-4">
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
        </form>
        <button
          onClick={handleReboot}
          disabled={rebooting}
          className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow transition-colors ${rebooting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {rebooting ? 'Rebooting...' : 'Reboot Router'}
        </button>
        {message && <p className="mt-4 text-blue-700 font-semibold">{message}</p>}
      </div>
    </div>
  );
}
