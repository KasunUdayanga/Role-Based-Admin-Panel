import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      // Use data.token and data.user.role from backend
      login(res.data.token, res.data.user.role);
    } catch (err) {
      setError(
        err.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4 text-primary">Login</h2>
      {error && <div className="text-secondary mb-2">{error}</div>}
      <input
        className="block w-full mb-2 border p-2 rounded"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="block w-full mb-4 border p-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-800"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
