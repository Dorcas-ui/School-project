import { useEffect, useState } from 'react';

export default function InteractionLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Interaction Logs</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : logs.length === 0 ? (
        <div className="text-center text-gray-500">No interaction logs found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-purple-200">
                <th className="py-2 px-4">User</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Message</th>
                <th className="py-2 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log._id} className="border-b">
                  <td className="py-2 px-4">{log.userId?.name || log.userId || 'N/A'}</td>
                  <td className="py-2 px-4">{log.type}</td>
                  <td className="py-2 px-4">{log.message}</td>
                  <td className="py-2 px-4">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
