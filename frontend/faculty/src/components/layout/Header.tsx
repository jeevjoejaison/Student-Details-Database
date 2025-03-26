
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const renderLinks = () => {
    if (!isAuthenticated) return null;

    const links = [];
    
    // Only show nav links when authenticated
    if (user?.role === "student") {
      links.push({ to: "/dashboard", label: "Dashboard" });
      links.push({ to: "/view", label: "View Submissions" });
    } else if (user?.role === "faculty") {
      links.push({ to: "/faculty", label: "Dashboard" });
      links.push({ to: "/faculty/students", label: "Students" });
      links.push({ to: "/faculty/requests", label: "Requests" });
    } else if (user?.role === "admin") {
      links.push({ to: "/admin", label: "Dashboard" });
      links.push({ to: "/admin/users", label: "Users" });
      links.push({ to: "/admin/dropdowns", label: "Dropdowns" });
    }

    return links.map((link) => (
      <Link
        key={link.to}
        to={link.to}
        className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
          location.pathname === link.to
            ? "text-primary"
            : "text-foreground/70"
        }`}
      >
        {link.label}
        {location.pathname === link.to && (
          <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
        )}
      </Link>
    ));
  };

  const renderMobileLinks = () => {
    const links = renderLinks();
    if (!links) return null;

    return (
      <div className="flex flex-col space-y-3 mt-8">
        {React.Children.map(links, (link) => (
          <SheetClose asChild>{link}</SheetClose>
        ))}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center mr-4">
          <Link
            to="/"
            className="text-xl font-medium tracking-tight text-foreground"
          >
            Student Management
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 ml-4">
          {renderLinks()}
        </nav>

        <div className="ml-auto flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <span className="hidden md:inline-block text-sm font-medium text-muted-foreground mr-2">
                {user?.name || user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline-block">Logout</span>
              </Button>
            </>
          ) : (
            location.pathname !== "/login" && (
              <Button asChild size="sm">
                <Link to="/login">Login</Link>
              </Button>
            )
          )}

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <Link
                      to="/"
                      className="text-lg font-medium tracking-tight"
                    >
                      Student Management
                    </Link>
                  </div>
                  {isAuthenticated && (
                    <>
                      <div className="mt-4 text-sm font-medium">
                        {user?.name || user?.email}
                      </div>
                      {renderMobileLinks()}
                    </>
                  )}
                  <div className="mt-auto pt-4">
                    {isAuthenticated ? (
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                        onClick={logout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    ) : (
                      <SheetClose asChild>
                        <Button asChild className="w-full">
                          <Link to="/login">Login</Link>
                        </Button>
                      </SheetClose>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
