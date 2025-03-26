
import React from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const CategoryItem = ({ 
  category, 
  onRemove, 
  className,
  index 
}) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-between p-4 rounded-xl",
        "bg-white shadow-sm border border-border/40",
        "opacity-0 animate-slide-in",
        className
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className="font-medium">{category}</span>
      <button
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-destructive/20 rounded-full p-1"
        aria-label={`Remove ${category}`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default CategoryItem;
