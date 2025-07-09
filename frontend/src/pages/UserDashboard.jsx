import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserDashboard() {
  const { token, role, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  // Fetch all users and user profile on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all users
        const usersResponse = await axios.get(
          import.meta.env.VITE_API_URL + "/api/users/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(usersResponse.data);

        // Find current user in the list
        const currentUser = usersResponse.data.find(
          (user) => user.role === role
        );
        if (currentUser) {
          setUserProfile(currentUser);
          setName(currentUser.name || "");
          setEmail(currentUser.email || "");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, role]);

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const updateData = {};
      if (name && name !== userProfile.name) updateData.name = name;
      if (email && email !== userProfile.email) updateData.email = email;
      if (password) updateData.password = password;

      if (Object.keys(updateData).length === 0) {
        toast.info("No changes to update");
        setUpdating(false);
        return;
      }

      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/api/users/me",
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserProfile({ ...userProfile, ...response.data.user });
      toast.success("Profile updated successfully");
      setIsEditing(false);
      setPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.error || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  // Handle logout with confirmation
  const handleLogout = () => {
    toast.success("Logged out successfully");
    setTimeout(() => {
      logout();
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      
      {/* Header with logout button */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 4.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414L14.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M6 10a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* User Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-primary p-4">
              <h2 className="text-xl font-bold text-white">Your Profile</h2>
            </div>

            <div className="p-6">
              {!isEditing ? (
                <>
                  <div className="mb-6 text-center">
                    <div className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mx-auto">
                      {userProfile?.name?.charAt(0) ||
                        userProfile?.username?.charAt(0) ||
                        "U"}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">
                      {userProfile?.name}
                    </h3>
                    <p className="text-gray-500">{userProfile?.username}</p>
                    <p className="text-gray-500">{userProfile?.email}</p>
                    <p className="mt-2 inline-block bg-blue-100 text-primary px-2 py-1 rounded text-sm">
                      {userProfile?.role}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-2"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  {/* Form content (unchanged) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                      disabled={updating}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                      disabled={updating}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password (leave blank to keep current)
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="••••••••"
                      disabled={updating}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className={`flex-1 bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
                        updating ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                      disabled={updating}
                    >
                      {updating ? (
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
                          Saving...
                        </div>
                      ) : (
                        "Save Changes"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setName(userProfile?.name || "");
                        setEmail(userProfile?.email || "");
                        setPassword("");
                      }}
                      className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                      disabled={updating}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-primary p-4">
              <h2 className="text-xl font-bold text-white">All Users</h2>
              <p className="text-blue-100 text-sm">
                View-only list of registered users
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className={
                        user._id === userProfile?._id ? "bg-blue-50" : ""
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}