import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Registration attempt:", { username, email });
      await axios.post(import.meta.env.VITE_API_URL + "/api/auth/register", {
        username,
        password,
        email,
        name,
      });

      // Show loading for at least 600ms for better UX
      setTimeout(() => {
        setIsLoading(false);

        // Show success toast
        toast.success("Registration successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 2000, // Shorter duration since we're redirecting
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Clear form
        setUsername("");
        setPassword("");
        setEmail("");
        setName("");

        // Redirect to login page after a short delay to allow toast to be seen
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }, 600);
    } catch (err) {
      console.error(
        "Registration failed:",
        err.response?.data?.error || "Unknown error"
      );
      setIsLoading(false);

      // Show error toast
      toast.error(
        err.response?.data?.error || "Registration failed. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-700 to-red-500 p-4 relative overflow-hidden">
      {/* Toast Container */}
      <ToastContainer />

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-red-300 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-200 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Registration card with glassmorphism effect */}
      <div className="max-w-sm w-full mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-8 transition-all duration-300 z-10">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center text-white mb-4 hover:text-red-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                className="block w-full border p-2 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                className="block w-full border p-2 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                className="block w-full border p-2 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                className="block w-full border p-2 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <button
              className={`w-full bg-secondary text-white px-4 py-2 rounded hover:bg-red-700 transition-all ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </div>
              ) : (
                "Register"
              )}
            </button>

            {/* Already have an account link */}
            <div className="text-center mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-secondary hover:underline">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
