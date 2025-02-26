import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { itineraryService } from "../services";
import { Button, Input, Card } from "../components/common";
import Layout from "../components/layout/Layout";

const INITIAL_FORM_STATE = {
  title: "",
  startDate: "",
  endDate: "",
  budget: "",
  location: "",
  activities: [],
};

const INITIAL_ACTIVITY = {
  day: 1,
  name: "",
  time: "",
};

export default function CreateTrip() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [currentActivity, setCurrentActivity] = useState(INITIAL_ACTIVITY);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const { title, startDate, endDate, budget, location } = formData;

    if (!title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!location?.trim()) {
      newErrors.location = "Location is required";
    }

    if (!startDate) {
      newErrors.startDate = "Start date is required";
    } else if (new Date(startDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.startDate = "Start date cannot be in the past";
    }

    if (!endDate) {
      newErrors.endDate = "End date is required";
    } else if (startDate && new Date(startDate) > new Date(endDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    if (!budget) {
      newErrors.budget = "Budget is required";
    } else if (isNaN(budget) || parseFloat(budget) <= 0) {
      newErrors.budget = "Budget must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const formattedData = {
        ...formData,
        budget: parseFloat(formData.budget).toFixed(2),
        activities: formData.activities.sort((a, b) => a.day - b.day),
        weatherData: {}, // Will be populated by backend
      };

      await itineraryService.createItinerary(formattedData);
      navigate("/itineraries");
    } catch (err) {
      setErrors({
        form: err.response?.data?.error || "Failed to create itinerary",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setCurrentActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addActivity = () => {
    if (!currentActivity.name || !currentActivity.time) return;

    setFormData((prev) => ({
      ...prev,
      activities: [...prev.activities, currentActivity],
    }));
    setCurrentActivity(INITIAL_ACTIVITY);
  };

  const removeActivity = (index) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setCurrentActivity(INITIAL_ACTIVITY);
    setErrors({});
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <Card className="bg-white shadow-lg rounded-xl">
          <div className="px-8 py-10 sm:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900">
                Plan Your Trip
              </h2>
              <p className="mt-3 text-base text-gray-600">
                Fill in the details below to create your perfect itinerary
              </p>
            </div>

            {errors.form && (
              <div className="mb-8 text-error-600 text-sm rounded-lg bg-error-50 p-5 border border-error-200">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Basic Information Section */}
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-500">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Basic Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Enter the main details of your trip
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-8">
                  <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Trip Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-lg py-3"
                        placeholder="e.g., Summer in Paris"
                      />
                      {errors.title && (
                        <p className="mt-2 text-sm text-error-600">
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Budget ($)
                      </label>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-lg py-3"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                      {errors.budget && (
                        <p className="mt-2 text-sm text-error-600">
                          {errors.budget}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-lg py-3"
                      />
                      {errors.startDate && (
                        <p className="mt-2 text-sm text-error-600">
                          {errors.startDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-lg py-3"
                      />
                      {errors.endDate && (
                        <p className="mt-2 text-sm text-error-600">
                          {errors.endDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-lg py-3"
                        placeholder="e.g., Paris, France"
                      />
                      {errors.location && (
                        <p className="mt-2 text-sm text-error-600">
                          {errors.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Activities Section */}
              <div className="space-y-8 mt-12">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-500">
                      <svg
                        className="h-6 w-6"
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
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Activities
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Plan your daily activities
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Day
                      </label>
                      <input
                        type="number"
                        name="day"
                        value={currentActivity.day}
                        onChange={handleActivityChange}
                        min="1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-lg py-3"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Activity Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={currentActivity.name}
                        onChange={handleActivityChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-lg py-3"
                        placeholder="e.g., Visit Eiffel Tower"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={currentActivity.time}
                        onChange={handleActivityChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-lg py-3"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={addActivity}
                    className="mt-4"
                  >
                    Add Activity
                  </Button>
                </div>

                {/* Activities List */}
                {formData.activities.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Planned Activities ({formData.activities.length})
                    </h4>
                    <div className="space-y-4">
                      {formData.activities.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-5 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center space-x-4">
                            <span className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-lg font-medium">
                              {activity.day}
                            </span>
                            <div>
                              <p className="text-base font-medium text-gray-900">
                                {activity.name}
                              </p>
                              <p className="text-base text-gray-500">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeActivity(index)}
                            className="text-gray-400 hover:text-error-600 transition-colors p-2"
                          >
                            <svg
                              className="h-6 w-6"
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
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 mt-12 pt-8 border-t border-gray-200">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  Reset
                </Button>
                <Button type="submit" variant="primary" isLoading={isLoading}>
                  Create Trip
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
