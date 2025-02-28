import { useState, useEffect } from "react";
import { itineraryService } from "../services";
import { weatherService } from "../services/weather.service";
import { placesService } from "../services/places.service";
import { Button, Card } from "../components/common";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

export default function Itineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("startDate"); // startDate, title, budget
  const [weatherData, setWeatherData] = useState({});
  const [placesData, setPlacesData] = useState({});

  useEffect(() => {
    loadItineraries();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      for (const itinerary of itineraries) {
        if (itinerary.location) {
          try {
            const data = await weatherService.getWeatherForLocation(
              itinerary.location
            );
            const filteredData = {
              ...data,
              list: data.list
                .filter((item) => {
                  const date = new Date(item.dt * 1000);
                  return date.getUTCHours() === 12;
                })
                .slice(0, 5),
            };
            setWeatherData((prev) => ({
              ...prev,
              [itinerary.id]: filteredData,
            }));
          } catch (err) {
            console.error(
              `Failed to load weather for ${itinerary.location}:`,
              err
            );
          }
        }
      }
    };

    if (itineraries.length > 0) {
      fetchWeatherData();
    }
  }, [itineraries]);

  useEffect(() => {
    const fetchPlacesData = async () => {
      for (const itinerary of itineraries) {
        if (itinerary.location) {
          try {
            const data = await placesService.searchPlaces(
              itinerary.location,
              "tourist attractions"
            );
            if (data && data.results) {
              setPlacesData((prev) => ({
                ...prev,
                [itinerary.id]: data.results.slice(0, 3),
              }));
            }
          } catch (err) {
            console.error(
              `Failed to load places for ${itinerary.location}:`,
              err
            );
          }
        }
      }
    };

    if (itineraries.length > 0) {
      fetchPlacesData();
    }
  }, [itineraries]);

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

  const filteredItineraries = itineraries
    .filter((itinerary) =>
      itinerary.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "startDate":
          return new Date(a.startDate) - new Date(b.startDate);
        case "title":
          return a.title.localeCompare(b.title);
        case "budget":
          return parseFloat(a.budget) - parseFloat(b.budget);
        default:
          return 0;
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-gray-500">
            Loading itineraries...
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-error-600 bg-error-50 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Itineraries
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage and view all your planned trips
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                variant="primary"
                as={Link}
                to="/create-trip"
                className="w-full sm:w-auto"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create New Trip
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search itineraries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:border-primary-500 focus:ring-primary-500"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="startDate">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="budget">Sort by Budget</option>
              </select>
            </div>
          </div>
        </div>

        {filteredItineraries.length === 0 ? (
          <Card className="text-center py-12 bg-gray-200">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No itineraries found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new trip
            </p>
            <div className="mt-6">
              <Button variant="primary" as={Link} to="/create-trip">
                Create New Trip
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItineraries.map((itinerary) => (
              <Card
                key={itinerary.id}
                className="flex flex-col h-full transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-primary-200/30 border border-primary-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between border-b border-primary-100/60 pb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        {itinerary.title}
                      </h3>
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <svg
                          className="mr-1.5 h-4 w-4 text-primary-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          {formatDate(itinerary.startDate)} -{" "}
                          {formatDate(itinerary.endDate)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <svg
                          className="mr-1.5 h-4 w-4 text-primary-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{itinerary.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 ring-1 ring-inset ring-primary-600/20 shadow-sm">
                        ${parseFloat(itinerary.budget).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Activities
                    </h4>
                    <div className="mt-3 space-y-3">
                      {itinerary.activities
                        .slice(0, 3)
                        .map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm bg-blue-100/80 rounded-lg p-2 hover:bg-white transition-colors border border-primary-100/40 shadow-sm"
                          >
                            <span className="w-8 h-8 flex-shrink-0 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium shadow-sm">
                              {activity.day}
                            </span>
                            <span className="flex-1 ml-3 text-gray-900 font-medium">
                              {activity.name}
                            </span>
                            <span className="text-primary-600 bg-primary-50 px-2 py-1 rounded-md text-xs border border-primary-100">
                              {activity.time}
                            </span>
                          </div>
                        ))}
                      {itinerary.activities.length > 3 && (
                        <p className="text-sm text-primary-600 font-medium mt-2 hover:text-primary-700 cursor-pointer transition-colors">
                          +{itinerary.activities.length - 3} more activities
                        </p>
                      )}
                    </div>
                  </div>

                  {weatherData[itinerary.id] && (
                    <div className="mt-4 pt-4 border-t border-primary-100/60">
                      <h4 className="text-sm font-medium text-gray-900 flex items-center">
                        <svg
                          className="mr-2 h-4 w-4 text-primary-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          />
                        </svg>
                        Weather Forecast
                      </h4>
                      <div className="mt-3 flex gap-2 overflow-x-auto">
                        {weatherData[itinerary.id].list.map((day, index) => (
                          <div
                            key={index}
                            className="flex-shrink-0 flex flex-col items-center p-2 bg-blue-50 rounded-lg border border-primary-100"
                          >
                            <span className="text-xs text-gray-600">
                              {index === 0
                                ? "Today"
                                : new Date(day.dt * 1000).toLocaleDateString(
                                    "en-US",
                                    { weekday: "short" }
                                  )}
                            </span>
                            <img
                              src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                              alt={day.weather[0].description}
                              className="w-8 h-8"
                            />
                            <span className="text-sm font-medium">
                              {Math.round(day.main.temp)}°C
                            </span>
                            <span className="text-xs text-gray-600">
                              {day.weather[0].main}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {placesData[itinerary.id] && (
                    <div className="mt-4 pt-4 border-t border-primary-100/60">
                      <h4 className="text-sm font-medium text-gray-900 flex items-center">
                        <svg
                          className="mr-2 h-4 w-4 text-primary-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Popular Places Nearby
                      </h4>
                      <div className="mt-3 space-y-2">
                        {placesData[itinerary.id].map((place, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm bg-blue-50 rounded-lg p-2 border border-primary-100"
                          >
                            <span className="w-8 h-8 flex-shrink-0 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium">
                              {index + 1}
                            </span>
                            <div className="ml-3 flex-1">
                              <span className="font-medium text-gray-900">
                                {place.name}
                              </span>
                              <p className="text-xs text-gray-600 mt-0.5">
                                {place.formatted_address}
                              </p>
                            </div>
                            <span className="text-xs bg-primary-50 px-2 py-1 rounded-full text-primary-700 border border-primary-100">
                              {place.rating ? `${place.rating} ★` : "No rating"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {itinerary.placesWithPhotos &&
                    itinerary.placesWithPhotos.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-primary-100/60">
                        <h4 className="text-sm font-medium text-gray-900 flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-primary-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Popular Places
                        </h4>
                        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                          {itinerary.placesWithPhotos.map(
                            (place, index) =>
                              place.photos &&
                              place.photos.length > 0 && (
                                <div
                                  key={index}
                                  className="flex-shrink-0 w-24 h-24 relative rounded-lg overflow-hidden"
                                >
                                  <img
                                    src={place.photos[0].url}
                                    alt={place.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src =
                                        place.photos[0].fallback_url;
                                      e.target.onerror = null;
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                    <span className="text-white text-xs p-1 truncate w-full">
                                      {place.name}
                                    </span>
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    )}

                  <div className="mt-6 pt-4 border-t border-primary-100/60 flex justify-end space-x-3">
                    <Button
                      variant="secondary"
                      as={Link}
                      to={`/itineraries/${itinerary.id}`}
                      className="text-sm group hover:bg-primary-50"
                    >
                      <span className="flex items-center">
                        View Details
                        <svg
                          className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1 text-primary-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </Button>
                    <Button
                      variant="error"
                      onClick={() => handleDelete(itinerary.id)}
                      className="text-sm group"
                    >
                      <span className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
