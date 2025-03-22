import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Laptop, 
  Music,
  Trophy, 
  Users
} from "lucide-react";

const Dashboard = () => {
  const categories = [
    {
      title: "Cultural Events",
      description: "Add or view your cultural event participation",
      icon: Music,
      path: "/cultural-events",
      color: "bg-gradient-to-r from-purple-500 to-indigo-500"
    },
    {
      title: "Technical Events",
      description: "Add or view your technical event participation",
      icon: Laptop,
      path: "/technical-events",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      title: "Sports Events",
      description: "Add or view your sports event participation",
      icon: Trophy,
      path: "/sports-events",
      color: "bg-gradient-to-r from-green-500 to-teal-500"
    },
    {
      title: "Society/Club",
      description: "Add or view your society and club memberships",
      icon: Users,
      path: "/society",
      color: "bg-gradient-to-r from-pink-500 to-rose-500"
    },
    {
      title: "Placements",
      description: "Add or view your placement details",
      icon: GraduationCap,
      path: "/placements",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      title: "Internships",
      description: "Add or view your internship experiences",
      icon: Briefcase,
      path: "/internships",
      color: "bg-gradient-to-r from-indigo-500 to-purple-500"
    },
    {
      title: "Research Papers",
      description: "Add or view your published research papers",
      icon: BookOpen,
      path: "/research-papers",
      color: "bg-gradient-to-r from-red-500 to-pink-500"
    }
  ];

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-purple-900">
            Welcome to Your Achievement Portal
          </h2>
          <p className="text-purple-600">
            Manage and track all your academic and co-curricular achievements in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <DashboardCard
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
              path={category.path}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;