import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CustomCard } from "@/components/ui/CustomCard";
import { toast } from "@/components/ui/use-toast";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: { userId: number; name: string; rollNumber: string; section: string; message?: string } = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Ensure only userId is passed, as expected by the login function
      login(data.userId,data.name,data.section,data.rollNumber);

      toast({ title: "Success", description: "Logged in successfully!" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: (error as Error).message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    try {
      // Send the Google token to your backend for verification
      const res = await axios.post("http://localhost:8080/api/auth/google-login", {
        token: credentialResponse.credential,
      });

      const { userId,name,section,rollNumber } = res.data;

      if (!userId) {
        throw new Error("User not found or not registered");
      }
      login(userId,name,section,rollNumber)
      // Log the user in using the AuthContext

      toast({ title: "Success", description: "Logged in successfully with Google!" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Google login failed",
        description: (error as Error).message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    toast({
      title: "Google login failed",
      description: "An error occurred during Google login",
      variant: "destructive",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <CustomCard className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Student Portal</h1>
          <p className="text-muted-foreground text-sm">
            Sign in to manage your academic achievements
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-xs text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  toast({ title: "Hint", description: "Use: password123" });
                }}
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Use demo credentials:</p>
          <p className="font-medium">Email: student@example.com</p>
          <p className="font-medium">Password: password123</p>
        </div>

        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </div>
      </CustomCard>
    </motion.div>
  );
};