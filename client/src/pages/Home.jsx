import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to WanderQuest</h1>
      <p className="text-xl text-gray-600 mb-8">
        Plan your perfect trip with ease
      </p>
      
      <div className="max-w-2xl mx-auto">
        {user ? (
          <div className="space-y-6">
            <p className="text-lg">
              Welcome back, {user.email}! Ready to plan your next adventure?
            </p>
            <div className="space-x-4">
              <Link to="/create-trip" className="btn-primary">
                Create New Trip
              </Link>
              <Link to="/itineraries" className="btn-primary bg-primary-500">
                View My Trips
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-lg">
              Join WanderQuest to start planning your next adventure!
            </p>
            <div className="space-x-4">
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn-primary bg-primary-500">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 