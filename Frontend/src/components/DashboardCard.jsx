import React from 'react';
import { Link } from 'react-router-dom';

function DashboardCard({ title, description, to, icon }) {
  return (
    <Link to={to} className="block bg-white rounded-lg shadow-md p-6 hover:bg-blue-100 transition-colors border border-gray-200">
      <div className="flex items-center space-x-4">
        {icon && <span className="text-3xl">{icon}</span>}
        <div>
          <h3 className="text-xl font-bold text-blue-700">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default DashboardCard;
