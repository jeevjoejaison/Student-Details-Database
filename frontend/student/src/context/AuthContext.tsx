import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  userId: number | null;
  name: string | null;
  section: string | null;
  rollNumber: string | null;
  login: (userId: number, name: string, section: string, rollNumber: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [rollNumber, setRollNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedName = localStorage.getItem("name");
    const storedSection = localStorage.getItem("section");
    const storedRollNumber = localStorage.getItem("rollNumber");

    if (storedUserId) {
      setUserId(Number(storedUserId));
      setName(storedName);
      setSection(storedSection);
      setRollNumber(storedRollNumber);
    }
    setLoading(false);
  }, []);

  const login = (userId: number, name: string, section: string, rollNumber: string) => {
    localStorage.setItem("userId", String(userId));
    localStorage.setItem("name", name);
    localStorage.setItem("section", section);
    localStorage.setItem("rollNumber", rollNumber);

    setUserId(userId);
    setName(name);
    setSection(section);
    setRollNumber(rollNumber);

    toast({
      title: "Login Successful",
      description: `Welcome back, ${name}!`,
    });
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("section");
    localStorage.removeItem("rollNumber");

    setUserId(null);
    setName(null);
    setSection(null);
    setRollNumber(null);

    navigate("/login");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ userId, name, section, rollNumber, login, logout, isAuthenticated: !!userId, loading }}>
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
