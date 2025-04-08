import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validateEmail } from "../../utils/validation.utils";
import { Button } from "../../components/common";
import Layout from "../../components/layout/Layout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Create a click handler instead of form submit
  const handleLoginClick = async () => {
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/itineraries");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl">
          <div className="px-8 py-10 sm:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
                Sign in to continue your journey
              </p>
            </div>

            {/* Show error message if exists */}
            {error && (
              <div
                className="mb-6 p-4 rounded-md bg-error-50 dark:bg-error-900/50 
                border border-error-200 dark:border-error-800"
              >
                <p className="text-sm text-error-600 dark:text-error-400">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 shadow-sm focus:border-primary-500 
                    focus:ring-primary-500 text-lg py-3"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                      bg-white dark:bg-gray-800 shadow-sm focus:border-primary-500 
                      focus:ring-primary-500 text-lg py-3 pr-10"
                    autoComplete="current-password"
                  />
                  {/* Password toggle button */}
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
                onClick={handleLoginClick}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>

            {/* Add this section after the form */}
            <div className="mt-8 text-center text-sm">
              <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
