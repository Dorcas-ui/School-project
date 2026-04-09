import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setResetCode('');
    if (!email || !name) {
      setError('Please enter both email and full name.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/adminRequestReset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Reset request failed');
      } else {
        setSuccess('If your details are correct, you will receive a reset code.');
        if (data.code) {
          setResetCode(data.code); // Demo mode: show code
          setTimeout(() => {
            navigate('/adminResetPassword', { state: { email, resetCode: data.code } });
          }, 1200);
        }
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border-t-8 border-yellow-400">
        <h2 className="text-3xl font-bold text-yellow-600 mb-4 text-center">Admin Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          {resetCode && <div className="text-blue-600 text-sm text-center">Reset Code: {resetCode}</div>}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 rounded-lg shadow transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Requesting...' : 'Request Reset'}
          </button>
        </form>
      </div>
    </div>
  );
}
