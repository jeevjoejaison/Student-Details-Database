
import React from 'react';
import { cn } from '@/lib/utils';

const Navbar = ({ className }) => {
  return (
    <nav 
      className={cn(
        "w-full px-8 py-6 glass-panel border-b fixed top-0 z-10 opacity-0 animate-fade-in",
        className
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-medium">
              S
            </div>
            <h1 className="text-xl font-medium">Admin Portal</h1>
          </div>
          
          <div className="flex items-center gap-4">
            
            
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              A
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
