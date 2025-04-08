import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  GlobeAltIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Layout from "../components/layout/Layout";

const features = [
  {
    name: "Plan Your Journey",
    description:
      "Create detailed itineraries with our intuitive planning tools.",
    icon: GlobeAltIcon,
  },
  {
    name: "Track Your Budget",
    description:
      "Keep track of expenses and manage your travel budget effectively.",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Organize Activities",
    description: "Schedule and organize your daily activities with ease.",
    icon: CalendarIcon,
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      <main className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex-grow">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Welcome to</span>
                <span className="block text-primary-600 dark:text-primary-400">
                  WanderQuest
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Plan your perfect trip with ease. Create detailed itineraries,
                track expenses, and discover new destinations all in one place.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex justify-center gap-x-6">
                {user ? (
                  <>
                    <Link to="/create-trip" className="btn-primary">
                      Create New Trip
                    </Link>
                    <Link to="/itineraries" className="btn-secondary">
                      View My Trips
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="btn-primary">
                      Get Started
                    </Link>
                    <Link to="/login" className="btn-secondary">
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-32">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature.name}
                    className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset 
                  focus-within:ring-primary-500 rounded-lg shadow-soft hover:shadow-md transition-shadow"
                  >
                    <div>
                      <span className="rounded-lg inline-flex p-3 bg-primary-50 text-primary-700 ring-4 ring-white">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900">
                        {feature.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof Section */}
            <div className="mt-32 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Trusted by travelers worldwide
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
                {/* Add logos or stats here */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="col-span-1 flex justify-center md:col-span-1"
                  >
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary-600">
                        {(i + 1) * 1000}+
                      </p>
                      <p className="text-sm text-gray-500">
                        {
                          [
                            "Travelers",
                            "Trips Created",
                            "Destinations",
                            "Reviews",
                          ][i]
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
