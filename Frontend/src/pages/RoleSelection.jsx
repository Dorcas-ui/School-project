import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-8 text-center">Select Your Role</h2>
        <button
          className="w-full bg-blue-600 text-white py-3 rounded mb-4 hover:bg-blue-700 text-lg"
          onClick={() => navigate('/customer/login')}
        >
          Customer
        </button>
        <button
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 text-lg"
          onClick={() => navigate('/admin/login')}
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
