
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CustomCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const CustomCard = ({ 
  children, 
  className = "", 
  onClick,
  hover = false
}: CustomCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-xl p-6 glass-card transition-all duration-300",
        hover && "hover:shadow-md hover:translate-y-[-2px] cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
