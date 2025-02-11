import { Link } from 'react-router-dom';
import ItineraryCard from './ItineraryCard';

export default function ItineraryList({ itineraries, onDelete }) {
  if (itineraries.length === 0) {
    return (
      <div className="text-center mt-12">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No trips</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new trip.
        </p>
        <div className="mt-6">
          <Link
            to="/create-trip"
            className="btn-primary"
          >
            Create New Trip
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {itineraries.map((itinerary) => (
        <ItineraryCard
          key={itinerary.id}
          itinerary={itinerary}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
} 