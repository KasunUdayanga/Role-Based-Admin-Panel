import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state with values from localStorage (if they exist)
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("userRole") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || null);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  
  const navigate = useNavigate();

  // Enhanced login function to store all user details
  const login = (token, userRole, user) => {
    localStorage.setItem("token", token);
    
    // Store complete user data as JSON
    localStorage.setItem("userData", JSON.stringify(user));
    
    // Update state
    setToken(token);
    setRole(userRole);
    setUsername(user.username);
    setUserData(user);
    
    // Navigate based on role
    navigate("/dashboard");
  };

  // Enhanced logout function to clear all stored data
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    localStorage.removeItem("userData");
    
    // Reset state
    setToken(null);
    setRole(null);
    setUsername(null);
    setUserData(null);
    
    // Navigate to login
    navigate("/login");
  };

  useEffect(() => {

    
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setRole(localStorage.getItem("userRole"));
      setUsername(localStorage.getItem("username"));
      
      try {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        if (storedUserData) {
          setUserData(storedUserData);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        // If there's an error, clear potentially corrupted data
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        role, 
        username, 
        userData, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};