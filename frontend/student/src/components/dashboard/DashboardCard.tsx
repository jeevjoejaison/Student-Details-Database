import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

export const DashboardCard = ({ title, description, icon: Icon, path, color }: DashboardCardProps) => {
  return (
    <Link to={path}>
      <div className={cn("p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-white", color)}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white bg-opacity-20 rounded-full">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm opacity-80">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};