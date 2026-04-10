import { useEffect, useState } from 'react';

export default function InteractionLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [tab, setTab] = useState('ai'); // 'ai' or 'human'

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/interactions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch logs');
      setLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!accountNumber.trim()) return;
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(
        `/api/admin/interactions/search-ai?accountNumber=${encodeURIComponent(accountNumber.trim())}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch logs');
      setLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const aiLogs = logs.filter(l => l.type === 'ai');
  const humanLogs = logs.filter(l => l.type === 'human');

  return (
    
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Interaction Logs</h2>
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-6 py-2 rounded-t-lg font-bold ${tab === 'ai' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-purple-700'}`}
          onClick={() => setTab('ai')}
        >
          AI Interactions
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-bold ${tab === 'human' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-purple-700'}`}
          onClick={() => setTab('human')}
        >
          Human Interactions
        </button>
      </div>
      {tab === 'ai' && (
        <>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 mb-6 items-center justify-center">
            <input
              type="text"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
              placeholder="Search by Account Number"
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 font-semibold"
            >
              Search
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 font-semibold"
              onClick={() => { setAccountNumber(''); fetchLogs(); }}
            >
              Reset
            </button>
          </form>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : aiLogs.length === 0 ? (
            <div className="text-center text-gray-500">No AI interaction logs found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="bg-purple-200">
                    <th className="py-2 px-4">User</th>
                    <th className="py-2 px-4">Type</th>
                    <th className="py-2 px-4">Message</th>
                    <th className="py-2 px-4">AI Answer</th>
                    <th className="py-2 px-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {aiLogs.map(log => (
                    <tr key={log._id} className="border-b">
                      <td className="py-2 px-4">{log.user?.name || log.user || 'N/A'}</td>
                      <td className="py-2 px-4">{log.type}</td>
                      <td className="py-2 px-4">{log.message}</td>
                      <td className="py-2 px-4">{log.aiAnswer || '-'}</td>
                      <td className="py-2 px-4">{new Date(log.timestamp || log.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      {tab === 'human' && (
        <>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : humanLogs.length === 0 ? (
            <div className="text-center text-gray-500">No escalated human support requests found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="bg-purple-200">
                    <th className="py-2 px-4">Client Name</th>
                    <th className="py-2 px-4">Account Number</th>
                    <th className="py-2 px-4">Message</th>
                    <th className="py-2 px-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {humanLogs.map(log => (
                    <tr key={log._id} className="border-b">
                      <td className="py-2 px-4">{log.user?.name || log.user || 'N/A'}</td>
                      <td className="py-2 px-4">{log.user?.accountNumber || '-'}</td>
                      <td className="py-2 px-4">{log.message}</td>
                      <td className="py-2 px-4">{new Date(log.timestamp || log.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
