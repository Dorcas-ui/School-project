export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <h2 className="text-3xl font-bold text-purple-700 mb-2">Dashboard</h2>
      {user ? (
        <div className="bg-purple-100 rounded-lg p-6 shadow text-center mb-4">
          <p className="text-lg font-semibold text-purple-800 mb-1">Welcome, {user.name}!</p>
          <p className="text-gray-700">Account Number: <span className="font-mono">{user.accountNumber}</span></p>
        </div>
      ) : (
        <p className="text-red-500">User info not found.</p>
      )}
      <p className="text-gray-600">Your account overview and quick actions will appear here.</p>
    </div>
  );
}
