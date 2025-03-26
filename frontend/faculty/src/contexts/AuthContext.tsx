
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

type UserRole = "student" | "faculty" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Check if user is logged in on initial load
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Simulate fetching user data
      setTimeout(() => {
        // Mock data - in a real app, fetch from API
        const mockUsers = {
          "student-123": {
            id: "student-123",
            name: "John Student",
            email: "student@example.com",
            role: "student" as UserRole,
          },
          "faculty-456": {
            id: "faculty-456",
            name: "Jane Faculty",
            email: "faculty@example.com",
            role: "faculty" as UserRole,
          },
          "admin-789": {
            id: "admin-789",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin" as UserRole,
          },
        };

        if (userId in mockUsers) {
          setUser(mockUsers[userId as keyof typeof mockUsers]);
        } else {
          // Invalid user ID, clear localStorage
          localStorage.removeItem("userId");
        }
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock authentication logic
        // In a real app, this would be an API call
        if (
          (email === "student@example.com" && password === "password") ||
          (email === "faculty@example.com" && password === "password") ||
          (email === "admin@example.com" && password === "password")
        ) {
          let userData: User;
          
          if (email === "student@example.com") {
            userData = {
              id: "student-123",
              name: "John Student",
              email: "student@example.com",
              role: "student",
            };
            localStorage.setItem("userId", "student-123");
          } else if (email === "faculty@example.com") {
            userData = {
              id: "faculty-456",
              name: "Jane Faculty",
              email: "faculty@example.com",
              role: "faculty",
            };
            localStorage.setItem("userId", "faculty-456");
          } else {
            userData = {
              id: "admin-789",
              name: "Admin User",
              email: "admin@example.com",
              role: "admin",
            };
            localStorage.setItem("userId", "admin-789");
          }
          
          setUser(userData);
          setIsLoading(false);
          toast({
            title: "Login successful",
            description: `Welcome back, ${userData.name}!`,
          });
          resolve(true);
        } else {
          setIsLoading(false);
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid email or password",
          });
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
