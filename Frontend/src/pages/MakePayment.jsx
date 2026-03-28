import { useState } from 'react';
import axios from 'axios';

const PRESET_AMOUNTS = [1500, 2000, 2500, 3000, 5000, 7500];

export default function MakePayment() {
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePreset = (val) => setAmount(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/payment/stk',
        { amount, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || 'Payment request sent to your phone!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to initiate payment.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Make Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-green-50 rounded-lg shadow p-6">
        <div>
          <label className="block text-left font-semibold text-green-800 mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            pattern="[0-9]{10,15}"
            placeholder="e.g. 0722000000"
          />
        </div>
        <div>
          <label className="block text-left font-semibold text-green-800 mb-1">Amount (Ksh)</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            min="1"
            value={amount}
            onChange={e => setAmount(e.target.value.replace(/\D/g, ''))}
            className="w-full px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            autoComplete="off"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {PRESET_AMOUNTS.map(val => (
              <button
                type="button"
                key={val}
                onClick={() => handlePreset(val)}
                className={`px-4 py-1 rounded-full font-bold border border-green-400 text-green-700 bg-white hover:bg-green-100 transition-colors ${amount == val ? 'bg-green-200 border-green-600' : ''}`}
              >
                Ksh. {val.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-full shadow transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
        {message && <p className="mt-4 text-green-700 font-semibold">{message}</p>}
      </form>
    </div>
  );
}
