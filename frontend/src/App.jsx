import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./pages/login";
import Register from "./pages/register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function MainApp() {
  const { token, role, logout } = useContext(AuthContext);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
        <Login />
        <Register />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome, {role}</h1>
        <Routes>
          {role === "admin" ? (
            <Route path="/dashboard" element={<AdminDashboard />} />
          ) : (
            <Route path="/dashboard" element={<UserDashboard />} />
          )}
          {/* Redirect any other route to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        <button
          className="mt-4 bg-secondary px-4 py-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
