import { useState, useEffect } from "react";
import { itineraryService } from "../services";
import { ItineraryList } from "../components/features/itinerary";
import { Button } from "../components/common";
import Layout from "../components/layout/Layout";

export default function Itineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadItineraries();
  }, []);

  const loadItineraries = async () => {
    try {
      const data = await itineraryService.getAllItineraries();
      setItineraries(data);
    } catch (err) {
      setError("Failed to load itineraries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await itineraryService.deleteItinerary(id);
      setItineraries(itineraries.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete itinerary");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Itineraries</h1>
          <Button variant="primary" href="/create-trip">
            Create New Trip
          </Button>
        </div>
        <ItineraryList itineraries={itineraries} onDelete={handleDelete} />
      </div>
    </Layout>
  );
}
