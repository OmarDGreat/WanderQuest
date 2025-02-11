import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

export default function Itineraries() {
  const itineraries = [
    {
      id: 1,
      title: "Weekend in Paris",
      startDate: "5/31/2024",
      endDate: "6/2/2024",
      budget: 1500.0,
    },
    {
      id: 2,
      title: "Tokyo Adventure",
      startDate: "7/14/2024",
      endDate: "7/19/2024",
      budget: 2500.0,
    },
  ];

  return (
    <Layout>
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">My Itineraries</h1>
        <Link to="/create-trip" className="btn-primary mt-4 sm:mt-0">
          Create New Trip
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {itineraries.map((itinerary) => (
          <div
            key={itinerary.id}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {itinerary.title}
              </h3>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  {itinerary.startDate} - {itinerary.endDate}
                </p>
                <p>Budget: ${itinerary.budget.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
              <Link
                to={`/itineraries/${itinerary.id}`}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                View Details
              </Link>
              <button
                className="text-error-600 hover:text-error-700 font-medium text-sm"
                onClick={() => {
                  /* Add delete handler */
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {itineraries.length === 0 && (
        <div className="text-center mt-12">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No trips</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new trip.
          </p>
          <div className="mt-6">
            <Link to="/create-trip" className="btn-primary">
              Create New Trip
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
}
