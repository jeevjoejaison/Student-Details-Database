import React, { useState } from 'react';
import Navbar from '@/components/Dashboard/Navbar';
import ButtonCard from '@/components/Dashboard/ButtonCard';
import { RefreshCw, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import * as XLSX from 'xlsx';

const Index = () => {
  const [categories, setCategories] = useState<string[]>([
    'Dance', 'Music', 'Drama',
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const buttons = [
    { label: 'Create Student Account', icon: 'user-plus', route: '/create-student' },
    { label: 'Create Faculty Account', icon: 'graduation-cap', route: '/create-faculty' },
    { label: 'Manage Students', icon: 'users', route: '/manage-students' },
    { label: 'Manage Faculties', icon: 'user-cog', route: '/manage-faculty' },
    { label: 'Download Students Excel', icon: 'file-spreadsheet', onClick: () => exportToExcel('students') },
    { label: 'Download Faculties Excel', icon: 'file-spreadsheet', onClick: () => exportToExcel('faculties') },
  ];

  const navigate = useNavigate(); // Hook for navigation

  const handleButtonClick = (label: string, route: string) => {
    toast({
      title: 'Action selected',
      description: `You clicked on "${label}"`,
      duration: 3000,
    });

    // Redirect to the corresponding page
    navigate(route);
  };

  // Example data for students and faculties
  const studentsData = [
    { name: 'John Doe', email: 'john@example.com', department: 'Computer Science' },
    { name: 'Jane Smith', email: 'jane@example.com', department: 'Mathematics' },
  ];

  const facultiesData = [
    { name: 'Dr. Alice Johnson', email: 'alice@example.com', department: 'Physics' },
    { name: 'Dr. Bob Brown', email: 'bob@example.com', department: 'Chemistry' },
  ];

  // Export to Excel
  const exportToExcel = (type: 'students' | 'faculties') => {
    const data = type === 'students' ? studentsData : facultiesData;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, type === 'students' ? 'Students' : 'Faculties');

    // Generate current date for filename
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    XLSX.writeFile(workbook, `${type === 'students' ? 'Students' : 'Faculties'}_Directory_${dateString}.xlsx`);
  };

  const handleRemoveCategory = (index: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setNewCategory('');
    }
    setIsAddingCategory(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary pb-20">
      <Navbar />

      <main className="container mx-auto pt-28 px-4 md:px-6">
        <header className="mb-10 opacity-0 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-2">
            Dashboard
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-12 xl:col-span-8">
            {/* First row for two buttons */}
            <div className="grid grid-cols-2 gap-4">
              {buttons.slice(0, 2).map((button, index) => (
                <ButtonCard
                  key={index}
                  label={button.label}
                  icon={button.icon}
                  onClick={button.onClick || (() => handleButtonClick(button.label, button.route))}
                  className="w-full h-40 animation-delay-100" // Adjusted height
                />
              ))}
            </div>

            {/* Second row for two buttons */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {buttons.slice(2, 4).map((button, index) => (
                <ButtonCard
                  key={index + 2} // Adjusted key index to avoid duplicate keys
                  label={button.label}
                  icon={button.icon}
                  onClick={button.onClick || (() => handleButtonClick(button.label, button.route))}
                  className="w-full h-40 animation-delay-200" // Adjusted height
                />
              ))}
            </div>

            {/* Third row for two buttons */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {buttons.slice(4).map((button, index) => (
                <ButtonCard
                  key={index + 4} // Adjusted key index to avoid duplicate keys
                  label={button.label}
                  icon={button.icon}
                  onClick={button.onClick || (() => handleButtonClick(button.label, button.route))}
                  className="w-full h-40 animation-delay-300" // Adjusted height
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-12 xl:col-span-4">
            <div className="glass-panel rounded-3xl p-8 opacity-0 animate-fade-in animation-delay-300 w-full max-w-xl">
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
                      <div
                        key={category}
                        className={cn(
                          'flex items-center justify-between p-4 rounded-xl',
                          'bg-white shadow-sm border border-border/40',
                          'opacity-0 animate-slide-in'
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="font-medium">{category}</span>
                        <button
                          onClick={() => handleRemoveCategory(index)}
                          className="text-muted-foreground hover:text-destructive transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-destructive/20 rounded-full p-1"
                          aria-label={`Remove ${category}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;