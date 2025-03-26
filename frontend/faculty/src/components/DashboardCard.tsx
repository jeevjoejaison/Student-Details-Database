
import React from 'react';

type DashboardCardProps = {
  icon: React.ReactNode;
  title: string;
  count: number;
  onClick: () => void;
  highlight?: boolean;
};

const DashboardCard = ({ icon, title, count, onClick, highlight = false }: DashboardCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`relative h-[180px] p-6 rounded-xl border border-blue-300 ${highlight ? 'glass border-primary/20' : 'glass'} flex flex-col justify-between cursor-pointer transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]`}
    >
      {highlight && (
        <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">
          {count}
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className={`h-10 w-10 rounded-full ${highlight ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-3xl font-bold mb-2">{count}</p>
        <button className="text-sm font-medium py-2 px-3 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-200">
          View {title}
        </button>
      </div>
    </div>
  );
};

export default DashboardCard;
