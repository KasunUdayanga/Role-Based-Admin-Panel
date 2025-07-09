import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Animation effect on component mount
  useEffect(() => {
    // Show loading animation for 1.5 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Start content animation after loading finishes
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1800); // 300ms after loading ends

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(visibilityTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-red-600 text-white overflow-hidden">
      {/* Loading overlay */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-blue-900 to-red-900 z-50 flex items-center justify-center transition-opacity duration-500 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center">
          {/* Spinner animation */}
          <div className="h-16 w-16 relative">
            <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-200 animate-spin absolute"></div>
            <div className="h-16 w-16 rounded-full border-r-4 border-l-4 border-red-200 animate-ping absolute opacity-60"></div>
          </div>

          {/* Loading text */}
          <div className="mt-4 text-lg font-bold animate-pulse">Loading</div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-red-500 opacity-20 blur-3xl animate-pulse"></div>

      {/* Main content with slide-in animation */}
      <div
        className={`bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg p-10 flex flex-col items-center transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg text-center">
          Welcome to the <span className="text-blue-200">Role-Based</span> Admin
          Panel
        </h1>

        {/* Animated underline */}
        <div
          className={`w-32 h-1 bg-gradient-to-r from-blue-300 to-red-300 rounded mb-8 transition-all duration-1000 ${
            isVisible ? "w-32 opacity-100" : "w-0 opacity-0"
          }`}
        ></div>

        <p
          className={`mb-8 text-lg text-blue-100 text-center max-w-lg transition-all duration-700 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Securely manage users and permissions with a modern, responsive MERN
          stack dashboard.
        </p>

        {/* Feature boxes with staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full">
          {[
            { title: "Secure", icon: "🔐", desc: "JWT Authentication" },
            { title: "Flexible", icon: "🔄", desc: "Role-based permissions" },
            { title: "Modern", icon: "✨", desc: "MERN stack technology" },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-white bg-opacity-5 p-4 rounded-lg text-center transition-all duration-700 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="font-bold text-lg">{feature.title}</h3>
              <p className="text-sm text-blue-100">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div
          className={`flex gap-6 transition-all duration-700 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Link
            to="/register"
            className="relative overflow-hidden bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow 
                      hover:bg-blue-100 hover:scale-105 hover:shadow-lg
                      active:scale-95 active:shadow-inner
                      transition-all duration-300 group"
          >
            <span className="relative z-10">Sign Up</span>
            {/* Button animation overlay */}
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-100 to-white 
                            opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0 
                            transition-all duration-300 ease-out"
            ></span>
          </Link>

          <Link
            to="/login"
            className="relative overflow-hidden bg-blue-700 text-white font-bold px-8 py-3 rounded-full shadow 
                      hover:bg-blue-800 hover:scale-105 hover:shadow-lg
                      active:scale-95 active:shadow-inner
                      transition-all duration-300 group"
          >
            <span className="relative z-10">Sign In</span>
            {/* Button animation overlay */}
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-900 
                            opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0 
                            transition-all duration-300 ease-out"
            ></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
