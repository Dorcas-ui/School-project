import { useEffect, useState } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', accountNumber: '', phone: '', package: '', location: '' });
  const [editUser, setEditUser] = useState(null);
  const [success, setSuccess] = useState('');

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch users');
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddUser(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add user');
      setSuccess('User added successfully!');
      setShowAdd(false);
      setNewUser({ name: '', accountNumber: '', phone: '', package: '', location: '' });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteUser(id) {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete user');
      setSuccess('User deleted successfully!');
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEditUser(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/users/${editUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editUser)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update user');
      setSuccess('User updated successfully!');
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Manage Users</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-600 text-center mb-4">{success}</div>}
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? 'Cancel' : 'Add User'}
        </button>
      </div>
      {showAdd && (
        <form onSubmit={handleAddUser} className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Account Number</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={newUser.accountNumber}
              onChange={e => setNewUser({ ...newUser, accountNumber: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Phone Number</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={newUser.phone}
              onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Internet Package</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={newUser.package}
              onChange={e => setNewUser({ ...newUser, package: e.target.value })}
              required
            >
              <option value="">Select a package</option>
              <option value="Buffalo">Buffalo</option>
              <option value="Elephant">Elephant</option>
              <option value="Rhino">Rhino</option>
              <option value="Lion">Lion</option>
              <option value="Leopard">Leopard</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Location</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={newUser.location}
              onChange={e => setNewUser({ ...newUser, location: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add User</button>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-purple-200">
              <th className="py-2 px-4">Full Name</th>
              <th className="py-2 px-4">Account Number</th>
              <th className="py-2 px-4">Phone Number</th>
              <th className="py-2 px-4">Internet Package</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">{editUser && editUser._id === user._id ? (
                  <input
                    type="text"
                    className="border px-2 py-1 rounded"
                    value={editUser.name}
                    onChange={e => setEditUser({ ...editUser, name: e.target.value })}
                  />
                ) : user.name}</td>
                <td className="py-2 px-4">{editUser && editUser._id === user._id ? (
                  <input
                    type="text"
                    className="border px-2 py-1 rounded"
                    value={editUser.accountNumber}
                    onChange={e => setEditUser({ ...editUser, accountNumber: e.target.value })}
                  />
                ) : user.accountNumber}</td>
                <td className="py-2 px-4">{editUser && editUser._id === user._id ? (
                  <input
                    type="text"
                    className="border px-2 py-1 rounded"
                    value={editUser.phone}
                    onChange={e => setEditUser({ ...editUser, phone: e.target.value })}
                  />
                ) : user.phone}</td>
                <td className="py-2 px-4">{editUser && editUser._id === user._id ? (
                  <select
                    className="border px-2 py-1 rounded"
                    value={editUser.package}
                    onChange={e => setEditUser({ ...editUser, package: e.target.value })}
                  >
                    <option value="Buffalo">Buffalo</option>
                    <option value="Elephant">Elephant</option>
                    <option value="Rhino">Rhino</option>
                    <option value="Lion">Lion</option>
                    <option value="Leopard">Leopard</option>
                  </select>
                ) : user.package}</td>
                <td className="py-2 px-4">{editUser && editUser._id === user._id ? (
                  <input
                    type="text"
                    className="border px-2 py-1 rounded"
                    value={editUser.location}
                    onChange={e => setEditUser({ ...editUser, location: e.target.value })}
                  />
                ) : user.location}</td>
                <td className="py-2 px-4 space-x-2">
                  {editUser && editUser._id === user._id ? (
                    <>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleEditUser}>Save</button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditUser(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="bg-yellow-400 text-blue-900 px-2 py-1 rounded" onClick={() => setEditUser(user)}>Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteUser(user._id)}>Delete</button>
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
