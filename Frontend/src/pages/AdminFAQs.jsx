import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        // Update the URL if your backend is hosted elsewhere
        const token = localStorage.getItem('adminToken'); // Adjust if you use a different storage
        const res = await axios.get('/api/admin/interactions/faqs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFaqs(res.data);
      } catch (err) {
        setError('Failed to fetch FAQs');
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked AI Questions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : faqs.length === 0 ? (
        <p>No AI questions found.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Question</th>
              <th className="border px-4 py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{faq._id}</td>
                <td className="border px-4 py-2 text-center">{faq.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminFAQs;
