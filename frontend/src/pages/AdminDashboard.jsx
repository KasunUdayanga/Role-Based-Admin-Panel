import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, [token]);

  return (
    <div className="p-6 bg-white rounded shadow max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-primary">Admin Dashboard</h2>
      <h3 className="font-semibold mb-2">All Users:</h3>
      <ul>
        {users.map((u) => (
          <li key={u._id} className="mb-1">
            <span className="font-semibold">{u.username}</span> ({u.role}) -{" "}
            {u.email} - {u.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
