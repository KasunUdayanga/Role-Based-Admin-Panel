import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";

function MainContent() {
  const { token, role } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        {/* Public routes */}
        {!token && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Home />} />
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
    </div>
  );
}

export default MainContent;