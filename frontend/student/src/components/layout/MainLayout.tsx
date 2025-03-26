import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { PageTransition } from "../ui/PageTransition";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
}

export const MainLayout = ({ 
  children, 
  title,
  showBackButton = false
}: MainLayoutProps) => {
  const { isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState<string | null>(null);
  const [rollNumber, setRollNumber] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setRollNumber(localStorage.getItem("rollNumber"));
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-purple-200 mb-4"></div>
          <div className="h-4 bg-purple-200 rounded w-36"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-purple-200 px-8 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-md"
              >
                Back
              </Button>
            )}
            <h1 className="text-xl font-semibold text-purple-900">
              {title || "Student Achievement Portal"}
            </h1>
          </div>

          {/* User Info */}
          {name && rollNumber && (
            <div className="flex items-center gap-4 bg-purple-100 text-purple-900 px-5 py-3 rounded-lg shadow-md">
              <User size={24} className="text-purple-700" />
              <div className="flex flex-col">
                <span className="font-medium text-md">{name}</span>
                <span className="text-sm text-purple-600">{rollNumber}</span>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 px-4 py-2 rounded-md"
          >
            <LogOut size={18} className="mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-200 py-6 text-center text-purple-700">
        © {new Date().getFullYear()} Student Achievement Portal
      </footer>
    </div>
  );
};
