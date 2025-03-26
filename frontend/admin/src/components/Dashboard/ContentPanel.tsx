
import React, { useState } from 'react';
import { RefreshCw, Plus } from 'lucide-react';
import CategoryItem from './CategoryItem';
import { cn } from '@/lib/utils';

interface ContentPanelProps {
  className?: string;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ className }) => {
  const [categories, setCategories] = useState<string[]>([
    "Dance", "Music", "Drama"
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleRemoveCategory = (index: number) => {
    setCategories(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories(prev => [...prev, newCategory.trim()]);
      setNewCategory('');
    }
    setIsAddingCategory(false);
  };

  return (
    <div 
      className={cn(
        "glass-panel rounded-3xl p-8 opacity-0 animate-fade-in animation-delay-300 w-full max-w-xl",
        className
      )}
    >
      <h2 className="text-2xl font-medium mb-6">Content Management</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Edit Form Dropdowns</h3>
          <div className="flex gap-2">
            <select 
              className="flex-grow bg-white border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-shadow"
            >
              <option value="Cultural events">Cultural events</option>
              <option value="Sports events">Sports events</option>
              <option value="Academic events">Academic events</option>
            </select>
            <button 
              className="flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Fetch dropdowns</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Categories</h3>
          <div className="space-y-2 mb-4">
            {categories.map((category, index) => (
              <CategoryItem 
                key={category} 
                category={category} 
                onRemove={() => handleRemoveCategory(index)}
                index={index}
              />
            ))}
          </div>

          {isAddingCategory ? (
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className="flex-grow bg-white border border-border rounded-xl px-4 py-2 input-focus"
                autoFocus
              />
              <button
                onClick={handleAddCategory}
                className="bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingCategory(true)}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20 rounded-xl px-4 py-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add new category</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentPanel;
