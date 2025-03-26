import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

export const DashboardCard = ({ 
  title, 
  description, 
  icon: Icon, 
  path 
}: DashboardCardProps) => {
  return (
    <Link to={path} className="block">
      <div className={cn(
        "p-8 rounded-xl border border-purple-300 shadow-lg",
        "bg-gradient-to-br from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100",
        "transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
      )}>
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white bg-opacity-80 rounded-full border border-purple-200 shadow-md">
            <Icon className="h-8 w-8 text-purple-700" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
