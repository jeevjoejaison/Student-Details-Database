import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const DropdownManager = ({ category, setCategory, dropdownName, setDropdownName, dropdownOptions, setDropdownOptions }) => {
  const [newOption, setNewOption] = useState('');

  const getAvailableDropdowns = (category) => {
    switch (category) {
      case 'Cultural Event Form':
        return ['Category', 'Awards'];
      case 'Technical Event Form':
        return ['Category', 'Awards'];
      case 'Sports Event Form':
        return ['Participation Type', 'Awards'];
      case 'Society Club Form':
        return ['Category', 'Awards'];
      case 'Placement Form':
        return ['Hiring Mode'];
      default:
        return [];
    }
  };

  const fetchDropdownData = async () => {
    if (!category || !dropdownName) {
      toast({ title: "Invalid Input", description: "Please select both category and dropdown name.", variant: "destructive" });
      return;
    }

    const response = await fetch(`http://localhost:8080/dropdown/fetch?category=${category}&dropdownName=${dropdownName}`);
    const data = await response.json();

    if (response.ok) {
      setDropdownOptions(data);
    } else {
      toast({ title: "Error", description: `Failed to fetch options.`, variant: "destructive" });
    }
  };

  const handleAddOption = () => {
    if (!newOption.trim()) {
      toast({ title: "Invalid Input", description: "Please enter a valid option name.", variant: "destructive" });
      return;
    }

    const requestBody = { category, dropdownName, optionValue: newOption.trim() };
    fetch(`http://localhost:8080/dropdown/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    }).then((response) => {
      if (response.ok) {
        setDropdownOptions(prev => [...prev, { optionValue: newOption.trim() }]);
        toast({ title: "Option Added", description: `The option "${newOption.trim()}" has been added.` });
        setNewOption('');
      } else {
        toast({ title: "Error", description: "Failed to add the new option.", variant: "destructive" });
      }
    });
  };

  const handleDeleteOption = (index, id) => {
    const optionToDelete = dropdownOptions[index];
    fetch(`http://localhost:8080/dropdown/delete?id=${id}`, { method: 'DELETE' }).then((response) => {
      if (response.ok) {
        const updatedOptions = dropdownOptions.filter((_, i) => i !== index);
        setDropdownOptions(updatedOptions);
        toast({ title: "Option Deleted", description: `The option "${optionToDelete.optionValue}" has been deleted.` });
      } else {
        toast({ title: "Error", description: "Failed to delete the option.", variant: "destructive" });
      }
    });
  };

  return (
    <div className="glass-panel rounded-3xl p-8 mb-8 opacity-0 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-1/3 space-y-2">
          <Label htmlFor="category">Select Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => { setCategory(e.target.value); setDropdownName(''); setDropdownOptions([]); }}
            className="w-full rounded-xl input-focus bg-background border border-input h-10 px-3 py-2"
          >
            <option value="">Select Category</option>
            <option value="Cultural Event Form">Cultural Event Form</option>
            <option value="Technical Event Form">Technical Event Form</option>
            <option value="Sports Event Form">Sports Event Form</option>
            <option value="Society Club Form">Society/Club Form</option>
            <option value="Placement Form">Placement Form</option>
          </select>
        </div>

        <div className="w-full md:w-1/3 space-y-2">
          <Label htmlFor="dropdown-name">Select Dropdown Name</Label>
          <select
            id="dropdown-name"
            value={dropdownName}
            onChange={(e) => setDropdownName(e.target.value)}
            className="w-full rounded-xl input-focus bg-background border border-input h-10 px-3 py-2"
            disabled={!category}
          >
            <option value="">Select Dropdown Name</option>
            {getAvailableDropdowns(category).map((dropdown) => (
              <option key={dropdown} value={dropdown}>{dropdown}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/3 space-y-2">
          <Button onClick={fetchDropdownData} className="gap-2" disabled={!category || !dropdownName}>
            <Plus className="h-4 w-4" />
            Fetch Options
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-border/30">
        <h2 className="text-xl font-medium mb-4">Options for {category} - {dropdownName}</h2>

        {dropdownOptions.length > 0 ? (
          <div className="space-y-3">
            {dropdownOptions.map((option, index) => (
              <div key={index} className="flex items-center justify-between bg-accent/5 p-3 rounded-lg">
                <span className="text-sm font-medium">{option.optionValue}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteOption(index, option.id)}
                  className="hover:bg-destructive/10 rounded-lg"
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">No options available.</div>
        )}

        <div className="flex gap-2 mt-4">
          <Input
            type="text"
            placeholder={`Enter new option for ${dropdownName}`}
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            className="rounded-xl input-focus"
          />
          <Button onClick={handleAddOption} className="gap-2" disabled={!category || !dropdownName}>
            <Plus className="h-4 w-4" />
            Add Option
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DropdownManager;
