import { useEffect, useState } from 'react';

export default function AdminsManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', phone: '', password: '' });
  const [editAdmin, setEditAdmin] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/admins', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch admins');
      setAdmins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddAdmin(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newAdmin)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add admin');
      setSuccess('Admin added successfully!');
      setShowAdd(false);
      setNewAdmin({ name: '', email: '', phone: '', password: '' });
      fetchAdmins();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteAdmin(id) {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/admins/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete admin');
      setSuccess('Admin deleted successfully!');
      fetchAdmins();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEditAdmin(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/admins/${editAdmin._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editAdmin)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update admin');
      setSuccess('Admin updated successfully!');
      setEditAdmin(null);
      fetchAdmins();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Admin Management</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-600 text-center mb-4">{success}</div>}
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? 'Cancel' : 'Add Admin'}
        </button>
      </div>
      {showAdd && (
        <form onSubmit={handleAddAdmin} className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={newAdmin.name}
              onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={newAdmin.email}
              onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Phone Number</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={newAdmin.phone}
              onChange={e => setNewAdmin({ ...newAdmin, phone: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={newAdmin.password}
              onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Admin</button>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-purple-200">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin._id} className="border-b">
                <td className="py-2 px-4">{editAdmin && editAdmin._id === admin._id ? (
                  <input
                    type="text"
                    className="border px-2 py-1 rounded"
                    value={editAdmin.name}
                    onChange={e => setEditAdmin({ ...editAdmin, name: e.target.value })}
                  />
                ) : admin.name}</td>
                <td className="py-2 px-4">{editAdmin && editAdmin._id === admin._id ? (
                  <input
                    type="email"
                    className="border px-2 py-1 rounded"
                    value={editAdmin.email}
                    onChange={e => setEditAdmin({ ...editAdmin, email: e.target.value })}
                  />
                ) : admin.email}</td>
                <td className="py-2 px-4 space-x-2">
                  {editAdmin && editAdmin._id === admin._id ? (
                    <>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleEditAdmin}>Save</button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditAdmin(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="bg-yellow-400 text-blue-900 px-2 py-1 rounded" onClick={() => setEditAdmin(admin)}>Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteAdmin(admin._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
