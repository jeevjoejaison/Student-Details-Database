
import React from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const { isAuthenticated, user } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    if (user?.role === "student") {
      return <Navigate to="/dashboard" replace />;
    } else if (user?.role === "faculty") {
      return <Navigate to="/faculty" replace />;
    } else if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
  }

  return (
    <PageContainer centered fullWidth>
      <div className="w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Student Management System
          </h1>
          <p className="mt-2 text-muted-foreground">
            Log in to manage your academic and co-curricular achievements
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <LoginForm />
        </motion.div>
      </div>
    </PageContainer>
  );
}
