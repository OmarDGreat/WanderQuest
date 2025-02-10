import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Itineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      const response = await axios.get('/itineraries');
      setItineraries(response.data);
    } catch (err) {
      setError('Failed to fetch itineraries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await axios.delete(`/itineraries/${id}`);
        setItineraries(itineraries.filter(item => item.id !== id));
      } catch (err) {
        setError('Failed to delete itinerary');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Itineraries</h1>
        <Link to="/create-trip" className="btn-primary">
          Create New Trip
        </Link>
      </div>

      {itineraries.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No itineraries yet. Start by creating one!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {itineraries.map((itinerary) => (
            <div
              key={itinerary.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{itinerary.title}</h3>
              <div className="text-gray-600 mb-4">
                <p>
                  {new Date(itinerary.startDate).toLocaleDateString()} -{' '}
                  {new Date(itinerary.endDate).toLocaleDateString()}
                </p>
                <p>Budget: ${itinerary.budget}</p>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleDelete(itinerary.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 