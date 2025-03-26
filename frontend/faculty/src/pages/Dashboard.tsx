
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Award, BookOpen, Briefcase, Building, FileText, 
  GraduationCap, Laptop, Music, PlusCircle, Star, Users 
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  // Event categories with their icons and URLs
  const categories = [
    {
      id: "cultural",
      name: "Cultural Events",
      icon: <Music className="h-6 w-6" />,
      addUrl: "/add/cultural",
      viewUrl: "/view?category=cultural",
    },
    {
      id: "technical",
      name: "Technical Events",
      icon: <Laptop className="h-6 w-6" />,
      addUrl: "/add/technical",
      viewUrl: "/view?category=technical",
    },
    {
      id: "sports",
      name: "Sports Events",
      icon: <Award className="h-6 w-6" />,
      addUrl: "/add/sports",
      viewUrl: "/view?category=sports",
    },
    {
      id: "club",
      name: "Society/Club Memberships",
      icon: <Users className="h-6 w-6" />,
      addUrl: "/add/club",
      viewUrl: "/view?category=club",
    },
    {
      id: "placement",
      name: "Placements",
      icon: <Building className="h-6 w-6" />,
      addUrl: "/add/placement",
      viewUrl: "/view?category=placement",
    },
    {
      id: "internship",
      name: "Internships",
      icon: <Briefcase className="h-6 w-6" />,
      addUrl: "/add/internship",
      viewUrl: "/view?category=internship",
    },
    {
      id: "research",
      name: "Research Papers",
      icon: <FileText className="h-6 w-6" />,
      addUrl: "/add/research",
      viewUrl: "/view?category=research",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {user?.name || "Student"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your academic and co-curricular achievements
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {categories.map((category, index) => (
          <motion.div key={category.id} variants={item}>
            <CustomCard className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-medium">{category.name}</h3>
                  </div>
                </div>

                <div className="mt-auto flex flex-col space-y-2 pt-4">
                  <Button asChild size="sm" className="w-full justify-center gap-2">
                    <Link to={category.addUrl}>
                      <PlusCircle className="h-4 w-4" />
                      Add New
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full justify-center"
                  >
                    <Link to={category.viewUrl}>View All</Link>
                  </Button>
                </div>
              </div>
            </CustomCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8"
      >
        <CustomCard>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-medium">View All Submissions</h3>
              <p className="text-muted-foreground mt-1">
                Access all your submitted achievements in one place
              </p>
            </div>
            <Button asChild className="mt-4 md:mt-0">
              <Link to="/view">View All Submissions</Link>
            </Button>
          </div>
        </CustomCard>
      </motion.div>
    </PageContainer>
  );
}
