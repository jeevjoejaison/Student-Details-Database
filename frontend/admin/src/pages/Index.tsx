import React, { useState } from 'react';
import Navbar from '@/components/Dashboard/Navbar';
import ButtonCard from '@/components/Dashboard/ButtonCard';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import DropdownManager from './ManageDropdowns'; // Import DropdownManager component
import axios from 'axios'; // Import axios for API calls

const Index = () => {
  const [studentsData, setStudentsData] = useState<any[]>([]); // State to hold students data
  const [facultiesData, setFacultiesData] = useState<any[]>([]); // State to hold faculties data
  const [categories, setCategories] = useState<string[]>(['Dance', 'Music', 'Drama']); // Define categories state
  const [newCategory, setNewCategory] = useState(''); // State for new category
  const [isAddingCategory, setIsAddingCategory] = useState(false); // State to handle adding new category
  const [category, setCategory] = useState('');
  const [dropdownName, setDropdownName] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [newOption, setNewOption] = useState('');

  const navigate = useNavigate(); // Hook for navigation

    // Fetch student data from the backend API
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/students/get-all');
      setStudentsData(response.data); // Store the data in the state
      
    } catch (error) {
      console.error('Error fetching students:', error);
     
    }
  };

  // Fetch faculty data from the backend API
  const fetchFaculties = async () => {
    try {
      const response = await axios.get('http://localhost:8080/faculties/get-all'); // Replace with actual faculty API endpoint
      setFacultiesData(response.data); // Store the data in the state
      
    } catch (error) {
      console.error('Error fetching faculties:', error);
      
    }
  };
  const handleDownload= async ()=>{
    
  }  // Buttons array for different actions
  const buttons = [
    { label: 'Create Student Account', icon: 'user-plus', route: '/create-student' },
    { label: 'Create Faculty Account', icon: 'graduation-cap', route: '/create-faculty' },
    { label: 'Manage Students', icon: 'users', route: '/manage-students' },
    { label: 'Manage Faculties', icon: 'user-cog', route: '/manage-faculty' },
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

  const handleButtonClick = (label: string, route: string) => {
    toast({
      title: 'Action selected',
      description: `You clicked on "${label}"`,
      duration: 3000,
    });

    // Redirect to the corresponding page
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary pb-20">
      <Navbar />

      <main className="container mx-auto pt-28 px-4 md:px-6">
        <header className="mb-10 opacity-0 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-2">Dashboard</h1>
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
                  onClick={(() => handleButtonClick(button.label, button.route))}
                  className="w-full h-40 animation-delay-100"
                />
              ))}
            </div>

            {/* Second row for two buttons */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {buttons.slice(2, 4).map((button, index) => (
                <ButtonCard
                  key={index + 2}
                  label={button.label}
                  icon={button.icon}
                  onClick={(() => handleButtonClick(button.label, button.route))}
                  className="w-full h-40 animation-delay-200"
                />
              ))}
            </div>

            {/* Third row for two buttons */}
    
          </div>

          {/* Right Side: Dropdown Manager */}
          <div className="md:col-span-4">
            <DropdownManager
              category={category}
              setCategory={setCategory}
              dropdownName={dropdownName}
              setDropdownName={setDropdownName}
              dropdownOptions={dropdownOptions}
              setDropdownOptions={setDropdownOptions}
              newOption={newOption}
              setNewOption={setNewOption}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
