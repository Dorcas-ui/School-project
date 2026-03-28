import React from 'react';
import { Link } from 'react-router-dom';

export default function PaymentActions() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-pink-700 mb-8 text-center">Payments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/payment/balance" className="block bg-white rounded-lg shadow-md p-6 hover:bg-pink-100 transition-colors border border-gray-200 text-center">
          <span className="text-4xl mb-2 inline-block">💰</span>
          <h3 className="text-xl font-bold text-pink-700 mb-1">My Balance</h3>
          <p className="text-gray-600">View your current account balance.</p>
        </Link>
        <Link to="/payment/make" className="block bg-white rounded-lg shadow-md p-6 hover:bg-green-100 transition-colors border border-gray-200 text-center">
          <span className="text-4xl mb-2 inline-block">📲</span>
          <h3 className="text-xl font-bold text-green-700 mb-1">Make Payment</h3>
          <p className="text-gray-600">Pay your outstanding balance using your phone.</p>
        </Link>
      </div>
    </div>
  );
}
