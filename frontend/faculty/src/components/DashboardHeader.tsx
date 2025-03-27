
import { Link } from 'react-router-dom';
import { GraduationCap, Home, Info, MessageSquare } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-border">
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <GraduationCap className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Faculty Portal</h1>
      </div>
      
      <div className="flex mt-4 md:mt-0 space-x-4 text-sm font-medium">
        
      </div>
    </div>
  );
};

export default DashboardHeader;
