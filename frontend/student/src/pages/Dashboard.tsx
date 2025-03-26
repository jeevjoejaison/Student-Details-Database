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
    { title: "Cultural Events", description: "Add or view your cultural event participation", icon: Music, path: "/cultural-events" },
    { title: "Technical Events", description: "Add or view your technical event participation", icon: Laptop, path: "/technical-events" },
    { title: "Sports Events", description: "Add or view your sports event participation", icon: Trophy, path: "/sports-events" },
    { title: "Society/Club", description: "Add or view your society and club memberships", icon: Users, path: "/society" },
    { title: "Placements", description: "Add or view your placement details", icon: GraduationCap, path: "/placements" },
    { title: "Internships", description: "Add or view your internship experiences", icon: Briefcase, path: "/internships" },
    { title: "Research Papers", description: "Add or view your published research papers", icon: BookOpen, path: "/research-papers" }
  ];

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome to Your Achievement Portal
          </h2>
          <p className="text-lg text-gray-700 mt-2">
            Manage and track all your academic and co-curricular achievements in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <DashboardCard
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
              path={category.path}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
