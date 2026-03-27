import DashboardCard from '../components/DashboardCard';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">Dashboard</h2>
      {user ? (
        <div className="bg-purple-100 rounded-lg p-6 shadow text-center mb-8">
          <p className="text-lg font-semibold text-purple-800 mb-1">Welcome, {user.name}!</p>
          <p className="text-gray-700">Account Number: <span className="font-mono">{user.accountNumber}</span></p>
        </div>
      ) : (
        <p className="text-red-500 text-center mb-8">User info not found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DashboardCard
          title="Profile"
          description="View and update your profile information."
          to="/profile"
          icon="👤"
        />
        <DashboardCard
          title="Wi-Fi Management"
          description="Manage your Wi-Fi access and settings."
          to="/wifi"
          icon="📶"
        />
        <DashboardCard
          title="Payments"
          description="Check your balance and make payments."
          to="/payment"
          icon="💳"
        />
        <DashboardCard
          title="Chatbot"
          description="Get help from our AI assistant."
          to="/chatbot"
          icon="🤖"
        />
        <DashboardCard
          title="About Us"
          description="Learn more about our platform."
          to="/"
          icon="ℹ️"
        />
      </div>
    </div>
  );
}
