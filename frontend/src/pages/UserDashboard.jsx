import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UserDashboard() {
  const { role } = useContext(AuthContext);

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-primary">User Dashboard</h2>
      <p>
        Welcome! You are logged in as{" "}
        <span className="font-semibold">{role}</span>.
      </p>
      {/* Add more user features here */}
    </div>
  );
}
