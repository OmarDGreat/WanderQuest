import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validateEmail } from "../../utils/validation.utils";
import { Button } from "../../components/common";
import Layout from "../../components/layout/Layout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/itineraries");
    } catch (err) {
      setErrors({ form: err.message || "Failed to login" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 
          dark:border-gray-700 shadow-lg rounded-xl"
        >
          <div className="px-8 py-10 sm:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
                Sign in to continue your journey
              </p>
            </div>

            {errors.form && (
              <div className="mb-8 text-error-600 text-sm rounded-lg bg-error-50 p-5 border border-error-200">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-lg py-3"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-error-600 dark:text-error-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-white
                        shadow-sm focus:border-primary-500 focus:ring-primary-500 
                        text-lg py-3 pr-12 transition-colors duration-200"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2
                        p-2 rounded-full
                        text-gray-500 dark:text-gray-400 
                        hover:text-gray-700 dark:hover:text-gray-200
                        hover:bg-gray-100 dark:hover:bg-gray-700
                        focus:outline-none focus:ring-2 focus:ring-primary-500
                        transition-colors duration-200"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        // Eye-off icon (password hidden)
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        // Eye icon (password visible)
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-error-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  Forgot your password?
                </Link>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full text-lg py-3"
                  isLoading={isLoading}
                >
                  Sign in
                </Button>
              </div>
            </form>

            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-gray-300">Don't have an account? </span>
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Create one now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
