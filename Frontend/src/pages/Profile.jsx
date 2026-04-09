import { useEffect, useState } from 'react';
import axios from 'axios';

const PACKAGE_DETAILS = {
  Buffalo: { speed: '8 Mbps', price: 1500 },
  Elephant: { speed: '12 Mbps', price: 2000 },
  Rhino: { speed: '16 Mbps', price: 2500 },
  Lion: { speed: '20 Mbps', price: 3000 },
  Leopard: { speed: '30 Mbps', price: 5000 },
};

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        console.log('TOKEN:', token);
        const res = await axios.get('http://localhost:5000/api/selfservice/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setPhone(res.data.phone || '');
      } catch (err) {
        setError('Failed to fetch profile.');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/selfservice/profile', { phone }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((u) => ({ ...u, phone }));
      setEditMode(false);
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  const handleWifiPackageUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      const form = e.target;
      const wifiPackage = form.package.value;
      await axios.put('http://localhost:5000/api/selfservice/wifi/package', { wifiPackage }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((u) => ({ ...u, wifiPackage }));
    } catch (err) {
      setError('Failed to update Wi-Fi package.');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">My Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Details Card */}
        <div className="bg-purple-50 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4">Customer Details</h3>
          <div className="mb-2">
            <span className="font-semibold text-purple-800">Name:</span> {user.name}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-purple-800">Account Number:</span> {user.accountNumber}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-purple-800">Phone:</span> {editMode ? (
              <form onSubmit={handleUpdate} className="inline">
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="px-2 py-1 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 mr-2"
                  required
                />
                <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-3 py-1 rounded-full shadow transition-colors">Save</button>
                <button type="button" onClick={() => { setEditMode(false); setPhone(user.phone || ''); }} className="ml-2 text-purple-700 underline">Cancel</button>
              </form>
            ) : (
              <>
                {user.phone || 'N/A'}{' '}
                <button onClick={() => setEditMode(true)} className="text-purple-700 underline ml-2">Edit</button>
              </>
            )}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-purple-800">Role:</span> {user.role}
          </div>
        </div>
        {/* Package Details Card */}
        <div className="bg-purple-50 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4">Wi-Fi Package</h3>
          <div className="mb-2">
            <span className="font-semibold text-purple-800">Current Package:</span> {user.wifiPackage} ({PACKAGE_DETAILS[user.wifiPackage]?.speed} @ Ksh. {PACKAGE_DETAILS[user.wifiPackage]?.price})
          </div>
          <div className="mb-2">
            <span className="font-semibold text-purple-800">Change Package:</span>
            <form onSubmit={handleWifiPackageUpdate} className="inline ml-2">
              <select name="package" defaultValue="" className="w-48 px-2 py-1 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 mr-2">
                <option value="" disabled>Choose package</option>
                {Object.entries(PACKAGE_DETAILS).map(([key, val]) => (
                  <option key={key} value={key}>{key} - {val.speed} @ Ksh. {val.price}</option>
                ))}
              </select>
              <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-3 py-1 rounded-full shadow transition-colors">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
