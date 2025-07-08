import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/register";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome, {role}</h1>
      {role === "admin" ? (
        <div className="bg-secondary p-4 rounded">Admin Dashboard</div>
      ) : (
        <div className="bg-blue-200 text-blue-900 p-4 rounded">
          User Dashboard
        </div>
      )}
      <button className="mt-4 bg-secondary px-4 py-2 rounded" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
