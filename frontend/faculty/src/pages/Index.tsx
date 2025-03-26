
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Award, BookOpen, CheckCircle, Laptop, Users } from "lucide-react";

export default function Index() {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Track Achievements",
      description: "Record and manage all your academic and co-curricular achievements in one place.",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Quick Verification",
      description: "Faculty can quickly verify student achievements with an efficient approval process.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Comprehensive Records",
      description: "Maintain detailed records of all activities, from technical events to research papers.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "User Management",
      description: "Administrators can easily manage student and faculty accounts through the platform.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const getStartedLink = () => {
    if (!isAuthenticated) {
      return "/login";
    }
    
    switch (user?.role) {
      case "student":
        return "/dashboard";
      case "faculty":
        return "/faculty";
      case "admin":
        return "/admin";
      default:
        return "/login";
    }
  };

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-background/80" />
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/30 to-accent/30 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      <PageContainer className="pt-20 md:pt-32">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-bold leading-tight tracking-tighter text-4xl md:text-5xl lg:text-6xl">
              Student Achievement Management System
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform to track, verify, and manage all student achievements and co-curricular activities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            <Button asChild size="lg" className="gap-2">
              <Link to={getStartedLink()}>
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">
                {isAuthenticated ? "Go to Dashboard" : "Log In"}
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="glass-card p-6 flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 mb-16 flex flex-col items-center text-center"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to streamline achievement management?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our platform makes it easy for students, faculty, and administrators to manage the entire achievement verification process.
            </p>
          </div>

          <Button asChild size="lg" className="mt-8">
            <Link to={getStartedLink()}>
              {isAuthenticated ? "Go to Dashboard" : "Get Started"}
            </Link>
          </Button>
        </motion.div>
      </PageContainer>
    </>
  );
}
