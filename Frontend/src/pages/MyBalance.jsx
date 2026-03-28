import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyBalance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/selfservice/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(res.data.balance);
      } catch (err) {
        setError('Failed to fetch balance.');
      }
      setLoading(false);
    };
    fetchBalance();
  }, []);

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">My Balance</h2>
      <div className="bg-pink-50 rounded-lg shadow p-6 text-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-3xl font-mono text-pink-800">ksh{balance?.toLocaleString() ?? '0.00'}</p>
        )}
      </div>
    </div>
  );
}
