import { Link } from "react-router-dom";
import Card from "../../common/Card";
import { formatDate, formatDateRange } from "../../../utils/date.utils";

export default function ItineraryCard({ itinerary, onDelete }) {
  const { id, title, startDate, endDate, budget } = itinerary;

  return (
    <Card
      className="hover:shadow-md transition-shadow"
      footer={
        <div className="flex justify-between items-center">
          <Link
            to={`/itineraries/${id}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View Details
          </Link>
          <button
            onClick={() => onDelete(id)}
            className="text-error-600 hover:text-error-700 font-medium text-sm"
          >
            Delete
          </button>
        </div>
      }
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="text-sm text-gray-500 space-y-1">
        <p>{formatDateRange(startDate, endDate)}</p>
        <p>Budget: ${budget.toLocaleString()}</p>
      </div>
    </Card>
  );
}
