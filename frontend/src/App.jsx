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
import Home from "./pages/Home";

function MainApp() {
  const { token, role, logout } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <Routes>
          {/* Public routes */}
          {!token && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Home/>} />
            </>
          )}

          {/* Protected routes */}
          {token && (
            <>
              <Route
                path="/dashboard"
                element={
                  role === "admin" ? <AdminDashboard /> : <UserDashboard />
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
        {token && (
          <button
            className="mt-4 bg-secondary px-4 py-2 rounded"
            onClick={logout}
          >
            Logout
          </button>
        )}
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
