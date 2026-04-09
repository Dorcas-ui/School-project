
import DashboardCard from '../components/DashboardCard';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gradient bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
        Admin Dashboard
      </h2>
      {admin ? (
        <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-lg p-6 shadow text-center mb-8 border-t-8 border-yellow-400">
          <p className="text-xl font-semibold text-purple-800 mb-1">Welcome, {admin.name}!</p>
          <p className="text-gray-700">Email: <span className="font-mono">{admin.email}</span></p>
        </div>
      ) : (
        <p className="text-red-500 text-center mb-8">Admin info not found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <DashboardCard
          title="Manage Users"
          description="View, add, or remove users."
          to="/admin/users"
          icon="🧑‍💼"
        />
        <DashboardCard
          title="Admin Management"
          description="View, add, or remove admins."
          to="/admin/admins"
          icon="🛡️"
        />
        <DashboardCard
          title="Payments"
          description="Track and manage all payments."
          to="/admin/payments"
          icon="💰"
        />
        <DashboardCard
          title="Interaction Logs"
          description="View AI and customer interaction logs."
          to="/admin/interactions"
          icon="📋"
        />
      </div>
    </div>
  );
}
