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
import { Icons } from "@/components/ui/icons.jsx";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
      
      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      login(data.userId, data.name, data.section, data.rollNumber);

      toast({ 
        title: "Welcome back!",
        description: `Logged in successfully as ${data.name}`,
        className: "bg-green-50 border-green-200 text-green-800"
      });
      
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
      const res = await axios.post("http://localhost:8080/api/auth/google-login", {
        token: credentialResponse.credential,
      });

      const { userId, name, section, rollNumber } = res.data;

      if (!userId) {
        throw new Error("User not found or not registered");
      }
      
      login(userId, name, section, rollNumber);

      toast({ 
        title: "Welcome!",
        description: `Logged in successfully with Google as ${name}`,
        className: "bg-green-50 border-green-200 text-green-800"
      });
      
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
      <CustomCard className="w-full max-w-md mx-auto shadow-lg rounded-xl overflow-hidden border-0">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold">Student Portal</CardTitle>
            <CardDescription className="text-blue-100">
              Sign in to manage your academic achievements
            </CardDescription>
          </CardHeader>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                autoComplete="email"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
           
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                autoComplete="current-password"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                type="submit" 
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.login className="mr-2 h-4 w-4" />
                )}
                Sign in
              </Button>
            </motion.div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              theme="filled_blue"
              size="large"
              shape="pill"
              text="continue_with"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-gray-600"
          >
     
          </motion.div>
        </div>
      </CustomCard>
    </motion.div>
  );
};