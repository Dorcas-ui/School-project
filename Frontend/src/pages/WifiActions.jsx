import React from 'react';
import { Link } from 'react-router-dom';

export default function WifiActions() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Wi-Fi Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/wifi/update" className="block bg-white rounded-lg shadow-md p-6 hover:bg-blue-100 transition-colors border border-gray-200 text-center">
          <span className="text-4xl mb-2 inline-block">🔑</span>
          <h3 className="text-xl font-bold text-blue-700 mb-1">Update Wi-Fi</h3>
          <p className="text-gray-600">Change your Wi-Fi username and password.</p>
        </Link>
        <Link to="/wifi/reboot" className="block bg-white rounded-lg shadow-md p-6 hover:bg-yellow-100 transition-colors border border-gray-200 text-center">
          <span className="text-4xl mb-2 inline-block">🔄</span>
          <h3 className="text-xl font-bold text-yellow-700 mb-1">Reboot Router</h3>
          <p className="text-gray-600">Restart your Wi-Fi router for troubleshooting.</p>
        </Link>
      </div>
    </div>
  );
}
