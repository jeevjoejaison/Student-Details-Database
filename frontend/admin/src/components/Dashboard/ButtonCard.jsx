
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  UserPlus, 
  GraduationCap, 
  Users, 
  UserCog, 
  FileSpreadsheet 
} from 'lucide-react';

const ButtonCard = ({ 
  label, 
  icon, 
  onClick, 
  className 
}) => {
  const getIcon = () => {
    switch (icon) {
      case "user-plus":
        return <UserPlus className="h-6 w-6" />;
      case "graduation-cap":
        return <GraduationCap className="h-6 w-6" />;
      case "users":
        return <Users className="h-6 w-6" />;
      case "user-cog":
        return <UserCog className="h-6 w-6" />;
      case "file-spreadsheet":
        return <FileSpreadsheet className="h-6 w-6" />;
      default:
        return <UserPlus className="h-6 w-6" />;
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-2xl",
        "bg-white shadow-sm border border-border/50",
        "hover:shadow-md hover:border-accent/20 transition-all duration-300",
        "active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent/20",
        "opacity-0 animate-scale-in text-center",
        "group",
        className
      )}
    >
      <div className="mb-3 p-3 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
        {getIcon()}
      </div>
      <span className="text-sm font-medium text-balance">{label}</span>
    </button>
  );
};

export default ButtonCard;
