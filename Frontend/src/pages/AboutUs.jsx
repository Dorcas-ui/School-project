export default function AboutUs() {
  const PACKAGE_DETAILS = [
    { name: 'Buffalo', speed: '8 Mbps', price: 1500 },
    { name: 'Elephant', speed: '12 Mbps', price: 2000 },
    { name: 'Rhino', speed: '16 Mbps', price: 2500 },
    { name: 'Lion', speed: '20 Mbps', price: 3000 },
    { name: 'Leopard', speed: '30 Mbps', price: 5000 },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow">About Us</h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl text-center mb-8">
        <p className="text-lg text-red-600 mb-4">
          <span className="font-bold text-blue-600">Thank you for choosing UIMS!</span><br />
          We are dedicated to providing seamless internet management solutions for ISPs and their customers.
        </p>
        <p className="text-red-600 mb-2">
          <span className="font-semibold">Our Mission:</span> Empower customers and providers with a unified, efficient, and secure platform for all internet service needs.
        </p>
      </div>
      <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Wi-Fi Packages</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full max-w-2xl">
        {PACKAGE_DETAILS.map(pkg => (
          <div key={pkg.name} className="bg-yellow-50 rounded-lg shadow p-4 flex flex-col items-center border border-yellow-200 min-w-[160px] max-w-[220px] mx-auto">
            <span className="text-lg font-bold text-yellow-800 mb-1">{pkg.name}</span>
            <span className="text-base text-yellow-900 mb-1">{pkg.speed}</span>
            <span className="text-lg font-semibold text-green-700 mb-1">Ksh. {pkg.price.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="bg-yellow-50 rounded-lg shadow p-9 max-w-2xl text-center">
        <h4 className="text-xl font-bold text-blue-700 mb-2">Contact Us</h4>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Call/whatsapp:</span> +254 700 000 000
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Email:</span> info@uims-provider.com
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Website:</span> www.uims-provider.com
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Location:</span> Nairobi, Kenya
        </p>
      </div>
    </div>
  );
}
