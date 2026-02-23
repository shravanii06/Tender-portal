import { useEffect, useState } from "react";
import { fetchTenders } from "./api";

export default function App() {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    fetchTenders()
      .then((res) => setTenders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">
          GovTender Portal
        </div>
        <div className="space-x-6">
          <button className="text-gray-700 hover:text-blue-600">Home</button>
          <button className="text-gray-700 hover:text-blue-600">Explore Tenders</button>
          <button className="text-gray-700 hover:text-blue-600">About</button>
          <button className="text-gray-700 hover:text-blue-600">Contact</button>
          <button className="px-4 py-2 border rounded-lg">Login</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover Government Tenders with AI-Powered Insights
        </h1>
        <p className="mb-6">
          Your centralized platform for transparent, accessible procurement opportunities
        </p>

        <div className="bg-white p-6 rounded-xl w-2/3 mx-auto shadow-lg">
          <input
            type="text"
            placeholder="Search by keyword..."
            className="w-full p-3 border rounded-lg mb-4"
          />
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
            Search Tenders
          </button>
        </div>
      </section>

      {/* Latest Tenders */}
      <section className="p-10">
        <h2 className="text-3xl font-bold mb-6">Latest Tenders</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {tenders.map((tender) => (
            <div
              key={tender.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {tender.title}
              </h3>

              <p className="text-gray-500 mb-2">
                {tender.department}
              </p>

              <p className="text-gray-500 mb-2">
                {tender.location}
              </p>

              <p className="text-gray-500 mb-4">
                Deadline: {tender.deadline}
              </p>

              <div className="flex justify-between">
                <button className="border px-4 py-2 rounded-lg">
                  View Details
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {tenders.length === 0 && (
          <p className="text-gray-500 mt-6">
            No tenders available.
          </p>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-blue-700 text-white py-16 text-center grid md:grid-cols-4">
        <div>
          <h3 className="text-3xl font-bold">2,500+</h3>
          <p>Active Tenders</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">15,000+</h3>
          <p>Registered Businesses</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">$2.5B+</h3>
          <p>Total Value</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">98%</h3>
          <p>Satisfaction Rate</p>
        </div>
      </section>

    </div>
  );
}
