import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Provide default context value
const defaultContextValue = {
  userId: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true
};

const AuthContext = createContext(defaultContextValue);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
    setLoading(false);
  }, []);

  const login = (userId) => {
    localStorage.setItem("userId", String(userId));
    setUserId(userId);
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    navigate("/login");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        userId, 
        login, 
        logout, 
        isAuthenticated: !!userId, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};