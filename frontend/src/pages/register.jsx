import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setMessage("");
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Registration successful! You can now log in.");
    } else {
      setError(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-primary">Register</h2>
      {message && <div className="text-green-600 mb-2">{message}</div>}
      {error && <div className="text-secondary mb-2">{error}</div>}
      <input
        className="block w-full mb-2 border p-2 rounded"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="block w-full mb-2 border p-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <select
        className="block w-full mb-4 border p-2 rounded"
        value={role}
        onChange={e => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-red-700" type="submit">
        Register
      </button>
    </form>
  );
}