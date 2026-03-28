import AboutUs from './pages/AboutUs';
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

function App() {
  // Helper to check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg">
        <div className="flex items-center space-x-3">
          <span className="text-white text-2xl font-extrabold tracking-wide drop-shadow-lg">UIMS Portal</span>
        </div>
        <ul className="flex space-x-6 items-center">
          <li><Link to="/dashboard" className="bg-red-400 text-white font-bold px-4 py-1 rounded-full shadow hover:bg-red-500 transition">Dashboard</Link></li>
          {!isLoggedIn ? (
            <>
              <li><Link to="/login" className="bg-yellow-300 text-blue-900 font-bold px-4 py-1 rounded-full shadow hover:bg-yellow-400 transition">Login</Link></li>
              <li><Link to="/register" className="bg-blue-300 text-blue-900 font-bold px-4 py-1 rounded-full shadow hover:bg-blue-400 transition">Register</Link></li>
            </>
          ) : (
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
        <Route path="/" element={
          <ProtectedRoute>
            <AboutUs />
          </ProtectedRoute>
        } />
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
      </Routes>
    </div>
  );
}

export default App;