import AdminFAQs from './pages/AdminFAQs';
  <Route path="/admin/faqs" element={<AdminFAQs />} />
import Dashboard from './pages/Dashboard';
// Removed Payment import; using PaymentActions instead
import Chatbot from './pages/Chatbot';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import WifiManagement from './pages/WifiManagement';
import WifiActions from './pages/WifiActions';
import WifiUpdate from './pages/WifiUpdate';
import WifiReboot from './pages/WifiReboot';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

import ProtectedRoute from './ProtectedRoute';
import PaymentActions from './pages/PaymentActions';
import MyBalance from './pages/MyBalance';
import MakePayment from './pages/MakePayment';
import Profile from './pages/Profile';
import RoleSelection from './pages/RoleSelection';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminForgotPassword from './pages/AdminForgotPassword';
import AdminResetPassword from './pages/AdminResetPassword';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminsManagement from './pages/AdminsManagement';
import AboutUs from './pages/AboutUs';
import InteractionLogs from './pages/InteractionLogs';

function App() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const admin = localStorage.getItem('admin');
  const isUserLoggedIn = Boolean(user);
  const isAdminLoggedIn = Boolean(admin);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/'); // Always go to role selection page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg">
        <div className="flex items-center space-x-3">
          <span className="text-white text-2xl font-extrabold tracking-wide drop-shadow-lg">UIMS Portal</span>
        </div>
        <ul className="flex space-x-6 items-center">
          {(isUserLoggedIn || isAdminLoggedIn) && (
            <li>
              <Link
                to={isAdminLoggedIn ? "/admin/dashboard" : "/dashboard"}
                className="bg-red-400 text-white font-bold px-4 py-1 rounded-full shadow hover:bg-red-500 transition"
              >
                Dashboard
              </Link>
            </li>
          )}
          {(isUserLoggedIn || isAdminLoggedIn) && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-400 text-white font-bold px-4 py-1 rounded-full shadow hover:bg-red-500 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      {/* Main Content */}
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        {/* Redirect unknown routes to role selection */}
        <Route path="*" element={<RoleSelection />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <PaymentActions />
            </ProtectedRoute>
          } />
        <Route path="/payment/actions" element={
          <ProtectedRoute>
            <PaymentActions />
          </ProtectedRoute>
        } />
        <Route path="/payment/balance" element={
          <ProtectedRoute>
            <MyBalance />
          </ProtectedRoute>
        } />
        <Route path="/payment/make" element={
          <ProtectedRoute>
            <MakePayment />
          </ProtectedRoute>
        } />
        <Route path="/chatbot" element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/wifi-management" element={<WifiManagement />} />
        <Route path="/wifi" element={
          <ProtectedRoute>
            <WifiActions />
          </ProtectedRoute>
        } />
        <Route path="/wifi/update" element={
          <ProtectedRoute>
            <WifiUpdate />
          </ProtectedRoute>
        } />
        <Route path="/wifi/reboot" element={
          <ProtectedRoute>
            <WifiReboot />
          </ProtectedRoute>
        } />
        <Route path="/wifi-actions" element={
          <ProtectedRoute>
            <WifiActions />
          </ProtectedRoute>
        } />
        <Route path="/wifi-update" element={
          <ProtectedRoute>
            <WifiUpdate />
          </ProtectedRoute>
        } />
        <Route path="/wifi-reboot" element={
          <ProtectedRoute>
            <WifiReboot />
          </ProtectedRoute>
        } />
        <Route path="/payment-actions" element={
          <ProtectedRoute>
            <PaymentActions />
          </ProtectedRoute>
        } />
        <Route path="/my-balance" element={
          <ProtectedRoute>
            <MyBalance />
          </ProtectedRoute>
        } />
        <Route path="/make-payment" element={
          <ProtectedRoute>
            <MakePayment />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/customer/login" element={<Login />} />
        <Route path="/customer/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/admins" element={<AdminsManagement />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
        <Route path="/admin/interactions" element={<InteractionLogs />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;