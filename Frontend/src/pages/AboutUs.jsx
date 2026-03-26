export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow">About Us</h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl text-center">
        <p className="text-lg text-gray-700 mb-4">
          Welcome to <span className="font-bold text-blue-600">UIMS</span>!<br />
          We are dedicated to providing seamless internet management solutions for ISPs and their customers.
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Our Mission:</span> Empower customers and providers with a unified, efficient, and secure platform for all internet service needs.
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Contact:</span> info@uims-provider.com | +254 700 000 000
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Location:</span> Nairobi, Kenya
        </p>
      </div>
    </div>
  );
}
