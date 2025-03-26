
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Plus, Trash, Edit, Check, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ManageDropdowns = () => {
  const navigate = useNavigate();
  const [dropdownType, setDropdownType] = useState('departments');
  
  // Mock data for different dropdown categories
  const [dropdownOptions, setDropdownOptions] = useState({
    departments: [
      'Computer Science',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Physics'
    ],
    eventCategories: [
      'Academic',
      'Cultural',
      'Sports',
      'Technical'
    ],
    eventTypes: [
      'Workshop',
      'Conference',
      'Competition',
      'Seminar',
      'Guest Lecture'
    ],
    years: [
      '1',
      '2',
      '3',
      '4'
    ],
    sections: [
      'A',
      'B',
      'C',
      'D'
    ]
  });
  
  const [newOption, setNewOption] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  
  const handleAddOption = () => {
    if (newOption.trim() === '') {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid option name.",
        variant: "destructive",
      });
      return;
    }
    
    if (dropdownOptions[dropdownType].includes(newOption.trim())) {
      toast({
        title: "Duplicate Option",
        description: `The option "${newOption.trim()}" already exists.`,
        variant: "destructive",
      });
      return;
    }
    
    setDropdownOptions(prev => ({
      ...prev,
      [dropdownType]: [...prev[dropdownType], newOption.trim()]
    }));
    
    toast({
      title: "Option Added",
      description: `The option "${newOption.trim()}" has been added to ${formatDropdownType(dropdownType)}.`,
    });
    
    setNewOption('');
  };
  
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditValue(dropdownOptions[dropdownType][index]);
  };
  
  const handleSaveEdit = () => {
    if (editValue.trim() === '') {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid option name.",
        variant: "destructive",
      });
      return;
    }
    
    if (
      dropdownOptions[dropdownType].includes(editValue.trim()) && 
      dropdownOptions[dropdownType][editIndex] !== editValue.trim()
    ) {
      toast({
        title: "Duplicate Option",
        description: `The option "${editValue.trim()}" already exists.`,
        variant: "destructive",
      });
      return;
    }
    
    setDropdownOptions(prev => {
      const updated = [...prev[dropdownType]];
      updated[editIndex] = editValue.trim();
      return { ...prev, [dropdownType]: updated };
    });
    
    toast({
      title: "Option Updated",
      description: `The option has been updated to "${editValue.trim()}".`,
    });
    
    setEditIndex(-1);
    setEditValue('');
  };
  
  const handleCancelEdit = () => {
    setEditIndex(-1);
    setEditValue('');
  };
  
  const handleDeleteOption = (index) => {
    const option = dropdownOptions[dropdownType][index];
    
    setDropdownOptions(prev => {
      const updated = prev[dropdownType].filter((_, i) => i !== index);
      return { ...prev, [dropdownType]: updated };
    });
    
    toast({
      title: "Option Deleted",
      description: `The option "${option}" has been deleted.`,
    });
  };
  
  const formatDropdownType = (type) => {
    switch(type) {
      case 'eventCategories': return 'Event Categories';
      case 'eventTypes': return 'Event Types';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <main className="container mx-auto px-4 pt-10 pb-16">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="gap-2 mb-4 hover:bg-accent/10"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-display font-medium mb-2">
            Manage Dropdown Options
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Add, edit, or delete dropdown options that are used across the system.
          </p>
        </div>
        
        <div className="glass-panel rounded-3xl p-8 mb-8 opacity-0 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="w-full md:w-1/3 space-y-2">
              <Label htmlFor="dropdown-type">Select Dropdown Type</Label>
              <select
                id="dropdown-type"
                value={dropdownType}
                onChange={(e) => setDropdownType(e.target.value)}
                className="w-full rounded-xl input-focus bg-background border border-input h-10 px-3 py-2"
              >
                {Object.keys(dropdownOptions).map(type => (
                  <option key={type} value={type}>
                    {formatDropdownType(type)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="w-full md:w-2/3 space-y-2">
              <Label htmlFor="new-option">Add New Option</Label>
              <div className="flex gap-2">
                <Input
                  id="new-option"
                  type="text"
                  placeholder="Enter new option name"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  className="rounded-xl input-focus"
                />
                <Button 
                  onClick={handleAddOption}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Option
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-border/30">
            <h2 className="text-xl font-medium mb-4">
              {formatDropdownType(dropdownType)} ({dropdownOptions[dropdownType].length})
            </h2>
            
            {dropdownOptions[dropdownType].length > 0 ? (
              <div className="space-y-3">
                {dropdownOptions[dropdownType].map((option, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between bg-accent/5 p-3 rounded-lg"
                  >
                    {editIndex === index ? (
                      <div className="flex items-center gap-2 flex-grow mr-2">
                        <Input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="rounded-lg flex-grow"
                          autoFocus
                        />
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={handleSaveEdit}
                          className="hover:bg-accent/10 rounded-lg"
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={handleCancelEdit}
                          className="hover:bg-accent/10 rounded-lg"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-medium">{option}</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditClick(index)}
                            className="hover:bg-accent/10 rounded-lg"
                          >
                            <Edit className="h-4 w-4 text-accent" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteOption(index)}
                            className="hover:bg-destructive/10 rounded-lg"
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No options available. Add a new option using the form above.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageDropdowns;
